import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { previews } from '../apis/api.js';

export default function Main() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    previews.list().then((r) => setItems(r.data));
  }, []);

  if (items === null) return <div className="card">불러오는 중...</div>;

  return (
    <>
      <div className="card">
        <h2>멋사 자료 보드</h2>
        <p>동아리원들이 공유한 좋은 자료들. <Link to="/share">새 자료 공유하기 →</Link></p>
      </div>
      {items.length === 0 ? (
        <div className="card">
          <p>아직 공유된 자료가 없습니다. 첫 자료를 공유해보세요.</p>
        </div>
      ) : (
        <div className="preview-grid">
          {items.map((p) => (
            <div key={p.id} className="preview-card">
              {p.image_url && <img src={p.image_url} alt={p.title} />}
              <div className="body">
                <h3>{p.title || p.url}</h3>
                {p.description && <p className="desc">{p.description}</p>}
                <a href={p.url} target="_blank" rel="noopener noreferrer">원문 보기 →</a>
                <div className="meta">
                  <span>{p.user_name}</span>
                  <span>{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

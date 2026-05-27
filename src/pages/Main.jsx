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
      <div className="hero">
        <div className="hero-icon">🦁🔗</div>
        <div className="hero-text">
          <h2>멋사 자료 공유 보드</h2>
          <p>동아리원들이 발견한 좋은 블로그·튜토리얼·깃헙·아티클을 한 곳에서 모아봐요. 직접 URL을 추가해서 함께 나누세요.</p>
        </div>
      </div>

      <div className="card">
        <div className="board-header">
          <h2>📚 공유된 자료 ({items.length})</h2>
          <Link to="/share" className="primary">+ 자료 공유하기</Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card empty-state">
          <div className="es-emoji">📭</div>
          <p style={{ marginBottom: '0.75rem' }}>아직 공유된 자료가 없어요.</p>
          <Link to="/share" className="primary">첫 자료를 공유하기</Link>
        </div>
      ) : (
        <div className="preview-grid">
          {items.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="preview-card">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="pc-img" />
              ) : (
                <div className="pc-img">🔖</div>
              )}
              <div className="pc-body">
                <h3>{p.title || p.url}</h3>
                {p.description && <p className="pc-desc">{p.description}</p>}
                <span className="pc-link">원문 보기 →</span>
                <div className="pc-meta">
                  <span>🦁 {p.user_name}</span>
                  <span>{new Date(p.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

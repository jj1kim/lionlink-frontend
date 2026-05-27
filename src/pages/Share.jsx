import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { previews } from '../apis/api.js';

export default function Share() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await previews.create({ url, title, description });
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.detail || '미리보기 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <h2>🔗 자료 공유하기</h2>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        멋사 동아리원들에게 추천하고 싶은 블로그·튜토리얼·깃헙·아티클의 URL을 공유해주세요.<br />
        제목·설명을 직접 적으면 카드에 그대로 보이고, 비워두면 페이지의 메타 태그에서 자동 추출돼요.
      </p>
      <form onSubmit={submit}>
        <label>URL <span style={{ color: 'var(--error)' }}>*</span>
          <input type="url" required value={url} placeholder="https://example.com/article"
            onChange={(e) => setUrl(e.target.value)} disabled={loading} />
        </label>
        <label>제목 (선택)
          <input value={title} maxLength={500} placeholder="자료 제목 — 비우면 자동 추출"
            onChange={(e) => setTitle(e.target.value)} disabled={loading} />
        </label>
        <label>설명 (선택)
          <textarea value={description} maxLength={2000} rows={3}
            placeholder="이 자료가 어떤 점이 좋은지 한두 줄로 — 비우면 자동 추출"
            onChange={(e) => setDescription(e.target.value)} disabled={loading} />
        </label>
        {err && <p className="error">{err}</p>}
        <button type="submit" className="primary" disabled={loading || !url}>
          {loading ? '미리보기 생성 중...' : '공유하기'}
        </button>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { previews } from '../apis/api.js';

export default function Share() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await previews.create(url);
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.detail || '미리보기 생성 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h2>자료 공유하기</h2>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
        공유하고 싶은 블로그·깃헙·튜토리얼의 URL을 붙여넣으면 자동으로 미리보기
        카드가 생성됩니다.
      </p>
      <form onSubmit={submit}>
        <label>URL
          <input type="url" required value={url} placeholder="https://example.com/article"
            onChange={(e) => setUrl(e.target.value)} disabled={loading} />
        </label>
        {err && <p className="error">{err}</p>}
        <button type="submit" className="primary" disabled={loading || !url}>
          {loading ? '미리보기 생성 중...' : '공유하기'}
        </button>
      </form>
    </div>
  );
}

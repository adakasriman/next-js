'use client';

import { useState } from 'react';
import { uploadExcelFile } from '../app/lib/api/uploadExcel';

export default function UploadExcel() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      const result = await uploadExcelFile(formData);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" accept=".xlsx,.xls" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
}

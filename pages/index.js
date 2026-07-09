import { useEffect, useState } from 'react';
import Link from 'next/link';
import NoticeCard from '../components/NoticeCard';
import ThemeToggle from '../components/ThemeToggle';

export default function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNotices = async () => {
    try {
      setError('');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch('/api/notices', { signal: controller.signal });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to load notices');
      }
      setNotices(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The server took too long to respond. Please try again.');
      } else {
        setError(err.message || 'Unable to load notices');
      }
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleDelete = async (notice) => {
    const confirmed = window.confirm(`Delete "${notice.title}"?`);
    if (!confirmed) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`/api/notices/${notice.id}`, {
        method: 'DELETE',
        signal: controller.signal
      });
      if (!res.ok) {
        throw new Error('Unable to delete notice');
      }
      loadNotices();
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The server took too long to respond. Please try again.');
      } else {
        setError(err.message || 'Unable to delete notice');
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notice Board</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Manage announcements with a simple, responsive workspace.</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/notice/new" className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
              + Add Notice
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Loading notices...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            No notices yet. Create your first one.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

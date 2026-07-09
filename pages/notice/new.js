import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NoticeForm from '../../components/NoticeForm';
import ThemeToggle from '../../components/ThemeToggle';

export default function NewNoticePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (form) => {
    setIsSubmitting(true);
    setError('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Unable to create notice');
        return;
      }

      router.push('/');
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The server took too long to respond. Please try again.');
      } else {
        setError('Unable to create notice right now.');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Notice</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Add a new public notice to the board.</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Back
            </Link>
          </div>
        </div>
        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        <NoticeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

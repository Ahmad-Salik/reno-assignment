import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NoticeForm from '../../components/NoticeForm';

export default function NewNoticePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (form) => {
    setIsSubmitting(true);
    setError('');

    const res = await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Unable to create notice');
      setIsSubmitting(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Notice</h1>
            <p className="mt-2 text-slate-600">Add a new public notice to the board.</p>
          </div>
          <Link href="/" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100">
            Back
          </Link>
        </div>
        {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
        <NoticeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

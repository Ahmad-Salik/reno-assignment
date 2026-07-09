import Link from 'next/link';

export default function NoticeCard({ notice, onDelete }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {notice.image ? (
        <img src={notice.image} alt={notice.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
      ) : null}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-semibold">{notice.title}</h3>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
          {notice.priority}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{notice.body}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{notice.category}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{new Date(notice.publishDate).toLocaleDateString()}</span>
      </div>
      <div className="mt-6 flex gap-3">
        <Link href={`/notice/${notice.id}`} className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600">
          Edit
        </Link>
        <button
          onClick={() => onDelete(notice)}
          className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

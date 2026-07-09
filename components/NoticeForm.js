import { useState, useEffect } from 'react';

const categories = ['Exam', 'Event', 'General'];
const priorities = ['Normal', 'Urgent'];

export default function NoticeForm({ initialData = null, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    title: '',
    body: '',
    category: 'General',
    priority: 'Normal',
    publishDate: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        body: initialData.body || '',
        category: initialData.category || 'General',
        priority: initialData.priority || 'Normal',
        publishDate: initialData.publishDate ? initialData.publishDate.slice(0, 10) : '',
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-slate-200">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-slate-200">Publish Date</label>
          <input
            name="publishDate"
            type="date"
            value={form.publishDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium dark:text-slate-200">Body</label>
        <textarea
          name="body"
          rows="5"
          value={form.body}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-slate-200">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-slate-200">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium dark:text-slate-200">Image URL (optional)</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isSubmitting ? 'Saving...' : initialData ? 'Update Notice' : 'Create Notice'}
      </button>
    </form>
  );
}

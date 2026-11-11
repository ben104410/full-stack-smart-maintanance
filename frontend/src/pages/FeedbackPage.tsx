import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    category: "improvement", // 'improvement' | 'review'
    rating: 5,
    comment: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rating" ? parseInt(value) : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Pointing to the correct maintenance feedback endpoint
      await api.post("/maintenance/feedback/", form);
      toast.success("Thank you for your feedback!");
      setForm({ category: "improvement", rating: 5, comment: "" });
    } catch (err: unknown) {
      console.error("Feedback submission failed:", err);
      const errorData = typeof err === "object" && err !== null && "response" in err
        ? (err as { response?: { data?: Record<string, string | string[]> } }).response?.data
        : undefined;
      const firstError = 
        (errorData && typeof errorData === 'object' ? Object.values(errorData)[0] : null) ||
        "Failed to send feedback. Please try again later.";
      
      toast.error(Array.isArray(firstError) ? firstError[0] : (typeof firstError === "string" ? firstError : "Submission error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-slate-900 text-lg font-black text-white shadow-md shadow-sky-500/20">
              P
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Pwani<span className="text-sky-600">Maint</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Community Feedback
              </p>
            </div>
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-700">
            Platform Evolution
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Feedback &amp; Reviews
          </h1>
          <p className="mt-3 text-sm text-slate-500 max-w-lg mx-auto">
            Help our facilities team improve campus operations by reporting usability problems or suggesting new features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-card">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Feedback Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
              >
                <option value="improvement">Improvement Suggestion</option>
                <option value="review">System Review / Experience</option>
                <option value="bug">Report a UI/UX Issue</option>
              </select>
            </div>

            {form.category === "review" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Rating (1-5)
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="flex-1">
                      <input
                        type="radio"
                        name="rating"
                        value={num}
                        checked={form.rating === num}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <div className="text-center py-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer transition-all peer-checked:border-sky-600 peer-checked:bg-sky-50 peer-checked:text-sky-700 font-bold text-sm">
                        {num} ★
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Detailed Comments
              </label>
              <textarea
                name="comment"
                required
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium min-h-[140px]"
              ></textarea>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-xl bg-sky-600 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          Your feedback is sent directly to the Estate Management IT Team.
        </p>
      </main>
    </div>
  );
}
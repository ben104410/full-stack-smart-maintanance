import { useState, type FormEvent, type ChangeEvent, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function FeedbackPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
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
      // Note: This assumes a backend endpoint /users/feedback/ exists
      await api.post("/users/feedback/", {
        ...form,
        username: user?.username || "Anonymous",
      });
      toast.success("Thank you for your feedback!");
      setForm({ category: "improvement", rating: 5, comment: "" });
    } catch (err: any) {
      console.error("Feedback submission failed:", err);
      toast.error("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b-4 border-[#f37021] bg-[#002147] shadow-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f37021] text-xl font-black text-white shadow-inner">
              P
            </div>
            <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-white">
              Pwani <span className="text-[#f37021]">Maint</span>
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/20"
          >
            Back Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f37021]">
            System Evolution
          </span>
          <h1 className="mt-4 text-4xl font-black text-[#002147] md:text-5xl">
            Feedback & <span className="text-[#f37021]">Reviews</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 font-medium">
            Help us improve the Pwani Maintenance Portal by sharing your experience or suggesting new features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-xl rounded-[2.5rem] border border-slate-100">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Feedback Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#f37021] outline-none transition-all font-medium"
              >
                <option value="improvement">Improvement Suggestion</option>
                <option value="review">System Review / Experience</option>
                <option value="bug">Report a UI/UX Issue</option>
              </select>
            </div>

            {form.category === "review" && (
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Rating (1-5)</label>
                <div className="flex gap-4">
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
                      <div className="text-center p-3 rounded-xl border-2 border-slate-100 bg-slate-50 cursor-pointer transition-all peer-checked:border-[#f37021] peer-checked:bg-orange-50 peer-checked:text-[#f37021] font-bold">
                        {num}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Detailed Comments</label>
              <textarea
                name="comment"
                required
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#f37021] outline-none transition-all font-medium min-h-[150px]"
              ></textarea>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#002147] text-white p-5 rounded-2xl font-black text-lg hover:bg-[#f37021] shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400 font-medium italic">
          Your feedback is sent directly to the Estate Management IT Team.
        </p>
      </main>
    </div>
  );
}
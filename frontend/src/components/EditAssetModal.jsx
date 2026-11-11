import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function EditAssetModal({ asset, close, refresh }) {
  const [form, setForm] = useState({
    name: asset.name || "",
    category: asset.category || "",
    location: asset.location || "",
    condition: (asset.condition || "working").toLowerCase().replace(/[\s-]/g, "_"),
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("location", form.location);
    data.append("condition", form.condition);
    if (image) data.append("image", image);

    try {
      await api.put(`assets/update/${asset.id}/`, data);
      toast.success("Asset updated successfully");
      if (typeof refresh === "function") refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-extrabold text-slate-900">Edit Asset #{asset.id}</h2>
          <button onClick={close} className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form className="mt-4 space-y-4" onSubmit={submit}>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Asset Name</label>
            <input
              type="text"
              required
              value={form.name}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
              <input
                type="text"
                value={form.category}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Condition</label>
              <select
                value={form.condition}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
              >
                <option value="working">Working</option>
                <option value="under_repair">Under Repair</option>
                <option value="damaged">Damaged</option>
                <option value="retired">Retired</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Location</label>
            <input
              type="text"
              value={form.location}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">Update Photo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { X, CheckCircle2, Clock, Wrench } from "lucide-react";

export default function UpdateStatusModal({ task, close, refresh }) {
  const [status, setStatus] = useState(task?.status || "in_progress");
  const [notes, setNotes] = useState(task?.technician_notes || "");
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post(`maintenance/update-status/${task.id}/`, {
        status,
        technician_notes: notes,
      });

      toast.success(`Task status updated to ${status.replace("_", " ")}`);
      if (typeof refresh === "function") refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task status");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Wrench size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Update Task Status</h2>
              <p className="text-xs text-slate-400 truncate max-w-[240px]">{task?.title || "Work Order"}</p>
            </div>
          </div>
          <button onClick={close} className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Operational Status
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Service Notes &amp; Observations
            </label>
            <textarea
              placeholder="Describe actions taken, replaced parts, or testing results..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium min-h-[100px]"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              disabled={submitting}
              className="rounded-xl bg-sky-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
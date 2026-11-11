import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Clock, MapPin, Boxes } from "lucide-react";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await api.get(`maintenance/${id}/`);
      setTask(res.data);

      const logRes = await api.get("activity/");
      const taskLogs = (logRes.data || []).filter(
        (log: any) => log.details?.includes(res.data.title)
      );
      setLogs(taskLogs);
    } catch (err) {
      console.error("Error loading task:", err);
      toast.error("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    try {
      await api.post(`maintenance/update-status/${id}/`, { status: newStatus });
      toast.success(`Task status updated to ${newStatus.replace('_', ' ')}`);
      fetchTask();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="py-20 text-center">
        <p className="text-base font-bold text-slate-700">Task not found.</p>
        <Link to="/technician/dashboard" className="mt-3 inline-block text-sm font-semibold text-sky-600 hover:underline">
          ← Return to my tasks
        </Link>
      </div>
    );
  }

  const assetInfo = task.asset_details || task.asset;
  const imageSource = task.before_image || task.image;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/technician/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 shadow-sm"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Task #{task.id}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                {task.priority} Priority
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{task.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {task.status !== "in_progress" && task.status !== "completed" && (
            <button
              onClick={() => updateStatus("in_progress")}
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700"
            >
              Start Work
            </button>
          )}
          {task.status !== "completed" && (
            <button
              onClick={() => updateStatus("completed")}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Finalize &amp; Complete
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-slate-900 mb-3">Work Order Details</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {task.description || "No specific instructions provided."}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:grid-cols-3">
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Location</span>
                <span className="mt-1 flex items-center gap-1 font-semibold text-slate-700">
                  <MapPin size={13} className="text-sky-600" /> {task.location || "General Campus"}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Status</span>
                <span className="mt-1 font-bold capitalize text-slate-800">{task.status.replace("_", " ")}</span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase tracking-wider text-[10px]">Logged At</span>
                <span className="mt-1 flex items-center gap-1 font-semibold text-slate-700">
                  <Clock size={13} className="text-slate-400" /> {new Date(task.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Evidence */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-base font-bold text-slate-900 mb-3">Inspection Image</h2>
            {imageSource ? (
              <img
                src={imageSource}
                alt="Reported problem"
                className="max-h-80 w-auto rounded-xl object-contain border border-slate-200 bg-slate-50"
              />
            ) : (
              <p className="text-xs text-slate-400 italic">No image was provided with this ticket.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Linked Asset */}
          {assetInfo && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
              <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-sm">
                <Boxes size={16} className="text-sky-600" />
                <span>Target Asset</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-800 text-sm">{assetInfo.name}</p>
                {assetInfo.category && <p className="text-slate-500">Category: {assetInfo.category}</p>}
                {assetInfo.location && <p className="text-slate-500">Location: {assetInfo.location}</p>}
                {assetInfo.condition && (
                  <p className="capitalize text-slate-500">Condition: {assetInfo.condition}</p>
                )}
                {assetInfo.qr_code && (
                  <div className="mt-3">
                    <img src={assetInfo.qr_code} alt="QR" className="h-20 w-20 rounded border border-slate-200 p-1" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity Log */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Recent Ticket Events</h2>
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No event logs recorded for this ticket.</p>
            ) : (
              <div className="divide-y divide-slate-100 text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="py-2.5">
                    <p className="font-semibold text-slate-800">{log.action}</p>
                    <p className="text-[11px] text-slate-500">{log.details}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
}

export default function TechnicianDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("maintenance/my-tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch tasks failed:", err);
      toast.error("Failed to load your assigned tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (taskId: number, newStatus: string) => {
    try {
      await api.post(`maintenance/update-status/${taskId}/`, { status: newStatus });
      toast.success(`Task status updated to ${newStatus.replace('_', ' ')}`);
      fetchTasks();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Field Operations</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Technician Task Dispatch</h1>
          <p className="mt-1 text-xs text-slate-500">Real-time oversight of your assigned maintenance work orders.</p>
        </div>
        <button
          onClick={fetchTasks}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 self-start md:self-auto"
        >
          <RefreshCw size={14} /> Refresh Tasks
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Zero active tasks assigned</p>
            <p className="mt-1 text-xs text-slate-400">New job dispatches from administration will appear here.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    (task.priority || '').toLowerCase() === 'high'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}>
                    {task.priority || 'Normal'} Priority
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    #{task.id} • {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{task.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">{task.description || "No specific instructions provided."}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">Current Phase</span>
                  <span className={`font-bold capitalize ${
                    task.status === 'completed'
                      ? 'text-emerald-600'
                      : task.status === 'in_progress'
                      ? 'text-sky-600'
                      : 'text-amber-600'
                  }`}>
                    {(task.status || '').replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/technician/tasks/${task.id}`}
                    className="flex-1 rounded-xl border border-slate-200 py-2 text-center text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                  >
                    Details
                  </Link>

                  {task.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(task.id, task.status === 'pending' || task.status === 'assigned' ? 'in_progress' : 'completed')}
                      className="flex-1 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
                    >
                      {task.status === 'pending' || task.status === 'assigned' ? 'Start Task' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

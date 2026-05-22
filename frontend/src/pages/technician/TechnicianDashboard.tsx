import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

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
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center font-bold text-slate-500 italic">Syncing assignments...</div>;
  }

  return (
    <div className="space-y-8 p-4">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-black tracking-tight text-[#002147]">Technician Hub</h1>
        <p className="mt-2 text-slate-500 font-medium text-sm">Real-time oversight of your assigned maintenance operations.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="col-span-full py-20 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white">
            <p className="text-slate-400 font-semibold tracking-wide">ZERO ACTIVE TASKS ASSIGNED</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-slate-50 group-hover:bg-[#f37021]/10 transition-colors" />
              
              <div className="mb-6 flex items-center justify-between relative z-10">
                <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                  task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {task.priority} Priority
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  ID: #{task.id} • {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#f37021] transition-colors line-clamp-1">{task.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">{task.description}</p>

              <div className="mt-8 border-t border-slate-50 pt-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                  <span className={`text-[11px] font-black uppercase tracking-wide ${
                    task.status === 'completed' ? 'text-emerald-500' : 'text-[#f37021]'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>

                {task.status !== 'completed' && (
                  <button
                    onClick={() => updateStatus(task.id, task.status === 'pending' ? 'in_progress' : 'completed')}
                    className="w-full rounded-2xl bg-[#002147] py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-orange-600 active:scale-95"
                  >
                    {task.status === 'pending' ? 'Begin Work' : 'Finalize Request'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

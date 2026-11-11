import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { X, Wrench } from "lucide-react";

export default function AssignTechnicianModal({ request, close, refresh }) {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("maintenance/users/")
      .then((res) => {
        const techs = res.data.filter((u) => u.role === "technician");
        setTechnicians(techs);
      })
      .catch((err) => {
        console.error("Error fetching technicians:", err);
        // Fallback to maintenance/users if users/all/ was restricted
        api.get("maintenance/users/")
          .then((res) => {
            const techs = res.data.filter((u) => u.role === "technician");
            setTechnicians(techs);
          })
          .catch(() => toast.error("Could not load technicians"));
      });
  }, []);

  const assign = async () => {
    if (!selectedTech) {
      toast.error("Please select a technician");
      return;
    }

    setLoading(true);
    try {
      await api.post(`maintenance/assign/${request.id}/`, {
        technician_id: selectedTech,
      });

      toast.success("Technician assigned successfully");
      if (typeof refresh === "function") refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign technician");
    } finally {
      setLoading(false);
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
              <h2 className="text-base font-extrabold text-slate-900">Assign Technician</h2>
              <p className="text-xs text-slate-400 truncate max-w-[240px]">{request.title}</p>
            </div>
          </div>
          <button onClick={close} className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Select Qualified Technician
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
            >
              <option value="">-- Choose technician --</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.username} ({tech.email})
                </option>
              ))}
            </select>
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
              type="button"
              onClick={assign}
              disabled={loading || !selectedTech}
              className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
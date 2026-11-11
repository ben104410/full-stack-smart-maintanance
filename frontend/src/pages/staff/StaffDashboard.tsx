import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Plus, ClipboardList, Clock, CheckCircle2, AlertCircle, X, Search, Filter, Camera, RefreshCw } from "lucide-react";

interface MaintenanceRequest {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  location?: string;
  status_color?: string;
  created_at: string;
  asset_name?: string;
  picture?: string;
  image?: string;
}

interface AssetOption {
  id: number;
  name: string;
  category?: string;
  location?: string;
}

export default function StaffDashboard() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    location: "",
    asset_id: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [requestsRes, assetsRes] = await Promise.allSettled([
        api.get("maintenance/requests/my/").catch(() => api.get("maintenance/my-requests/")),
        api.get("maintenance/assets/").catch(() => api.get("assets/all/")),
      ]);

      if (requestsRes.status === "fulfilled") {
        setRequests(Array.isArray(requestsRes.value.data) ? requestsRes.value.data : []);
      }
      if (assetsRes.status === "fulfilled") {
        setAssets(Array.isArray(assetsRes.value.data) ? assetsRes.value.data : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a summary title");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("priority", formData.priority);
      payload.append("location", formData.location || "Campus Premises");
      if (formData.asset_id) {
        payload.append("asset_id", formData.asset_id);
      }
      if (imageFile) {
        payload.append("image", imageFile);
      }

      await api.post("maintenance/create/", payload);
      toast.success("Maintenance request submitted successfully!");
      setShowForm(false);
      setFormData({ title: "", description: "", priority: "Medium", location: "", asset_id: "" });
      clearImage();
      fetchData();
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const term = searchQuery.toLowerCase();
    const titleMatch = r.title?.toLowerCase().includes(term);
    const descMatch = (r.description || "").toLowerCase().includes(term);
    const assetMatch = (r.asset_name || "").toLowerCase().includes(term);
    const locMatch = (r.location || "").toLowerCase().includes(term);

    const matchesSearch = !term || titleMatch || descMatch || assetMatch || locMatch;
    const matchesStatus = statusFilter === "all" || (r.status || "").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "completed":
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700"><CheckCircle2 size={12} /> Completed</span>;
      case "in_progress":
        return <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700"><Clock size={12} /> In Progress</span>;
      case "assigned":
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700"><CheckCircle2 size={12} /> Assigned</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700"><AlertCircle size={12} /> Pending</span>;
    }
  };

  if (loading && requests.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Support Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Campus Service Desk</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Support Portal</h1>
          <p className="mt-1 text-xs text-slate-500">Report maintenance issues, request campus repairs, and follow progress in real time.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`${showForm ? 'bg-slate-200 text-slate-700' : 'bg-sky-600 text-white hover:bg-sky-700'} flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-sm transition-all active:scale-95`}
          >
            {showForm ? <><X size={15}/> Close Form</> : <><Plus size={15}/> Report New Issue</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Submit Maintenance Work Order</h2>
          <p className="text-xs text-slate-500 mb-5">Provide details so our technician team can locate and resolve the issue quickly.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Issue Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Projector bulb blown in Lecture Hall B"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Priority Level</label>
                <select 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="Low">Low (Routine)</option>
                  <option value="Medium">Medium (Attention needed)</option>
                  <option value="High">High (Urgent disruption)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Location / Room</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Science Complex, Lab 102"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Linked Asset (Optional)</label>
                <select 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
                  value={formData.asset_id}
                  onChange={(e) => setFormData({...formData, asset_id: e.target.value})}
                >
                  <option value="">-- General / No Specific Asset --</option>
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} {asset.location ? `(${asset.location})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Attach Photo (Optional)</label>
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-200 p-4 bg-slate-50/40">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} className="h-20 w-20 rounded-lg object-cover border border-slate-200" alt="Preview" />
                      <button 
                        type="button"
                        onClick={clearImage}
                        className="absolute -right-2 -top-2 rounded-full bg-rose-600 p-1 text-white shadow-sm hover:bg-rose-700"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                      <Camera size={24} />
                    </div>
                  )}
                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm">
                      Select Photo
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                    <p className="mt-1 text-[11px] text-slate-400">Attach a clear image of the defect or damage.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Detailed Description</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Explain what is broken, what happened, and any safety hazards..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-sky-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* History table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">Your Submitted Requests ({filteredRequests.length})</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search your requests..."
                className="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-3 text-xs outline-none transition focus:border-sky-600 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 outline-none transition focus:border-sky-600"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredRequests.length === 0 ? (
            <div className="py-16 text-center">
              <Filter className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-600">No requests found</p>
              <p className="text-xs text-slate-400">Click &ldquo;Report New Issue&rdquo; above to log your first maintenance request.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Issue Details</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Asset</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Photo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRequests.map((req) => {
                  const pic = req.picture || req.image;
                  return (
                    <tr key={req.id} className="transition-colors hover:bg-slate-50/80">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">{req.title}</p>
                        {req.description && <p className="mt-0.5 text-slate-500 line-clamp-1">{req.description}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{req.location || "Premises"}</td>
                      <td className="px-5 py-3.5">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {req.asset_name || "General"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">{getStatusBadge(req.status)}</td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {req.created_at ? new Date(req.created_at).toLocaleDateString() : "Recent"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {pic ? (
                          <img src={pic} alt="Evidence" className="inline-block h-10 w-10 rounded-lg object-cover border border-slate-200" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Plus, X, Camera, ClipboardList, Search, CheckCircle2, Clock, AlertCircle, Filter } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface MaintenanceRequest {
  id: number;
  title: string;
  status: string;
  status_color: string;
  created_at: string;
  asset_name: string;
  picture: string;
}

export default function StaffDashboard() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Replace these with your actual Cloudinary details
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`;
  const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    asset_name: "",
    priority: "Medium",
    location: "",
    picture: "",
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    setImagePreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setFormData(prev => ({ ...prev, picture: result.secure_url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const fetchData = async () => {
    try {
      const requestsRes = await api.get("maintenance/requests/my/");
      setRequests(requestsRes.data);
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

  const filteredRequests = requests.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.asset_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        <p className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">Synchronizing Portals...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Support <span className="text-indigo-600">Portal</span></h1>
          <p className="text-slate-600 font-medium">Report issues and track maintenance for campus assets.</p>
        </div>
        <div>
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? 'secondary' : 'primary'} className="flex items-center gap-3">
            {showForm ? <><X size={16}/> Cancel</> : <><Plus size={16}/> New Maintenance Request</>}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="animate-in fade-in duration-300">
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await api.post("maintenance/create/", formData);
              toast.success("Request submitted successfully!");
              setShowForm(false);
              setFormData({ title: "", description: "", asset_name: "", priority: "Medium", location: "", picture: "" });
              setImagePreview(null);
              fetchData();
            } catch (error) { toast.error("Submission failed"); }
          }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Issue Summary</label>
                <input 
                  type="text" required placeholder="What needs fixing?"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Asset (optional)</label>
                <input
                  type="text"
                  placeholder="Asset name or identifier (optional)"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                  value={formData.asset_name}
                  onChange={(e) => setFormData({...formData, asset_name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Priority Level</label>
                <select 
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="Low">Low (General Maintenance)</option>
                  <option value="Medium">Medium (Affecting Operations)</option>
                  <option value="High">High (Urgent/Safety Hazard)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Specific Location</label>
                <input 
                  type="text" required placeholder="Room number or specific area..."
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Asset Condition Photo</label>
                <div className="flex items-center gap-6 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  {imagePreview ? (
                    <div className="relative group">
                      <img src={imagePreview} className="w-24 h-24 object-cover rounded-xl shadow-md border-2 border-white" alt="Preview" />
                      <button 
                        type="button"
                        onClick={() => { setImagePreview(null); setFormData({...formData, picture: ""}); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                      <Camera size={32} />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-600 mb-2">Upload a clear photo of the damage</p>
                    <label className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 cursor-pointer transition-all shadow-sm">
                      {uploadingImage ? "Uploading..." : "Select Image"}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Details</label>
              <textarea 
                required rows={4} placeholder="Describe the problem in detail..."
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full" variant="primary">Submit Request</Button>
          </form>
        </Card>
      )}

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <ClipboardList size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-900">Request History</h2>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title or asset..."
              className="pl-12 pr-6 py-3 rounded-xl border border-slate-200 text-sm focus:border-indigo-500 outline-none w-full md:w-80 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Asset</th>
                <th className="px-8 py-4">Issue</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Picture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{req.asset_name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">System Asset</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-800 text-sm">{req.title}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        req.status_color === 'amber' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        req.status_color === 'indigo' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                        req.status_color === 'emerald' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        req.status_color === 'rose' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                        req.status_color === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {req.status === 'completed' && <CheckCircle2 size={12} />}
                        {req.status === 'in_progress' && <Clock size={12} className="animate-spin-slow" />}
                        {req.status === 'pending' && <AlertCircle size={12} />}
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-400">{req.created_at}</td>
                  <td className="px-8 py-4">
                    <img src={req.picture} alt={req.asset_name} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Filter size={48} className="opacity-20" />
              <p className="font-bold tracking-tight">No requests found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
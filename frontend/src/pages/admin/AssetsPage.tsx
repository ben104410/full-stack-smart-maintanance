import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AddAssetModal from "../../components/AddAssetModal";
import EditAssetModal from "../../components/EditAssetModal";
import { Plus, Search, Trash2, Edit3, Boxes, RefreshCw } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  category: string;
  location: string;
  condition: string;
  image?: string;
  qr_code?: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("assets/all/");
      setAssets(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load asset list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      await api.delete(`assets/delete/${id}/`);
      toast.success("Asset deleted successfully");
      fetchAssets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete asset");
    }
  };

  const conditionBadge = (condition: string) => {
    const norm = (condition || "").toLowerCase().replace(/[\s-]/g, "_");
    if (norm === "working") {
      return <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 capitalize">Working</span>;
    }
    if (norm === "under_repair") {
      return <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 capitalize">Under Repair</span>;
    }
    if (norm === "damaged") {
      return <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 capitalize">Damaged</span>;
    }
    return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 capitalize">{condition}</span>;
  };

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-sky-600">Asset Registry</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Campus Equipment &amp; Assets</h1>
          <p className="mt-1 text-xs text-slate-500">Track institutional hardware, appliances, and facilities equipment.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAssets}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm"
            title="Refresh assets"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700 active:scale-95"
          >
            <Plus size={15} /> Add Asset
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by name, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-500/10 font-medium"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="py-16 text-center">
            <Boxes className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">No assets found</p>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or add a new asset.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Asset</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Condition</th>
                  <th className="px-5 py-3.5">QR Code</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {asset.image ? (
                          <img src={asset.image} alt={asset.name} className="h-11 w-11 rounded-lg object-cover border border-slate-200" />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                            <Boxes size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900">{asset.name}</p>
                          <p className="text-xs text-slate-400">ID: #{asset.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-600">{asset.category}</td>
                    <td className="px-5 py-3.5 text-slate-600">{asset.location}</td>
                    <td className="px-5 py-3.5">{conditionBadge(asset.condition)}</td>
                    <td className="px-5 py-3.5">
                      {asset.qr_code ? (
                        <img src={asset.qr_code} alt="QR" className="h-10 w-10 rounded border border-slate-200 bg-white p-0.5" />
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditAsset(asset)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddAssetModal close={() => setShowAddModal(false)} refresh={fetchAssets} />
      )}

      {editAsset && (
        <EditAssetModal asset={editAsset} close={() => setEditAsset(null)} refresh={fetchAssets} />
      )}
    </div>
  );
}
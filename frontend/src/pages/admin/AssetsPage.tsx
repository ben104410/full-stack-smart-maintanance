import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import AddAssetModal from "../../components/AddAssetModal";
import EditAssetModal from "../../components/EditAssetModal";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editAsset, setEditAsset] = useState(null);

  const fetchAssets = () => {
    api.get("assets/all/")
      .then(res => setAssets(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this asset?")) return;

    try {
      await api.delete(`assets/delete/${id}/`);
      fetchAssets();
    } catch (err) {
      alert("Failed to delete asset");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Asset Management</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white p-2 rounded"
        >
          + Add Asset
        </button>
      </div>

      <input
        type="text"
        placeholder="Search assets..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Location</th>
            <th className="p-2">Condition</th>
            <th className="p-2">QR Code</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets
            .filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
            .map(asset => (
            <tr key={asset.id} className="border-t">
              <td className="p-2">
                {asset.image ? <img src={asset.image} className="h-12 w-12 rounded" /> : "—"}
              </td>

              <td className="p-2">{asset.name}</td>
              <td className="p-2">{asset.category}</td>
              <td className="p-2">{asset.location}</td>
              <td className="p-2">{asset.condition}</td>

              <td className="p-2">
                {asset.qr_code ? (
                  <img src={asset.qr_code} className="h-12 w-12" />
                ) : "—"}
              </td>

              <td className="p-2 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => setEditAsset(asset)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(asset.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add asset modal */}
      {showAddModal && (
        <AddAssetModal close={() => setShowAddModal(false)} refresh={fetchAssets} />
      )}

      {/* Edit asset modal */}
      {editAsset && (
        <EditAssetModal asset={editAsset} close={() => setEditAsset(null)} refresh={fetchAssets} />
      )}
    </AdminLayout>
  );
}
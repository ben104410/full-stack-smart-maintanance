import { useState } from "react";
import api from "../api/axios";

export default function EditAssetModal({ asset, close, refresh }) {
  const [form, setForm] = useState({
    name: asset.name,
    category: asset.category,
    location: asset.location,
    condition: asset.condition,
  });

  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await api.put(`assets/update/${asset.id}/`, data);
      refresh();
      close();
    } catch {
      alert("Failed to update asset");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-3">Edit Asset</h2>

        <input
          type="text"
          value={form.name}
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          type="text"
          value={form.category}
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({...form, category: e.target.value})}
        />

        <input
          type="text"
          value={form.location}
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({...form, location: e.target.value})}
        />

        <select
          value={form.condition}
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({...form, condition: e.target.value})}
        >
          <option>Working</option>
          <option>Damaged</option>
          <option>Under Repair</option>
          <option>Retired</option>
        </select>

        <label className="block mb-2">Change Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <div className="flex justify-end mt-3 space-x-2">
          <button type="button" onClick={close} className="p-2 bg-gray-400 rounded text-white">
            Cancel
          </button>
          <button className="p-2 bg-green-600 rounded text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
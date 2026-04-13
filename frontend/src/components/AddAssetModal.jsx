import { useState } from "react";
import api from "../api/axios";

export default function AddAssetModal({ close, refresh }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    condition: "Working",
  });

  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await api.post("assets/create/", data);
      refresh();
      close();
    } catch {
      alert("Failed to create asset");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-3">Add New Asset</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <select
          className="w-full p-2 border mb-2"
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
        >
          <option>Working</option>
          <option>Damaged</option>
          <option>Under Repair</option>
          <option>Retired</option>
        </select>

        <label className="block mb-2">Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <div className="flex justify-end mt-3 space-x-2">
          <button type="button" onClick={close} className="p-2 bg-gray-400 rounded text-white">
            Cancel
          </button>
          <button className="p-2 bg-blue-600 rounded text-white">Add</button>
        </div>
      </form>
    </div>
  );
}

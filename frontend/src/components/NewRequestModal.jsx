import { useState, useEffect } from "react";
import api from "../api/axios";

export default function NewRequestModal({ close, refresh }) {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    asset: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get("assets/all/")
      .then((res) => setAssets(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("before_image", image);

    try {
      await api.post("maintenance/create/", data);
      refresh();
      close();
    } catch {
      alert("Failed to submit request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow w-96"
        onSubmit={submit}
      >
        <h2 className="text-xl font-bold mb-4">New Maintenance Request</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border mb-3"
          rows="3"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          className="w-full p-2 border mb-3"
          onChange={(e) => setForm({ ...form, asset: e.target.value })}
        >
          <option value="">No asset selected</option>
          {assets.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {a.location}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Upload Image (Optional):</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
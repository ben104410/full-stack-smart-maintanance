import { useState } from "react";
import api from "../api/axios";

export default function UpdateStatusModal({ task, close, refresh }) {
  const [status, setStatus] = useState(task.status);
  const [notes, setNotes] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const updateStatus = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("status", status);
    form.append("technician_notes", notes);
    if (beforeImage) form.append("before_image", beforeImage);
    if (afterImage) form.append("after_image", afterImage);

    try {
      await api.put(`maintenance/update/${task.id}/`, form);
      refresh();
      close();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={updateStatus}>
        <h2 className="text-xl font-bold mb-3">
          Update Task — {task.title}
        </h2>

        <select
          className="w-full p-2 border mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <textarea
          placeholder="Technician notes..."
          className="w-full p-2 border mb-3"
          rows="3"
          onChange={(e) => setNotes(e.target.value)}
        />

        <label className="block mb-1 font-medium">Before Image:</label>
        <input type="file" className="mb-3" onChange={(e) => setBeforeImage(e.target.files[0])} />

        <label className="block mb-1 font-medium">After Image:</label>
        <input type="file" className="mb-3" onChange={(e) => setAfterImage(e.target.files[0])} />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={close} className="p-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button className="p-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  );
}
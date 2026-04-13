import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AssignTechnicianModal({ request, close, refresh }) {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    api.get("users/all/")
      .then((res) => {
        const techs = res.data.filter((u) => u.role === "technician");
        setTechnicians(techs);
      })
      .catch((err) => console.log(err));
  }, []);

  const assign = async () => {
    if (!selectedTech) return alert("Select a technician");

    try {
      await api.put(`maintenance/assign/${request.id}/`, {
        technician_id: selectedTech,
      });

      refresh();
      close();
    } catch (err) {
      alert("Failed to assign technician");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-3">
          Assign Technician — {request.title}
        </h2>

        <select
          className="w-full p-2 border mb-4"
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          <option>Select Technician</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.username} ({tech.email})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-3 py-1 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={assign} className="px-3 py-1 bg-blue-600 text-white rounded">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../../api/axios";
import StaffLayout from "../../layouts/StaffLayout";
import NewRequestModal from "../../components/NewRequestModal";

export default function StaffDashboard() {
  const [requests, setRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchRequests = () => {
    api
      .get("maintenance/my-requests/")
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <StaffLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Maintenance Requests</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Request
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Asset</th>
            <th className="p-2">Submitted</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{req.title}</td>
              <td className="p-2">{req.priority}</td>
              <td className="p-2">{req.status}</td>
              <td className="p-2">{req.asset?.name || "—"}</td>
              <td className="p-2">
                {new Date(req.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openModal && (
        <NewRequestModal close={() => setOpenModal(false)} refresh={fetchRequests} />
      )}
    </StaffLayout>
  );
}
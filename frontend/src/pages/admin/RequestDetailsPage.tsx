import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

interface RequestData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  user: {
    username: string;
    email: string;
    role: string;
  };
  asset?: {
    name: string;
    category: string;
    location: string;
    condition: string;
    image?: string;
    qr_code?: string;
  };
  technician?: {
    username: string;
    email: string;
  };
  before_image?: string;
  after_image?: string;
}

interface ActivityLog {
  id: string;
  user?: {
    username: string;
  };
  action: string;
  details: string;
  timestamp: string;
}

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const req = await api.get(`maintenance/${id}/`);
      setRequestData(req.data);

      const logRes = await api.get("activity/");
      const filteredLogs = logRes.data.filter(
        (log) => log.details?.includes(req.data.title)
      );
      setLogs(filteredLogs);

      setLoading(false);
    } catch (err) {
      console.log("Error fetching request:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;
  if (!requestData) return <AdminLayout><p>Request not found.</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Request Details — {requestData.title}
      </h1>

      {/* Basic info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Request Information</h2>
          <p><strong>Title:</strong> {requestData.title}</p>
          <p><strong>Description:</strong> {requestData.description}</p>
          <p><strong>Status:</strong> {requestData.status}</p>
          <p><strong>Priority:</strong> {requestData.priority}</p>
          <p><strong>Created:</strong> {new Date(requestData.created_at).toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-3">User Information</h2>
          <p><strong>Submitted by:</strong> {requestData.user.username}</p>
          <p><strong>Email:</strong> {requestData.user.email}</p>
          <p><strong>Role:</strong> {requestData.user.role}</p>
        </div>
      </div>

      {/* Asset information */}
      {requestData.asset && (
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-3">Asset Information</h2>
          <p><strong>Name:</strong> {requestData.asset.name}</p>
          <p><strong>Category:</strong> {requestData.asset.category}</p>
          <p><strong>Location:</strong> {requestData.asset.location}</p>
          <p><strong>Condition:</strong> {requestData.asset.condition}</p>

          {requestData.asset.image && (
            <img
              src={requestData.asset.image}
              alt="Asset"
              className="h-32 mt-3 rounded"
            />
          )}

          {requestData.asset.qr_code && (
            <img
              src={requestData.asset.qr_code}
              alt="QR Code"
              className="h-32 mt-3"
            />
          )}
        </div>
      )}

      {/* Technician information */}
      {requestData.technician && (
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-3">Assigned Technician</h2>
          <p><strong>Name:</strong> {requestData.technician.username}</p>
          <p><strong>Email:</strong> {requestData.technician.email}</p>
        </div>
      )}

      {/* Images section */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-3">Images</h2>

        <div className="flex gap-6">
          {requestData.before_image && (
            <div>
              <p><strong>Before:</strong></p>
              <img
                src={requestData.before_image}
                alt="Before"
                className="h-40 rounded"
              />
            </div>
          )}

          {requestData.after_image && (
            <div>
              <p><strong>After:</strong></p>
              <img
                src={requestData.after_image}
                alt="After"
                className="h-40 rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Activity log */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Activity Log</h2>

        {logs.length === 0 ? (
          <p>No logs available.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="border-b py-2">
              <p><strong>User:</strong> {log.user?.username || "System"}</p>
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>Details:</strong> {log.details}</p>
              <p className="text-sm text-gray-600">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
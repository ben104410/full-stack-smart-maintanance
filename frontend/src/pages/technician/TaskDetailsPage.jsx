import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import TechnicianLayout from "../../layouts/TechnicianLayout";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await api.get(`maintenance/${id}/`);
      setTask(res.data);

      const logRes = await api.get("activity/");
      const taskLogs = logRes.data.filter(
        (log) => log.details?.includes(res.data.title)
      );
      setLogs(taskLogs);

      setLoading(false);
    } catch (err) {
      console.log("Error loading task:", err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) {
    return (
      <TechnicianLayout>
        <p>Loading...</p>
      </TechnicianLayout>
    );
  }

  return (
    <TechnicianLayout>
      <h1 className="text-3xl font-bold mb-6">{task.title}</h1>

      {/* Task Overview */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Task Overview</h2>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Created:</strong> {new Date(task.created_at).toLocaleString()}</p>
      </div>

      {/* Asset info */}
      {task.asset && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">Asset Information</h2>
          <p><strong>Name:</strong> {task.asset.name}</p>
          <p><strong>Category:</strong> {task.asset.category}</p>
          <p><strong>Location:</strong> {task.asset.location}</p>
          <p><strong>Condition:</strong> {task.asset.condition}</p>

          {task.asset.image && (
            <img src={task.asset.image} alt="Asset" className="h-32 mt-3 rounded" />
          )}
        </div>
      )}

      {/* Images */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Images</h2>

        <div className="flex gap-6">
          {task.before_image && (
            <div>
              <p><strong>Before Repair:</strong></p>
              <img src={task.before_image} className="h-40 rounded" />
            </div>
          )}

          {task.after_image && (
            <div>
              <p><strong>After Repair:</strong></p>
              <img src={task.after_image} className="h-40 rounded" />
            </div>
          )}
        </div>
      </div>

      {/* Technician Notes */}
      {task.technician_notes && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-3">Technician Notes</h2>
          <p className="whitespace-pre-line">{task.technician_notes}</p>
        </div>
      )}

      {/* Activity Logs */}
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
    </TechnicianLayout>
  );
}
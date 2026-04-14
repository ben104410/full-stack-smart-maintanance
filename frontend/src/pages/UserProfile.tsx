import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`;
  const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

  // Fetch profile on page load
  useEffect(() => {
    api
      .get("/users/profile/")
      .then((res) => {
        setProfile(res.data);
        setImagePreview(res.data.profile_picture);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put("/users/profile/", profile);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }

    setLoading(false);
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setProfile({ ...profile, profile_picture: data.secure_url });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={imagePreview || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow mb-4 object-cover"
          />

          <label className="bg-blue-700 text-white py-2 px-4 rounded cursor-pointer">
            Upload New Photo
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 mt-8">

          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Email (Read only)</label>
            <input
              type="text"
              value={profile.email}
              readOnly
              className="w-full p-2 border bg-gray-200 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Department</label>
            <input
              type="text"
              value={profile.department || ""}
              onChange={(e) =>
                setProfile({ ...profile, department: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <button className="w-full bg-blue-700 text-white p-3 rounded mt-4 font-bold">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

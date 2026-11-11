import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { ArrowLeft, User as UserIcon, Mail, Phone, Building, ShieldCheck } from "lucide-react";

interface UserProfileData {
  username?: string;
  email?: string;
  role?: string;
  profile_picture?: string;
  phone?: string;
  department?: string;
}

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  // Fetch profile on page load
  useEffect(() => {
    api
      .get("users/profile/")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load user profile");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put("users/profile/", profile);
      setProfile(response.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/portals"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={14} /> Back to Portals Hub
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck size={14} /> Verified Member
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-card">
          <div className="flex flex-col items-center border-b border-slate-100 pb-8 text-center">
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="h-24 w-24 rounded-2xl object-cover border-2 border-sky-200 shadow-md"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-3xl font-black text-white shadow-md">
                {profile?.username?.[0]?.toUpperCase() || "P"}
              </div>
            )}

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">{profile?.username}</h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-sky-600">
              Role: <span className="capitalize">{profile?.role}</span>
            </p>
          </div>

          <form onSubmit={handleUpdate} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Display Username
              </label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={profile?.username ?? ""}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Institutional Email (Read Only)
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  readOnly
                  value={profile?.email ?? ""}
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3.5 text-xs text-slate-500 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+254 700 000000"
                    value={profile?.phone ?? ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Department / Office
                </label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Facilities &amp; Estate"
                    value={profile?.department ?? ""}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Profile Avatar URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={profile?.profile_picture ?? ""}
                onChange={(e) => setProfile({ ...profile, profile_picture: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-sky-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99] disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save Profile Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

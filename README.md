# Smart Maintenance Request & Asset Tracking System  
A Web-Based Maintenance Management Platform for Universities

## 📌 Project Overview
The Smart Maintenance Request & Asset Tracking System is a full-stack web application designed for university environments. It enables students and staff to submit maintenance requests, allows technicians to manage assigned tasks, and provides administrators with tools to track assets, assign technicians, and monitor campus-wide maintenance activities.

This system improves efficiency, accountability, communication, and ensures that damaged facilities and assets are repaired promptly.

---

## 🚀 Key Features

### 🔐 User Management
- Custom user model (Admin, Technician, Staff, Student)
- JWT authentication (login, registration, token refresh)
- Role-based access control

### 🛠 Maintenance Request Module
- Submit maintenance requests with title, description, location, and images
- Admin assigns technicians
- Technicians update status (In Progress, Completed)
- Users track progress in real time

### 🖥 Asset Tracking Module
- Asset registration (name, category, location, condition)
- Upload asset images
- Track condition (Working, Damaged, Under Repair, Retired)
- Update asset info and view asset list

### 🔔 Notifications Module
- Automatic notifications for:
  - New maintenance requests
  - Technician assignments
  - Status updates
- Mark notifications as read

### 📋 Activity Log Module
- System-wide activity logging for:
  - Request creation
  - Technician assignment
  - Status updates
  - Asset creation and updates
- Admin-access-only logs

---

## 🧱 System Architecture

**Frontend:** React.js + Tailwind CSS  
**Backend:** Django REST Framework  
**Database:** Sqlite  
**Storage:** Cloudinary (images)  
**Authentication:** JWT  
**Deployment:**  
- Frontend → Vercel / Netlify  
- Backend → Render / Railway  

---

## 📂 Project Folder Structure


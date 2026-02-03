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

project-root/
│
├── backend/
│ ├── backend/ # Django project settings
│ ├── users/ # User authentication & roles
│ ├── maintenance/ # Maintenance request module
│ ├── assets/ # Asset tracking module
│ ├── notifications/ # Notifications module
│ ├── activity/ # System logs
│ ├── env/ # Virtual environment
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── utils/
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 🔽 Clone the Repository
```bash
git clone https://github.com/yourusername/maintenance-system.git
cd maintenance-system
🛠 Backend Setup (Django REST)
1. Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate   # Mac/Linux
2. Install dependencies
pip install -r requirements.txt
3. Configure PostgreSQL database in backend/settings.py
DATABASES = {
    'default': {
        
    }
}
4. Apply migrations
python manage.py makemigrations
python manage.py migrate
5. Start the backend server
python manage.py runserver
🌐 Frontend Setup (React)
1. Install dependencies
npm install
2. Start the development server
npm run dev
🔌 API Endpoints Overview
🔐 Authentication
Method	Endpoint	Description
POST	/api/users/register/	Register user
POST	/api/users/login/	Login user (JWT)
GET	/api/users/profile/	Get logged-in user info
🛠 Maintenance Requests
Method	Endpoint	Description
POST	/api/maintenance/create/	Create maintenance request
GET	/api/maintenance/all/	List all maintenance requests
POST	/api/maintenance/assign/<id>/	Assign technician
POST	/api/maintenance/update-status/<id>/	Update request status
🖥 Asset Tracking
Method	Endpoint	Description
POST	/api/assets/create/	Register asset
GET	/api/assets/all/	List assets
PUT	/api/assets/update/<id>/	Update asset
🔔 Notifications
Method	Endpoint	Description
GET	/api/notifications/my/	Retrieve user notifications
POST	/api/notifications/mark-read/<id>/	Mark notification as read
📋 Activity Logs (Admin Only)
Method	Endpoint	Description
GET	/api/activity/	List system activity logs
🧪 Testing
Run the Django test suite:

python manage.py test
🚀 Deployment
Backend (Render, Railway, etc.)
- Create service
- Add environment variables
- Connect PostgreSQL instance
- Deploy from GitHub
Frontend (Vercel, Netlify)
npm run build
Upload build folder
Deploy automatically
📘 Future Improvements
SMS/Email notification integration

QR code asset scanning

Technician performance analytics dashboard

Mobile app version

Predictive maintenance (AI-based)

🧑‍💻 Developers
Benjamin — Lead Developer

ChatGPT — Assistant

📜 License
This project is open-source and available under the MIT License.



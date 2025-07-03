 🧠 Smart Task Tracker

A full-stack task management app built using **Django (backend)** and **React + Vite (frontend)**. This app allows users to manage tasks, track progress, and maintain productivity.

---

📁 Project Structure

TASK-TRACKER/
├── backend/
│ ├── smart_tracker/
│ ├── tracker/
│ ├── manage.py
│ ├── requirements.txt
│ └── db.sqlite3 (not pushed)
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ ├── vite.config.js
│ └── README.md


---

🚀 Features

- ✅ Mock login
- ✅ Create, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Responsive UI using React + Vite
- ✅ Django REST API backend

---

🛠 Requirements

📌 Backend (Django)

- Python 3.10+
- pip

📌 Frontend (React + Vite)

- **Node.js >= 20.19.0**
- **npm >= 10.0.0**

🔗 Download latest Node.js: https://nodejs.org/en/download

---

## ⚙️ Setup Instructions

### 📥 Clone the Repository
git clone https://github.com/your-username/TASK-TRACKER.git
cd TASK-TRACKER

🐍 Backend Setup
cd backend
python -m venv myenv

# Activate virtual environment
myenv\Scripts\activate        # Windows
# source myenv/bin/activate   # macOS/Linux

# Install Python dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Run the development server
python manage.py runserver


⚛️ Frontend Setup
Open a new terminal (keep Django running in the other):

cd frontend
npm install
npm run dev
The React app will run at 👉 http://localhost:5173
The Django backend will run at 👉 http://127.0.0.1:8000

🧪 Testing the App
Start backend server: python manage.py runserver

Start frontend dev server: npm run dev

Visit http://localhost:5173 to use the app

Check /tasks/ on backend for API response

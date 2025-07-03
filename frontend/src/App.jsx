import React, { useState, useEffect } from 'react'
import API from './api'
import Logo from './assets/Logo.jpg'
import Login from './components/Login'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', description: '', category: '' })
  const [editingTask, setEditingTask] = useState(null)
  const [username, setUsername] = useState(localStorage.getItem('username') || '')

  useEffect(() => {
    if (username) fetchTasks()
  }, [username])

  const fetchTasks = async () => {
    const res = await API.get('/tasks/')
    setTasks(res.data)
  }

  const handleCreate = async () => {
    if (!newTask.title.trim()) return
    await API.post('/tasks/create/', newTask)
    setNewTask({ title: '', description: '', category: '' })
    fetchTasks()
  }

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}/delete/`)
    fetchTasks()
  }

  const handleToggle = async (task) => {
    await API.put(`/tasks/${task.id}/update/`, { ...task, completed: !task.completed })
    fetchTasks()
  }

  const handleEdit = (task) => {
    setEditingTask({ ...task })
  }

  const handleEditChange = (field, value) => {
    setEditingTask({ ...editingTask, [field]: value })
  }

  const handleSaveUpdate = async () => {
    await API.put(`/tasks/${editingTask.id}/update/`, editingTask)
    setEditingTask(null)
    fetchTasks()
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('username')
    setUsername('')
  }

  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  if (!username) return <Login onLogin={setUsername} />

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1> <img 
            src={Logo} 
            alt="Logo" 
            className="me-2" 
            style={{ width: '40px', height: '40px' }} 
          /> Smart Task Tracker</h1>
        <div>
          <strong>Welcome, {username}</strong>
          <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
            </select>
          </div>
          <div className="col-md-3 d-grid">
           <button
            className="btn btn-success"
            onClick={handleCreate}
            disabled={!newTask.title.trim() || !newTask.category.trim()}
          >
            Add Task
          </button>
          </div>
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="alert alert-info">
           <strong>Summary:</strong> {completed}/{total} completed ({percent}%)
        </div>
      )}

      {tasks.length === 0 ? (
  <div className="alert alert-warning text-center">No tasks added</div>
) : (
  <div className="row">
    {tasks.map((task) => (
      <div className="col-md-6 mb-3" key={task.id}>
        <div className={`card ${task.completed ? 'bg-light' : ''}`}>
          <div className="card-body">
            {editingTask && editingTask.id === task.id ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingTask.title}
                  onChange={(e) => handleEditChange('title', e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingTask.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                />
                <select
                  className="form-select mb-2"
                  value={editingTask.category}
                  onChange={(e) => handleEditChange('category', e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </select>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleSaveUpdate}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h5 className={`card-title ${task.completed ? 'text-decoration-line-through' : ''}`}>{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p><strong>Category:</strong> {task.category}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button className="btn btn-outline-success btn-sm" onClick={() => handleToggle(task)}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(task)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  )
}

export default App

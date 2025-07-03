import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <h2 className="mb-3">Login to Smart Task Tracker</h2>
      <input
        className="form-control w-50 mb-2"
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;

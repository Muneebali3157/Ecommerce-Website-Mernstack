import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

// Set base URL for axios
const API_URL = 'http://localhost:5000/api';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email });
      
      const res = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Login response:', res.data);

      if (res.data && res.data.token) {
        // Store user data
        const userData = {
          name: res.data.user?.name || res.data.name || email.split('@')[0],
          email: email,
          id: res.data.user?.id || res.data.id
        };
        
        login(res.data.token, userData);
        alert('Login successful!');
        navigate('/');
      } else {
        setError('Invalid response from server');
      }

    } catch (err) {
      console.error('Login error:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Connection timeout. Please try again.');
      } else if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        // Request made but no response
        setError('Cannot connect to server. Please check if backend is running on port 5000');
        console.log('No response received. Make sure backend is running at:', API_URL);
      } else {
        setError('Login failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            {error.includes('Cannot connect') && (
              <div className="mt-2 text-sm">
                <p>✅ Your backend IS running (I can see the logs)</p>
                <p>⚠️ But frontend cannot reach it. Try:</p>
                <ol className="list-decimal ml-4 mt-1">
                  <li>Check if both terminals are running (frontend & backend)</li>
                  <li>Try using <strong>127.0.0.1:5000</strong> instead of localhost</li>
                  <li>Disable firewall temporarily</li>
                  <li>Check if React is running on port 5173</li>
                </ol>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
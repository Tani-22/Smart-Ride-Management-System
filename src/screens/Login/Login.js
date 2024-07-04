import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push, set, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust the path to your firebase.js file
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      let loggedIn = false;
      for (let key in users) {
        if (users[key].email === formData.email && users[key].password === formData.password) {
          loggedIn = true;
          break;
        }
      }
      if (loggedIn) {
        navigate('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const newUserRef = push(ref(database, 'users'));
      await set(newUserRef, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Clear form data
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to login
      setIsLogin(true);
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-none d-md-block bg-image"></div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center other-half">
          <h1 className="mb-5 poolpal-title">POOLPAL</h1>
          {isLogin ? (
            <div className="login-form text-left">
              <h2 className="mb-2">Login</h2>
              <p className="mb-4">Enter your credentials to access your account</p>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email address <span className="is-important">*</span></label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} value={formData.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password <span className="is-important">*</span></label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                </div>
                <div className="form-group d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                  </div>
                  <p className="text-end forgot-password">Forgot Password?</p>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
                <div className="form-group mt-4 text-center">
                  <span>Not registered yet? <a href="#" onClick={() => setIsLogin(false)}>Create an account</a></span>
                </div>
              </form>
            </div>
          ) : (
            <div className="login-form text-left">
              <h2 className="mb-2">Register</h2>
              <p className="mb-4">Create your account</p>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="name">Name <span className="is-important">*</span></label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address <span className="is-important">*</span></label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password <span className="is-important">*</span></label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password <span className="is-important">*</span></label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Register</button>
                <div className="form-group mt-4 text-center">
                  <span>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

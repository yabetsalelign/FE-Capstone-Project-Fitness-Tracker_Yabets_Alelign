import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import Logo from '../assets/Logo.png';

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const isAuthenticated = login(values.email, values.password);
      if (isAuthenticated) {
        navigate('/profile');
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/4 p-8">
        <div className="flex flex-col justify-center items-center mb-6">
          <img src={Logo} alt="FitPulse Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-xl font-bold mb-6 text-center">Sign in to FitPulse</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
          <label className="text-left">Email</label>
          <input
            type="email"
            name="email"
            className="border rounded p-2 mb-2 w-full"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          <label className="text-left">Password</label>
          <input
            type="password"
            name="password"
            className="border rounded p-2 mb-6 w-full"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          <button type="submit" className="bg-blue-700 text-white py-2 px-8 rounded-full hover:bg-blue-800 w-full">
            Sign in
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" onClick={navigate('Signup')} className="text-blue-600">
            Create New Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
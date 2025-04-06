import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';  // Zustand store for signup
import Logo from '../assets/Logo.png';  // Adjust the path to your logo

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();  // Zustand signup function

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const isSignedUp = signup(values.name, values.email, values.password);

      if (isSignedUp) {
        navigate('/profile');  // Redirect to profile page after successful signup
      } else {
        alert('Signup failed, email already exists');
      }
    },
  });

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/5 lg:w-1/4 p-8">
      <div className="bg-purple-700 flex flex-col justify-center items-center mb-6 p-6 rounded-lg">
          <img src={Logo} alt="FitPulse Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-xl font-bold mb-6 text-center">Create New Account</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
          <label className="text-left">Full Name</label>
          <input
            type="text"
            name="name"
            className="border rounded p-2 mb-2 bg-gray-300 text-black"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
          <label className="text-left">Email</label>
          <input
            type="email"
            name="email"
            className="border rounded p-2 mb-2 bg-gray-300 text-black"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          <label className="text-left">Password</label>
          <input
            type="password"
            name="password"
            className="border rounded p-2 mb-6 bg-gray-300 text-black"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
         <button type="submit" className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-700">
            Join
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
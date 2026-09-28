import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Car, Mail, Lock, Check, KeyRound, AlertCircle, ArrowRight, X } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, showToast } = useVehicles();

  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [errors, setErrors] = useState({});
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!emailOrMobile.trim()) {
      newErrors.emailOrMobile = 'Email or mobile number is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    loginUser(emailOrMobile, password, rememberMe);
    navigate('/dashboard');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
      showToast("Please enter a valid email address", "warning");
      return;
    }
    showToast("Password reset instructions sent to your email!", "success");
    setForgotModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Account Login' }]} />

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to manage your listings, saved vehicles & enquiries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email/Mobile Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile Number *</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                placeholder="email@example.com or 1234567890"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.emailOrMobile ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.emailOrMobile && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.emailOrMobile}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password *</label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-xs font-semibold text-slate-600 cursor-pointer">
              Remember me on this browser
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Log In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Register Link */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-lg">Reset Password</h3>
              <p className="text-xs text-slate-500">Enter your registered email address to receive password reset instructions.</p>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-medium"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

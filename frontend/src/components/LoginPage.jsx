import React from 'react';
import { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, Facebook, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupPage from './SignUp';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        console.log("Full login response:", response.data); 

        const { token, data: user } = response.data; 

        localStorage.setItem('token', token);
        localStorage.setItem('user',JSON.stringify(user));  

        console.log('Login successful:', user);
        navigate('/');

      //   if(user.isAdmin === true) {
      //   navigate('/admin/dashboard');
      // } else if( user.isAdmin === false) {

      // } else {
      //   alert("Unknown role: access denied ");
      // } 
      } else {
        console.error('Login failed:',response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
    // Here you would typically handle the login logic
    // console.log("Login with:", { email, password, rememberMe });
  };

  const handleSocialLogin = (provider) => {
    // Here you would typically handle the social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-600">Log in to your account</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              {/* <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <a href="forgetPassword" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-10 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              {/* <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 h-5 w-5 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            // onClick={()=> {navigate('/')}}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-600">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-50"
            aria-label="Log in with Google"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </button>
          
          <button 
            onClick={() => handleSocialLogin('Facebook')}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-50"
            aria-label="Log in with Facebook"
          >
            <Facebook size={20} className="text-blue-600" />
          </button>
          
          <button 
            onClick={() => handleSocialLogin('Twitter')}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-50"
            aria-label="Log in with Twitter"
          >
            <Twitter size={20} className="text-sky-500" />
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account yet?{' '}
          <a href="/signupPage" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
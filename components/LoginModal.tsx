'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Supabase OTP logic
    console.log('Sending OTP to:', email);
    setOtpSent(true);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for Supabase OTP verification
    console.log('Verifying OTP:', otp);
  };

  const handleClose = () => {
    setEmail('');
    setOtp('');
    setOtpSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {otpSent ? 'Enter Verification Code' : 'Welcome to EchoSelf'}
          </h2>
          <p className="text-gray-600">
            {otpSent
              ? `We sent a code to ${email}`
              : 'Enter your email to continue'}
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-center text-2xl tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Verify & Continue
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

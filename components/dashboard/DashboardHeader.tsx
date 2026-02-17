'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface DashboardHeaderProps {
  credits: number;
}

export default function DashboardHeader({ credits }: DashboardHeaderProps) {
  const router = useRouter();
  const supabase = createClient();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const packages = [
    {
      credits: 10,
      price: '$4.99',
      url: process.env.NEXT_PUBLIC_LEMON_10_URL
    },
    {
      credits: 50,
      price: '$19',
      url: process.env.NEXT_PUBLIC_LEMON_50_URL
    },
    {
      credits: 100,
      price: '$34',
      url: process.env.NEXT_PUBLIC_LEMON_100_URL
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handlePurchase = (url: string | undefined) => {
    if (!url) {
      alert('Checkout not configured. Please add Lemon Squeezy URLs to environment variables.');
      return;
    }
    window.location.href = url;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-900">EchoSelf</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Credits:</span>
              <span className="text-lg font-bold text-gray-900">{credits}</span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Buy Credits
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-xs text-gray-500">1 message = 5 credits</p>
                  </div>
                  {packages.map((pkg) => (
                    <button
                      key={pkg.credits}
                      onClick={() => handlePurchase(pkg.url)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-gray-900">{pkg.credits} Credits</span>
                      <span className="text-gray-600">{pkg.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="mailto:biz.beingdeveloper@gmail.com?subject=EchoSelf Support Request&body=Hi, I need help with EchoSelf.%0D%0A%0D%0AIssue:%0D%0A"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              title="24/7 Support Available"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Support
            </a>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

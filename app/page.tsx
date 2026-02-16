'use client';

import { useState } from 'react';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">EchoSelf</div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
              Hear the Voice of Your Future Self
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform your aspirations into immersive audio experiences. Practice identity rehearsal through AI-generated scripts spoken in your own voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg"
              >
                Generate Your Future Message
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Goals Stay Abstract Without Reinforcement
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Written affirmations lack the psychological depth needed for true identity shift. Hearing your own voice articulate your future creates stronger neural pathways and deeper internalization.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              EchoSelf turns aspirational thinking into embodied experience through personalized, immersive audio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Email Login
              </h3>
              <p className="text-gray-600">
                Access your account with a one-time password sent to your email. No passwords to remember.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Record or Select Your Voice
              </h3>
              <p className="text-gray-600">
                Clone your voice with a brief recording or choose from premium preset voices.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Describe Your Future Scenario
              </h3>
              <p className="text-gray-600">
                Provide details about your desired future. Our AI crafts a compelling first-person script.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Generate & Replay Immersive Audio
              </h3>
              <p className="text-gray-600">
                Listen to your future self speak. Save to your private library and replay anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Script Generation
              </h3>
              <p className="text-gray-600">
                Intelligent scripts tailored to your specific future scenario, written in authentic first-person perspective.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Private Voice Cloning
              </h3>
              <p className="text-gray-600">
                Your voice stays private. Stored securely and used only for your personal audio generation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Preset Voice Option
              </h3>
              <p className="text-gray-600">
                Prefer not to clone your voice? Choose from professionally recorded preset voices.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Audio Library
              </h3>
              <p className="text-gray-600">
                All generated audio is saved privately. Access your collection anytime, anywhere.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Credit-Based System
              </h3>
              <p className="text-gray-600">
                No subscription required. Purchase credits as needed and use them at your own pace.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Full Voice Deletion Control
              </h3>
              <p className="text-gray-600">
                Delete your cloned voice data at any time with one click. Complete control over your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
              Your Privacy Matters
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Your voice is private and stored securely with enterprise-grade encryption</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">You can delete your voice data at any time with immediate effect</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Your voice is never reused for other purposes or shared with third parties</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Secure AI infrastructure with industry-standard compliance protocols</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Pricing
            </h2>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-lg text-gray-700">
                  <svg className="w-6 h-6 text-gray-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5 free credits on signup
                </div>
                <div className="flex items-center justify-center text-lg text-gray-700">
                  <svg className="w-6 h-6 text-gray-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 audio generation = 5 credits
                </div>
                <div className="flex items-center justify-center text-lg text-gray-700">
                  <svg className="w-6 h-6 text-gray-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Credit bundles available for purchase
                </div>
                <div className="flex items-center justify-center text-lg text-gray-700">
                  <svg className="w-6 h-6 text-gray-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No subscription required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            The future version of you is waiting.
          </h2>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-10 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2026 EchoSelf. All rights reserved.</p>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

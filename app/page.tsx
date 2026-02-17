'use client';

import { useState } from 'react';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold text-gray-900">EchoSelf</div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight mb-8 leading-[1.1]">
              Hear the Voice of<br />Your Future Self
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Practice identity rehearsal through AI-generated scripts spoken in your own voice. Transform aspirations into embodied experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-10 py-5 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl"
              >
                Start Free
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold text-lg hover:border-gray-900 transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Two Powerful Modes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose how you want to experience your transformation
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-10 hover:border-gray-900 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Future Self Message
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Hear your future self speak directly to you. AI crafts a deeply personal narrative based on your specific goals, delivered in your own voice.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  Concrete achievements and outcomes
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  Emotional transformation focus
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  Grounded, realistic reinforcement
                </li>
              </ul>
            </div>
            <div className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-10 hover:border-gray-900 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Affirmations In Your Voice
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Generate powerful first-person affirmations tailored to who you're becoming. Short, rhythmic, and emotionally grounded statements in your own voice.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  20-25 identity-based affirmations
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  Clear, confident, concise
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                  Daily repetition optimized
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Voice Matters
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Written affirmations lack the psychological depth needed for true identity shift. Hearing your own voice articulate your future creates stronger neural pathways and deeper internalization.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              EchoSelf turns aspirational thinking into embodied experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure Email Login
              </h3>
              <p className="text-gray-600 leading-relaxed">
                One-time password sent to your email. No passwords to remember.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Record Your Voice
              </h3>
              <p className="text-gray-600 leading-relaxed">
                60-second voice sample creates your personal voice clone, or choose a preset.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Describe Your Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI crafts a compelling script based on your specific future scenario.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Listen & Replay
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Immersive audio saved to your private library. Replay anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-6">
              Your Voice, Your Control
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Complete privacy and transparency. You own your data.
            </p>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-10 shadow-sm">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold text-lg mb-1">Private & Encrypted</p>
                    <p className="text-gray-600">Your voice is stored securely with enterprise-grade encryption</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold text-lg mb-1">Delete Anytime</p>
                    <p className="text-gray-600">One-click voice deletion with immediate effect. Complete control.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold text-lg mb-1">Never Shared</p>
                    <p className="text-gray-600">Your voice is never reused or shared with third parties</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold text-lg mb-1">Secure Infrastructure</p>
                    <p className="text-gray-600">Industry-standard compliance and data protection protocols</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No subscription. No commitment. Purchase credits as you need them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Starter</p>
                <p className="text-5xl font-bold text-gray-900 mb-2">$4.99</p>
                <p className="text-gray-600 mb-6">10 Credits</p>
                <div className="space-y-3 mb-8">
                  <p className="text-gray-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2"></span>
                    2 messages
                  </p>
                  <p className="text-gray-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2"></span>
                    Try both modes
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 text-white border-2 border-gray-900 rounded-2xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Growth</p>
                <p className="text-5xl font-bold mb-2">$19</p>
                <p className="text-gray-300 mb-6">50 Credits</p>
                <div className="space-y-3 mb-8">
                  <p className="text-gray-200 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                    10 messages
                  </p>
                  <p className="text-gray-200 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                    Best value
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Pro</p>
                <p className="text-5xl font-bold text-gray-900 mb-2">$34</p>
                <p className="text-gray-600 mb-6">100 Credits</p>
                <div className="space-y-3 mb-8">
                  <p className="text-gray-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2"></span>
                    20 messages
                  </p>
                  <p className="text-gray-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2"></span>
                    Maximum savings
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xl border border-gray-200">
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 font-medium">5 free credits on signup • 1 message = 5 credits</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-gray-900"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            The future version of you<br />is waiting.
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Start practicing your transformation today. First message is free.
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-12 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">EchoSelf</div>
            <p className="text-gray-600">&copy; 2026 EchoSelf. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

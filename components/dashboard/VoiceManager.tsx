'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceRecorder from './VoiceRecorder';

interface VoiceManagerProps {
  hasVoice: boolean;
}

export default function VoiceManager({ hasVoice }: VoiceManagerProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showRecorder, setShowRecorder] = useState(false);

  const handleDeleteVoice = async () => {
    if (!confirm('Are you sure you want to delete your voice? This cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch('/api/delete-voice', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete voice');
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Voice Settings</h2>

        {!hasVoice ? (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 mb-2">No custom voice recorded</p>
            <p className="text-sm text-gray-600 mb-3">
              Record your voice once and use it anytime for personalized audio generation.
            </p>
            <button
              onClick={() => setShowRecorder(true)}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Record Voice
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">My Voice Active</span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              onClick={handleDeleteVoice}
              disabled={isDeleting}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete Voice'}
            </button>
          </div>
        )}
      </div>

      <VoiceRecorder
        isOpen={showRecorder}
        onClose={() => setShowRecorder(false)}
        onSuccess={() => {
          setShowRecorder(false);
          router.refresh();
        }}
      />
    </>
  );
}

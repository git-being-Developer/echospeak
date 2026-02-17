'use client';

interface VoiceSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordVoice: () => void;
  onUsePreset: () => void;
}

export default function VoiceSetupModal({
  isOpen,
  onClose,
  onRecordVoice,
  onUsePreset,
}: VoiceSetupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Record Your Voice
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You haven't recorded your voice yet. Record once and use your voice for all future messages, or choose a preset voice.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRecordVoice}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Record My Voice
          </button>
          <button
            onClick={onUsePreset}
            className="w-full px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors"
          >
            Use Preset Voice Instead
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

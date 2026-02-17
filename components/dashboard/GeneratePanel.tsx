'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceSetupModal from './VoiceSetupModal';
import VoiceRecorder from './VoiceRecorder';

interface GeneratePanelProps {
  credits: number;
  hasCustomVoice: boolean;
}

type GenerationMode = 'future' | 'affirmation';

export default function GeneratePanel({ credits, hasCustomVoice }: GeneratePanelProps) {
  const router = useRouter();
  const [scenario, setScenario] = useState('');
  const [mode, setMode] = useState<GenerationMode>('future');
  const [selectedVoiceType, setSelectedVoiceType] = useState<'custom' | 'preset'>('preset');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVoiceSetup, setShowVoiceSetup] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);

  const canGenerate = credits >= 5 && scenario.trim().length > 0;

  const getLabel = () => {
    return mode === 'future'
      ? 'Describe your future scenario'
      : 'Describe the version of yourself you want to become';
  };

  const getPlaceholder = () => {
    return mode === 'future'
      ? 'Example: I am confidently leading my company, speaking on stage, and earning 50 lakhs per year.'
      : 'Example: Confident, disciplined, financially abundant, calm under pressure.';
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;

    if (selectedVoiceType === 'custom' && !hasCustomVoice) {
      setShowVoiceSetup(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          mode,
          selectedVoiceType: hasCustomVoice ? selectedVoiceType : 'preset',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setScenario('');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordVoice = () => {
    setShowVoiceSetup(false);
    setShowVoiceRecorder(true);
  };

  const handleUsePreset = async () => {
    setShowVoiceSetup(false);
    setSelectedVoiceType('preset');
    await handleGenerate();
  };

  const handleVoiceRecordingSuccess = () => {
    setShowVoiceRecorder(false);
    setSelectedVoiceType('custom');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Audio</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
            <div className="inline-flex rounded-lg bg-gray-100 p-1 w-full">
              <button
                type="button"
                onClick={() => setMode('future')}
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  mode === 'future'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                A Message from Future Self
              </button>
              <button
                type="button"
                onClick={() => setMode('affirmation')}
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  mode === 'affirmation'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Affirmations In My Voice
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="scenario" className="block text-sm font-medium text-gray-700 mb-2">
              {getLabel()}
            </label>
            <textarea
              id="scenario"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder={getPlaceholder()}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
            <div className="space-y-2">
              {hasCustomVoice && (
                <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="voiceType"
                    value="custom"
                    checked={selectedVoiceType === 'custom'}
                    onChange={(e) => setSelectedVoiceType('custom')}
                    disabled={isLoading}
                    className="w-4 h-4 text-gray-900"
                  />
                  <span className="text-sm font-medium text-gray-900">My Voice</span>
                </label>
              )}
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="voiceType"
                  value="preset"
                  checked={selectedVoiceType === 'preset'}
                  onChange={(e) => setSelectedVoiceType('preset')}
                  disabled={isLoading}
                  className="w-4 h-4 text-gray-900"
                />
                <span className="text-sm font-medium text-gray-900">Preset Voice</span>
              </label>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {credits < 5 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Not enough credits. You need 5 credits to generate audio.
              </p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isLoading}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Audio (5 credits)'}
          </button>
        </div>
      </div>

      <VoiceSetupModal
        isOpen={showVoiceSetup}
        onClose={() => setShowVoiceSetup(false)}
        onRecordVoice={handleRecordVoice}
        onUsePreset={handleUsePreset}
      />

      <VoiceRecorder
        isOpen={showVoiceRecorder}
        onClose={() => setShowVoiceRecorder(false)}
        onSuccess={handleVoiceRecordingSuccess}
      />
    </>
  );
}

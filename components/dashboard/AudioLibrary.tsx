'use client';

interface Audio {
  id: string;
  script: string;
  audio_url: string;
  created_at: string;
  credits_used: number;
}

interface AudioLibraryProps {
  audios: Audio[];
}

export default function AudioLibrary({ audios }: AudioLibraryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Audio Library</h2>

      {audios.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <p className="text-gray-500 text-sm">No audio generated yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Create your first immersive audio experience
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {truncateText(audio.script)}
                </p>
              </div>

              <div className="mb-3">
                <audio controls className="w-full">
                  <source src={audio.audio_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{formatDate(audio.created_at)}</span>
                <span>{audio.credits_used} credits used</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

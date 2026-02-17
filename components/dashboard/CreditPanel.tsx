'use client';

interface CreditPanelProps {
  currentCredits: number;
}

export default function CreditPanel({ currentCredits }: CreditPanelProps) {
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

  const handlePurchase = (url: string | undefined) => {
    if (!url) {
      alert('Checkout not configured. Please add Lemon Squeezy URLs to environment variables.');
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Buy Credits</h2>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Current Balance</span>
            <span className="text-2xl font-bold text-gray-900">{currentCredits}</span>
          </div>
          <p className="text-xs text-gray-500">1 message = 5 credits</p>
        </div>

        <div className="space-y-2">
          {packages.map((pkg) => (
            <button
              key={pkg.credits}
              onClick={() => handlePurchase(pkg.url)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:border-gray-900 transition-colors flex justify-between items-center"
            >
              <span>{pkg.credits} Credits</span>
              <span>{pkg.price}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center">
          No subscription required. Credits never expire.
        </p>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import GeneratePanel from '@/components/dashboard/GeneratePanel';
import VoiceManager from '@/components/dashboard/VoiceManager';
import AudioLibrary from '@/components/dashboard/AudioLibrary';
import CreditPanel from '@/components/dashboard/CreditPanel';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: voice } = await supabase
    .from('voices')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  const { data: audios } = await supabase
    .from('audios')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader credits={profile?.credits || 0} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <GeneratePanel credits={profile?.credits || 0} hasCustomVoice={!!voice} />
            <VoiceManager hasVoice={!!voice} />
          </div>

          <div className="lg:col-span-2">
            <AudioLibrary audios={audios || []} />
          </div>
        </div>
      </main>
    </div>
  );
}

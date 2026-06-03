import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server';
import DashboardGrid from '@/components/DashboardGrid';
import Sidebar from '@/components/Sidebar';
import SkeletonLoader from '@/components/SkeletonLoader';
export const dynamic = 'force-dynamic';

// Final fix for deployment
async function fetchCourses() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error Details:', error.message, error.details, error.hint);
    return [];
  }
  return data || [];
}

export default async function Home() {
  // Fetching data on the server
  const courses = await fetchCourses();

  return (
    <main className="flex h-screen bg-[#0f0f11] text-white overflow-hidden font-sans">
      <Sidebar />
      <section className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome back, Divyansh
          </h1>
          <p className="text-gray-400 mt-2">Here is your learning progress.</p>
        </header>

        {/* Bento Grid Layout */}
        <Suspense fallback={<SkeletonLoader />}>
          <DashboardGrid courses={courses} />
        </Suspense>
      </section>
    </main>
  );
}
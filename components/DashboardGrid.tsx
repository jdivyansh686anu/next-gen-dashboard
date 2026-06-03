'use client'; // Required for Framer Motion

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }, // Staggered Page Load
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function DashboardGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {/* Hero/Activity Tile (Static for now, spans 2 columns) */}
      <motion.article
        variants={itemVariants}
        className="col-span-1 md:col-span-2 bg-[#1a1a1f] rounded-2xl p-6 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50"></div>
        <h2 className="text-xl font-semibold mb-4 relative z-10">Weekly Activity</h2>
        <div className="h-32 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center relative z-10">
          <p className="text-sm text-gray-500">Activity Chart (Mock)</p>
        </div>
      </motion.article>

      {/* Dynamic Course Tiles */}
      {courses.map((course) => {
        // Dynamically render the icon
        const IconComponent = (Icons as any)[course.icon_name] || Icons.BookOpen;

        return (
          <motion.article
            key={course.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }} // Hover State
            transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Spring Physics
            className="group relative bg-[#1a1a1f] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 overflow-hidden cursor-pointer"
          >
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="p-3 bg-white/5 w-fit rounded-xl mb-4">
                  <IconComponent className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-200">{course.title}</h3>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{course.progress}%</span>
                </div>
                {/* Custom Animated Progress Bar */}
                <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
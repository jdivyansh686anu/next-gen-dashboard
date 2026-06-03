export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
      {/* Skeleton for the Hero/Activity Tile */}
      <div className="col-span-1 md:col-span-2 bg-[#1a1a1f] rounded-2xl h-48 border border-white/5"></div>
      
      {/* Skeletons for the Course Tiles */}
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="bg-[#1a1a1f] rounded-2xl h-48 border border-white/5"
        ></div>
      ))}
    </div>
  );
}
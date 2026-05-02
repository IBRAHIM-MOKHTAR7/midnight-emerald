export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-40 bg-midnight-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-midnight-700 rounded animate-pulse" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-midnight-800 border border-midnight-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-24 bg-midnight-700 rounded animate-pulse" />
              <div className="h-8 w-8 bg-midnight-700 rounded animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-midnight-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-20 bg-midnight-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-midnight-800 rounded-xl border border-midnight-600 overflow-hidden">
        <div className="h-12 bg-midnight-700 animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-t border-midnight-600 animate-pulse bg-midnight-800/50" />
        ))}
      </div>
    </div>
  );
}

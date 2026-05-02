export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-midnight-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-midnight-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-midnight-700 rounded animate-pulse" />
        </div>

        {/* Search & Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 max-w-md h-10 bg-midnight-700 rounded-lg animate-pulse" />
          <div className="w-40 h-10 bg-midnight-700 rounded-lg animate-pulse" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-midnight-800 rounded-2xl overflow-hidden">
              <div className="aspect-[4/5] bg-midnight-700 animate-pulse" />
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-16 bg-midnight-700 rounded-full animate-pulse" />
                  <div className="h-5 w-20 bg-midnight-700 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-midnight-700 rounded animate-pulse mb-3" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-20 bg-midnight-700 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-midnight-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-midnight-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-midnight-700 rounded-2xl animate-pulse" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-midnight-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="h-6 w-24 bg-midnight-700 rounded-full animate-pulse" />
            <div className="h-10 w-3/4 bg-midnight-700 rounded animate-pulse" />
            <div className="h-8 w-32 bg-midnight-700 rounded animate-pulse" />
            <div className="h-20 w-full bg-midnight-700 rounded animate-pulse" />
            <div className="h-12 w-full bg-midnight-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

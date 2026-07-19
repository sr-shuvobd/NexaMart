export default function WishlistPage() {
  return (
    <div className="section-container min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card-base p-8 text-center flex flex-col items-center justify-center col-span-full py-16">
          <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 dark:bg-pink-950/30 flex items-center justify-center mb-4">
            <span className="text-2xl">❤️</span>
          </div>
          <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">No items saved yet</h2>
          <p className="text-neutral-500">Save items you love to your wishlist so you can easily find them later.</p>
        </div>
      </div>
    </div>
  );
}

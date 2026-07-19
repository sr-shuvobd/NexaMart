export default function OrdersPage() {
  return (
    <div className="section-container min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">My Orders</h1>
      <div className="card-base p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 dark:bg-blue-950/30 flex items-center justify-center mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">No orders found</h2>
        <p className="text-neutral-500 max-w-md">You haven't placed any orders yet. When you do, they will appear here.</p>
      </div>
    </div>
  );
}

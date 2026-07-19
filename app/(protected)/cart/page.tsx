export default function CartPage() {
  return (
    <div className="section-container min-h-[60vh] py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Shopping Cart</h1>
      <div className="card-base p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
          <span className="text-2xl">🛒</span>
        </div>
        <h2 className="text-xl font-medium text-neutral-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-neutral-500 max-w-md">Looks like you haven't added anything to your cart yet. Browse our products and find something you love!</p>
      </div>
    </div>
  );
}

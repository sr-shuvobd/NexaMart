"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  [key: string]: any;
}

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: any[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export function CartWishlistProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("nexamart_cart");
    const savedWishlist = localStorage.getItem("nexamart_wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const handleCartCleared = () => {
      setCart([]);
      localStorage.removeItem("nexamart_cart");
    };
    window.addEventListener("nexamart_cart_cleared", handleCartCleared);
    return () => window.removeEventListener("nexamart_cart_cleared", handleCartCleared);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("nexamart_cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist: any[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("nexamart_wishlist", JSON.stringify(newWishlist));
  };

  const addToCart = (product: any) => {
    const productId = product._id || product.id;
    const existing = cart.find(c => c.id === productId);
    if (existing) {
      const newCart = cart.map(c => c.id === productId ? { ...c, quantity: c.quantity + 1 } : c);
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...product, id: productId, quantity: 1 }]);
    }
    toast.success(`Added ${product.name} to Cart!`);
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter(c => c.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    saveCart(cart.map(c => c.id === id ? { ...c, quantity } : c));
  };

  const clearCart = () => {
    saveCart([]);
  }

  const toggleWishlist = (product: any) => {
    const productId = product._id || product.id;
    const exists = wishlist.some(w => (w._id || w.id) === productId);
    if (exists) {
      saveWishlist(wishlist.filter(w => (w._id || w.id) !== productId));
      toast.info(`Removed ${product.name} from Wishlist`);
    } else {
      saveWishlist([...wishlist, { ...product, id: productId }]);
      toast.success(`Added ${product.name} to Wishlist!`);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(w => (w._id || w.id) === id);
  };

  return (
    <CartWishlistContext.Provider value={{ cart: isClient ? cart : [], wishlist: isClient ? wishlist : [], addToCart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist, clearCart }}>
      {children}
    </CartWishlistContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(CartWishlistContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a CartWishlistProvider");
  }
  return context;
};

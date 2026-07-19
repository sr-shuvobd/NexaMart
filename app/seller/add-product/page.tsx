"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, RefreshCw, ImagePlus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";

export default function SellerAddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("You must be logged in as a seller.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/products", {
        name,
        category,
        price: parseFloat(price) || 0,
        originalPrice: originalPrice && !isNaN(parseFloat(originalPrice)) ? parseFloat(originalPrice) : undefined,
        stock: parseInt(stock) || 0,
        description,
        image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
        sellerId: session.user.id,
      });

      if (res.data.success) {
        toast.success("Product added successfully!");
        router.push("/seller/products");
      } else {
        toast.error(res.data.error || "Failed to add product.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=4983d5f47f26efc3e85064efe6b1a73c`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImage(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch {
      toast.error("Error uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div className="flex items-center gap-4">
        <Link href="/seller/products" className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Add New Product</h1>
          <p className="text-sm text-neutral-500">List a new product in the store database.</p>
        </div>
      </div>

      <div className="card-base p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Product Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Apple AirPods Pro" 
                className="input-base" 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="input-base cursor-pointer"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Living</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="249.00" 
                  className="input-base" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Original Price ($) <span className="text-neutral-400">(optional)</span></label>
                <input 
                  type="number" 
                  step="0.01"
                  value={originalPrice} 
                  onChange={(e) => setOriginalPrice(e.target.value)} 
                  placeholder="399.00" 
                  className="input-base" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Stock Quantity</label>
                <input 
                  type="number" 
                  value={stock} 
                  onChange={(e) => setStock(e.target.value)} 
                  placeholder="100" 
                  className="input-base" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <span className="flex items-center gap-1.5"><ImagePlus size={14} /> Product Image</span>
              </label>
              
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className={`px-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${uploadingImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300'}`}>
                    {uploadingImage ? <RefreshCw size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
                
                <span className="text-xs text-neutral-400">OR</span>
                
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="Paste image URL here..." 
                  className="input-base flex-1" 
                />
              </div>

              {image && (
                <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Description</label>
              <textarea 
                rows={4}
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Provide a detailed description of the product..." 
                className="input-base !py-3 resize-none" 
                required 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3">
            <Link href="/seller/products" className="btn-outline py-2 px-4">Cancel</Link>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary py-2 px-4 flex items-center gap-2"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

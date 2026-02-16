import { motion } from "motion/react";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromWishlist } from "../../store/wishlistSlice";
import { addToCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardWishlist() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        variantName: item.variantName,
        price: item.price,
        image: item.image,
        quantity: 1,
        categorySlug: "",
        subProductId: "",
      }),
    );
    toast.success("Added to cart");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1
        className="text-4xl text-[#111] mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
      >
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-sm p-12 text-center">
          <Heart size={64} className="mx-auto text-stone-400 mb-4" />
          <h2
            className="text-2xl text-[#111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Your wishlist is empty
          </h2>
          <p className="text-stone-600 mb-6">
            Save items you love and they will appear here.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#111] text-white px-8 py-3 hover:bg-stone-800 transition-colors"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            EXPLORE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-sm overflow-hidden group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-400 hover:text-red-500 shadow-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-medium text-[#111] mb-1 truncate">
                  {item.productName}
                </h3>
                <p className="text-sm text-stone-500 mb-3">
                  {item.variantName}
                </p>
                <p className="font-semibold text-[#111] mb-5">
                  ₱{item.price.toLocaleString()}
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-[#111] text-white py-3 flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors text-xs font-semibold uppercase tracking-wider"
                  >
                    <ShoppingCart size={14} />
                    ADD TO CART
                  </button>
                  <Link
                    to={`/products/${item.category}/${item.productId}/${item.id}`}
                    className="w-full border border-stone-200 py-3 flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors text-xs font-semibold uppercase tracking-wider"
                  >
                    VIEW PRODUCT
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { updateQuantity, removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const { items, subtotal, tax, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag size={64} className="mx-auto text-stone-400 mb-4" />
            <h2
              className="text-3xl text-[#111] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Cart is Empty
            </h2>
            <p className="text-stone-600 mb-8">
              Start adding beautiful marble and stone products to your cart.
            </p>
            <Link
              to="/products"
              className="inline-block bg-[#111] text-white px-8 py-3 hover:bg-stone-800 transition-colors"
              style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
            >
              EXPLORE PRODUCTS
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-4xl md:text-5xl text-[#111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Shopping Cart
          </h1>
          <p className="text-stone-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-stone-200 rounded-sm p-6"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-stone-200 rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg text-[#111] mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.productName}
                    </h3>
                    {item.variantName && (
                      <p className="text-sm text-stone-600 mb-2">{item.variantName}</p>
                    )}
                    {item.finish && (
                      <p className="text-xs text-stone-500">Finish: {item.finish}</p>
                    )}
                    {item.thickness && (
                      <p className="text-xs text-stone-500">Thickness: {item.thickness}</p>
                    )}

                    {/* Quantity Controls - Mobile */}
                    <div className="flex items-center gap-3 mt-4 lg:hidden">
                      <div className="flex items-center border border-stone-300 rounded-sm">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Price & Actions - Desktop */}
                  <div className="hidden lg:flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="text-right">
                      <p
                        className="text-xl text-[#111] mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>

                      <div className="flex items-center border border-stone-300 rounded-sm">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price - Mobile */}
                  <div className="lg:hidden text-right">
                    <p
                      className="text-lg text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 rounded-sm p-6 sticky top-24"
            >
              <h2
                className="text-2xl text-[#111] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax (12% VAT)</span>
                  <span>₱{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-stone-200 pt-3 flex justify-between">
                  <span
                    className="text-lg text-[#111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-xl text-[#111] font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ₱{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-[#111] text-white text-center py-3 hover:bg-stone-800 transition-colors mb-3"
                style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                to="/products"
                className="block w-full border border-stone-300 text-[#111] text-center py-3 hover:bg-stone-50 transition-colors"
                style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
              >
                CONTINUE SHOPPING
              </Link>

              <div className="mt-6 p-4 bg-stone-50 rounded-sm">
                <p className="text-xs text-stone-600">
                  <strong>Note:</strong> Shipping fee will be calculated based on your location
                  during checkout. For bulk orders, please contact us for a custom quotation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Package, Download, Eye } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { toast } from "sonner";

export default function DashboardOrders() {
  const orders = useAppSelector((state) => state.order.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      dispatch(addToCart(item));
    });
    toast.success("All items added to cart");
    navigate("/cart");
  };

  const handleViewInvoice = () => {
    navigate("/dashboard/invoices");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1
        className="text-4xl text-[#111] mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-sm p-12 text-center">
          <Package size={64} className="mx-auto text-stone-400 mb-4" />
          <h2
            className="text-2xl text-[#111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            No Orders Yet
          </h2>
          <p className="text-stone-600 mb-6">Start shopping and your orders will appear here.</p>
          <Link
            to="/products"
            className="inline-block bg-[#111] text-white px-8 py-3 hover:bg-stone-800 transition-colors"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-stone-200 rounded-sm p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-stone-200">
                <div>
                  <p className="text-sm text-stone-600">Order Number</p>
                  <p
                    className="text-xl text-[#111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-stone-600 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.paymentStatus === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {order.deliveryStatus.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <p className="text-stone-800">{item.productName}</p>
                      {item.variantName && (
                        <p className="text-sm text-stone-600">{item.variantName}</p>
                      )}
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-800">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t border-stone-200">
                <div>
                  <p className="text-sm text-stone-600">Total Amount</p>
                  <p
                    className="text-2xl text-[#111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ₱{order.total.toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-sm hover:bg-stone-50 transition-colors text-sm">
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={handleViewInvoice}
                    className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-sm hover:bg-stone-50 transition-colors text-sm"
                  >
                    <Download size={16} />
                    <span>Invoice</span>
                  </button>
                  {order.paymentStatus === "paid" && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 bg-[#111] text-white rounded-sm hover:bg-stone-800 transition-colors text-sm"
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

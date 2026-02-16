import { motion } from "motion/react";
import { FileText, Download, Eye } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";

export default function DashboardInvoices() {
  const orders = useAppSelector((state) => state.order.orders);
  const paidOrders = orders.filter(o => o.paymentStatus === "paid");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1
        className="text-4xl text-[#111] mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
      >
        My Invoices
      </h1>

      {paidOrders.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-sm p-12 text-center">
          <FileText size={64} className="mx-auto text-stone-400 mb-4" />
          <h2
            className="text-2xl text-[#111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            No Invoices Found
          </h2>
          <p className="text-stone-600 mb-6">Invoices are generated automatically for your paid orders.</p>
          <Link
            to="/dashboard/orders"
            className="inline-block bg-[#111] text-white px-8 py-3 hover:bg-stone-800 transition-colors"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            VIEW ALL ORDERS
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Invoice No.</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Order Reference</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-600 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {paidOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#111]">INV-{order.orderNumber.split('-')[1] || order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                    {new Date(order.paidAt || order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#111]">₱{order.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                    <button className="text-stone-600 hover:text-[#111] transition-colors" title="View Invoice">
                      <Eye size={18} />
                    </button>
                    <button className="text-stone-600 hover:text-[#111] transition-colors" title="Download PDF">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

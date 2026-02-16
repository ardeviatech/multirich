import { motion } from "motion/react";
import { CreditCard, Plus, Trash2, CheckCircle2 } from "lucide-react";

const mockSavedCards = [
  {
    id: "card_1",
    brand: "Visa",
    last4: "4242",
    expiry: "12/28",
    holder: "JUAN DELA CRUZ",
    isDefault: true,
  },
  {
    id: "card_2",
    brand: "Mastercard",
    last4: "8888",
    expiry: "08/26",
    holder: "JUAN DELA CRUZ",
    isDefault: false,
  }
];

export default function DashboardPayments() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1
          className="text-4xl text-[#111]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          Payment Methods
        </h1>
        <button
          className="inline-flex items-center gap-2 bg-[#111] text-white px-6 py-3 hover:bg-stone-800 transition-colors"
          style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
        >
          <Plus size={18} />
          ADD NEW CARD
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockSavedCards.map((card) => (
          <div
            key={card.id}
            className={`bg-white border p-6 rounded-sm relative transition-all ${
              card.isDefault ? "border-[#111] ring-1 ring-[#111]" : "border-stone-200"
            }`}
          >
            {card.isDefault && (
              <div className="absolute top-4 right-4 text-green-600 flex items-center gap-1">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Default</span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-8 bg-stone-100 rounded-sm flex items-center justify-center border border-stone-200">
                <CreditCard className="text-stone-400" size={20} />
              </div>
              <div>
                <p className="font-semibold text-[#111]">
                  {card.brand} •••• {card.last4}
                </p>
                <p className="text-xs text-stone-500 uppercase tracking-widest">
                  Expires {card.expiry}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-500 uppercase tracking-widest mb-6">
              Cardholder: <span className="text-[#111] font-medium">{card.holder}</span>
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button className="text-xs text-red-600 font-semibold flex items-center gap-1 hover:underline">
                <Trash2 size={14} />
                REMOVE
              </button>
              {!card.isDefault && (
                <button className="text-xs text-stone-500 hover:text-[#111] font-semibold underline">
                  SET AS DEFAULT
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="bg-stone-50 border border-dashed border-stone-300 p-6 rounded-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white hover:border-stone-400 transition-all">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-stone-200">
            <Plus className="text-stone-400 group-hover:text-[#111] transition-colors" />
          </div>
          <p className="text-sm font-medium text-stone-600">Add another payment method</p>
          <p className="text-xs text-stone-400 mt-1">PCI-compliant & Secure</p>
        </div>
      </div>

      <div className="mt-12 bg-white border border-stone-200 rounded-sm p-8">
        <h3 className="text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Security Information</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Multi-Rich Home Decors Inc. does not store your full card details on our servers. Your payment information is securely handled by PayMongo, a leading payment gateway provider in the Philippines.
        </p>
        <div className="flex items-center gap-4 opacity-50 grayscale">
          {/* Mock PCI logos */}
          <div className="h-8 w-12 bg-stone-200 rounded-sm"></div>
          <div className="h-8 w-12 bg-stone-200 rounded-sm"></div>
          <div className="h-8 w-12 bg-stone-200 rounded-sm"></div>
        </div>
      </div>
    </motion.div>
  );
}

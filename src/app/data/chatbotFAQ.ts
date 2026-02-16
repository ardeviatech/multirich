export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "Products & Materials",
  "Ordering & Payment",
  "Delivery & Installation",
  "Maintenance & Care",
  "Company Info",
];

export const faqData: FAQItem[] = [
  // Products & Materials
  {
    id: "faq-1",
    question: "What types of marble and stone do you offer?",
    answer: "We offer a wide range including Natural Stones (Marble, Granite, Travertine, Onyx, Limestone), Synthetic Stones (Quartz, Sintered Stone, Porcelain), and specialized materials like Dekton and Neolith. Each material has unique characteristics perfect for different applications.",
    category: "Products & Materials",
  },
  {
    id: "faq-2",
    question: "What's the difference between natural and synthetic stone?",
    answer: "Natural stones are quarried from the earth with unique patterns, while synthetic stones are engineered for consistency and durability. Natural stones offer timeless beauty with natural variations, while synthetic stones provide uniformity, lower maintenance, and often better stain resistance.",
    category: "Products & Materials",
  },
  {
    id: "faq-3",
    question: "Which material is best for kitchen countertops?",
    answer: "For kitchens, we recommend Quartz or Granite. Quartz is non-porous, highly durable, and requires minimal maintenance. Granite offers natural beauty and heat resistance. Both are excellent choices depending on your aesthetic preference and maintenance expectations.",
    category: "Products & Materials",
  },
  {
    id: "faq-4",
    question: "Do you have samples I can see?",
    answer: "Yes! We have a showroom in Metro Manila where you can view full slabs and samples. You can also request small samples to be sent to you. Visit our Contact page to schedule a showroom visit or request samples.",
    category: "Products & Materials",
  },

  // Ordering & Payment
  {
    id: "faq-5",
    question: "How do I place an order?",
    answer: "You can place an order through our website, visit our showroom, or contact us directly. For large projects, we recommend scheduling a consultation first to ensure we select the perfect materials for your needs.",
    category: "Ordering & Payment",
  },
  {
    id: "faq-6",
    question: "What payment methods do you accept?",
    answer: "We accept Credit/Debit Cards (Visa, Mastercard, JCB, Amex), E-Wallets (GCash, Maya, GrabPay, ShopeePay), Online Banking, and BillEase installment payments. For large commercial projects, we also offer invoice payment terms.",
    category: "Ordering & Payment",
  },
  {
    id: "faq-7",
    question: "Do you offer installment plans?",
    answer: "Yes! We partner with BillEase to offer flexible installment plans. You can pay in 3, 6, or 12 monthly installments depending on your order value. Apply during checkout for instant approval.",
    category: "Ordering & Payment",
  },
  {
    id: "faq-8",
    question: "Can I get a quotation for my project?",
    answer: "Absolutely! Please contact us with your project details, measurements, and material preferences. Our team will provide a detailed quotation within 24-48 hours. You can also visit our showroom for an in-person consultation.",
    category: "Ordering & Payment",
  },

  // Delivery & Installation
  {
    id: "faq-9",
    question: "Do you provide installation services?",
    answer: "Yes, we offer professional installation services throughout Metro Manila and nearby provinces. Our experienced team ensures proper installation with precision and care. Installation is quoted separately based on project scope.",
    category: "Delivery & Installation",
  },
  {
    id: "faq-10",
    question: "How long does delivery take?",
    answer: "Delivery time varies by material and quantity. Stock items typically ship within 5-7 business days. Custom orders or special materials may take 2-4 weeks. We'll provide an estimated delivery date when you place your order.",
    category: "Delivery & Installation",
  },
  {
    id: "faq-11",
    question: "What areas do you deliver to?",
    answer: "We deliver throughout Metro Manila, Luzon, and major cities nationwide. Delivery fees vary by location. For remote areas, please contact us for a custom delivery quote.",
    category: "Delivery & Installation",
  },
  {
    id: "faq-12",
    question: "What if my stone arrives damaged?",
    answer: "We take great care in packaging and shipping. If your stone arrives damaged, please document it with photos immediately and contact us within 24 hours. We'll arrange for replacement or repair at no additional cost.",
    category: "Delivery & Installation",
  },

  // Maintenance & Care
  {
    id: "faq-13",
    question: "How do I clean and maintain marble?",
    answer: "Use pH-neutral cleaners and soft cloths for daily cleaning. Avoid acidic cleaners (vinegar, lemon) as they can etch marble. We recommend sealing marble annually to protect against stains. We also offer professional cleaning and sealing services.",
    category: "Maintenance & Care",
  },
  {
    id: "faq-14",
    question: "Does natural stone require sealing?",
    answer: "Most natural stones benefit from periodic sealing to protect against stains and moisture. Marble, granite, and travertine should be sealed every 1-2 years. Quartz and porcelain are non-porous and don't require sealing.",
    category: "Maintenance & Care",
  },
  {
    id: "faq-15",
    question: "Can scratches or stains be removed?",
    answer: "Minor scratches and stains can often be professionally repaired through honing and polishing. We offer restoration services for natural stone surfaces. Contact us for an assessment and quote.",
    category: "Maintenance & Care",
  },
  {
    id: "faq-16",
    question: "What products do you recommend for cleaning?",
    answer: "We recommend pH-neutral stone cleaners specifically formulated for natural stone. Avoid bleach, ammonia, and acidic cleaners. We sell professional-grade cleaning products in our showroom and can recommend the best products for your specific stone type.",
    category: "Maintenance & Care",
  },

  // Company Info
  {
    id: "faq-17",
    question: "How long has Multi-Rich been in business?",
    answer: "Multi-Rich Home Decors was established in 1980, making us one of the Philippines' most trusted marble and stone suppliers with over 40 years of experience serving residential and commercial clients.",
    category: "Company Info",
  },
  {
    id: "faq-18",
    question: "Where is your showroom located?",
    answer: "Our showroom is located in Metro Manila. Please visit our Contact page for the exact address, operating hours, and directions. We recommend calling ahead to schedule a consultation for the best experience.",
    category: "Company Info",
  },
  {
    id: "faq-19",
    question: "Do you work on commercial projects?",
    answer: "Yes! We've supplied materials for hotels, office buildings, condominiums, and retail spaces. We offer volume pricing, dedicated project managers, and coordinated delivery schedules for commercial projects.",
    category: "Company Info",
  },
  {
    id: "faq-20",
    question: "Are you environmentally conscious?",
    answer: "We're committed to sustainable practices. We source from responsible quarries, minimize waste through precise cutting, and recycle stone remnants. We also offer eco-friendly synthetic stone options with recycled content.",
    category: "Company Info",
  },
];

export const quickReplies = [
  "View products",
  "Get a quote",
  "Installation services",
  "Schedule showroom visit",
  "Track my order",
  "Maintenance tips",
];

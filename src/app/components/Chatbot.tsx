import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Search,
  Facebook,
} from "lucide-react";
import { faqData, quickReplies, faqCategories } from "../data/chatbotFAQ";
import { useAppSelector } from "../store/hooks";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const botAvatar =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80";

const greetingMessages = [
  "Hello! I'm Maria from Multi-Rich Home Decors. How may I assist you today? 😊",
  "Good day! I'm Maria, your personal assistant. I'm here to help you find the perfect marble or stone for your project!",
  "Hi there! I'm Maria from Multi-Rich. Whether you're looking for marble, granite, or quartz, I'm here to guide you!",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot opens for the first time
      const userName = user?.firstName ? ` ${user.firstName}` : "";
      const greeting = `${getGreeting()}${userName}! ${
        greetingMessages[Math.floor(Math.random() * greetingMessages.length)]
      }`;

      setTimeout(() => {
        addBotMessage(greeting);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, showFAQ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (content: string, delay = 800) => {
    setIsTyping(true);

    setTimeout(() => {
      const typingMessage: Message = {
        id: Date.now().toString() + "-typing",
        type: "bot",
        content: "",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, typingMessage]);

      // Simulate typing based on message length
      const typingDuration = Math.min(content.length * 20, 2000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === typingMessage.id
              ? { ...msg, content, isTyping: false }
              : msg,
          ),
        );
        setIsTyping(false);
      }, typingDuration);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Greeting responses
    if (
      input.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)
    ) {
      return "Hello! How can I help you today? I can assist you with product information, pricing, orders, or connect you with our team on Facebook Messenger. 😊";
    }

    // Product inquiries
    if (input.match(/\b(product|marble|granite|stone|quartz|material)\b/)) {
      return "We offer a beautiful selection of natural stones (Marble, Granite, Travertine, Onyx) and synthetic stones (Quartz, Sintered Stone, Porcelain). Would you like to view our products or get information about a specific material? I can also connect you with our specialist on Facebook Messenger!";
    }

    // Pricing
    if (input.match(/\b(price|cost|how much|pricing|quote|quotation)\b/)) {
      return "I'd be happy to help with pricing! For accurate quotes, I'll need some details about your project. You can either visit our Products page to browse, or I can connect you with our sales team on Facebook Messenger for a personalized quotation. Which would you prefer?";
    }

    // Installation
    if (input.match(/\b(install|installation|installer|fitting)\b/)) {
      return "Yes, we provide professional installation services throughout Metro Manila and nearby provinces! Our experienced team ensures precision and care. Would you like to discuss your installation needs with our team on Facebook Messenger?";
    }

    // Delivery
    if (input.match(/\b(deliver|delivery|shipping|ship)\b/)) {
      return "We deliver throughout Metro Manila and major cities nationwide. Delivery time for stock items is 5-7 business days, while custom orders may take 2-4 weeks. Would you like to know more about delivery to your area? I can connect you with our logistics team on Messenger!";
    }

    // Order tracking
    if (input.match(/\b(track|order|status|where is my)\b/)) {
      return "You can track your order in your Dashboard under 'My Orders'. If you need immediate assistance with your order status, I can connect you with our customer service team on Facebook Messenger right away!";
    }

    // Showroom
    if (input.match(/\b(showroom|visit|location|address|where)\b/)) {
      return "Our showroom is located in Metro Manila where you can view full slabs and samples. I'd love to help you schedule a visit! Please check our Contact page for details, or I can connect you with our team on Messenger to arrange your visit.";
    }

    // Maintenance
    if (input.match(/\b(clean|maintain|care|seal|stain)\b/)) {
      return "Great question! Proper maintenance keeps your stone beautiful for years. Use pH-neutral cleaners and avoid acidic products. Most natural stones should be sealed annually. Would you like detailed care instructions for a specific stone type? I can also share our maintenance guide via Messenger!";
    }

    // Payment
    if (input.match(/\b(payment|pay|installment|gcash|maya|card)\b/)) {
      return "We accept various payment methods: Credit/Debit Cards, E-Wallets (GCash, Maya, GrabPay, ShopeePay), Online Banking, and BillEase installments. For commercial projects, we offer invoice payment terms. Need help with payment? Let's chat on Messenger!";
    }

    // Contact/Help
    if (
      input.match(
        /\b(contact|help|support|agent|representative|talk to|speak)\b/,
      )
    ) {
      return "I'm here to help! For personalized assistance, you can connect with our live customer service team on Facebook Messenger. They're very responsive and can help with detailed inquiries, quotes, and project planning. Would you like me to redirect you?";
    }

    // Default response
    return "I'd be happy to help! You can ask me about our products, pricing, delivery, installation, or maintenance. For detailed assistance, I can also connect you with our friendly team on Facebook Messenger. What would you like to know? 😊";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue("");

    const response = getBotResponse(userInput);
    addBotMessage(response);
  };

  const handleQuickReply = (reply: string) => {
    if (isTyping) return;

    addUserMessage(reply);

    let response = "";
    switch (reply) {
      case "View products":
        response =
          "Wonderful! You can browse our complete collection on the Products page. We have Natural Stones like Marble and Granite, as well as Synthetic options like Quartz. Each category has detailed information and beautiful samples. Would you like me to give you a specific recommendation?";
        break;
      case "Get a quote":
        response =
          "I'd love to help you get a quote! For the most accurate pricing, I can connect you with our sales team on Facebook Messenger. They'll ask about your project details and provide a detailed quotation within 24 hours. Shall I redirect you?";
        break;
      case "Installation services":
        response =
          "We offer comprehensive installation services! Our professional team handles everything from measurement to final installation. We serve Metro Manila and nearby provinces. For scheduling and pricing, I can connect you with our installation coordinator on Messenger. Would that work for you?";
        break;
      case "Schedule showroom visit":
        response =
          "Excellent! Visiting our showroom is the best way to see the quality and beauty of our materials. You can see full slabs, feel the textures, and get expert advice. Let me connect you with our team on Facebook Messenger to schedule your visit at a convenient time!";
        break;
      case "Track my order":
        response =
          "You can track your order status in your Dashboard under 'My Orders'. If you need immediate assistance or have questions about your order, our customer service team on Messenger can help you right away!";
        break;
      case "Maintenance tips":
        response =
          "Keeping your stone beautiful is easy! Use pH-neutral cleaners, avoid acidic products, and seal natural stones annually. For specific care instructions based on your stone type, I can share our detailed maintenance guide. Would you like me to send it via Messenger, or check our FAQ section?";
        break;
    }
    addBotMessage(response);
  };

  const handleFAQClick = (faq: (typeof faqData)[0]) => {
    addUserMessage(faq.question);
    addBotMessage(
      faq.answer +
        " If you need more detailed information, I can connect you with our team on Facebook Messenger!",
    );
    setShowFAQ(false);
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const handleConnectMessenger = () => {
    addUserMessage("Connect me to Facebook Messenger");
    addBotMessage(
      "Perfect! I'm redirecting you to our Facebook Messenger now. Our team is ready to assist you! 😊",
    );
    setTimeout(() => {
      window.open("https://www.facebook.com/share/18PffkDRdA/", "_blank");
    }, 1500);
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory
      ? faq.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#111] text-white rounded-full p-4 shadow-2xl hover:bg-stone-800 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle size={28} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-stone-200"
          >
            {/* Header */}
            <div className="bg-[#111] text-white p-4 flex items-center gap-3">
              <img
                src={botAvatar}
                alt="Maria - Customer Service"
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div className="flex-1">
                <h3
                  className="font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Maria - Customer Service
                </h3>
                <p className="text-xs text-stone-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online • Usually replies instantly
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-stone-300 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f6f3]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "bot" && (
                    <img
                      src={botAvatar}
                      alt="Maria"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === "user"
                        ? "bg-[#111] text-white"
                        : "bg-white text-stone-800 border border-stone-200"
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex gap-1 py-1">
                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                        <span
                          className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    )}
                  </div>
                  {message.type === "user" && user && (
                    <div className="w-8 h-8 rounded-full bg-stone-300 flex items-center justify-center flex-shrink-0 text-xs font-medium text-stone-700">
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Replies */}
              {messages.length > 0 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors text-stone-700"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Action Buttons Bar */}
            <div className="border-t border-stone-200 p-3 bg-white flex gap-2">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="flex-1 text-xs px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors text-stone-700 font-medium"
              >
                📚 FAQs
              </button>
              <button
                onClick={handleConnectMessenger}
                className="flex-1 text-xs px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium flex items-center justify-center gap-1"
              >
                <Facebook size={14} />
                Live Agent
              </button>
            </div>

            {/* FAQ Panel */}
            <AnimatePresence>
              {showFAQ && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "60%" }}
                  exit={{ height: 0 }}
                  className="border-t border-stone-200 bg-white overflow-hidden flex flex-col"
                >
                  <div className="p-4 border-b border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className="font-medium text-[#111]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Frequently Asked Questions
                      </h4>
                      <button
                        onClick={() => {
                          setShowFAQ(false);
                          setSelectedCategory(null);
                          setSearchQuery("");
                        }}
                        className="text-stone-500 hover:text-stone-700"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-3">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:border-[#111]"
                      />
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                          !selectedCategory
                            ? "bg-[#111] text-white"
                            : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                        }`}
                      >
                        All
                      </button>
                      {faqCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                            selectedCategory === category
                              ? "bg-[#111] text-white"
                              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filteredFAQs.length > 0 ? (
                      filteredFAQs.map((faq) => (
                        <button
                          key={faq.id}
                          onClick={() => handleFAQClick(faq)}
                          className="w-full text-left p-3 bg-stone-50 hover:bg-stone-100 rounded-md transition-colors border border-stone-200"
                        >
                          <p className="text-sm font-medium text-[#111] mb-1">
                            {faq.question}
                          </p>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            {faq.answer}
                          </p>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-stone-500 text-center py-8">
                        No FAQs found. Try a different search or category.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="border-t border-stone-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:border-[#111] disabled:bg-stone-100 disabled:cursor-not-allowed text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#111] text-white rounded-full p-2 hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-2 text-center">
                Powered by Multi-Rich Customer Care
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

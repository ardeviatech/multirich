import { MapPin, Mail, Phone, Clock, CheckCircle, MessageCircle, FileText, HelpCircle, Headphones, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { motion } from "motion/react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    details: [
      "488 Boni Avenue cor. San Joaquin Street",
      "Mandaluyong, Philippines",
    ],
    action: "Get Directions",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["multirich_inc@yahoo.com"],
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+63 2 8894 0000"],
    action: "Call Now",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 12:00 PM", "Sun: Closed"],
    action: null,
  },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: MessageCircle },
  { value: "quote", label: "Request a Quote", icon: FileText },
  { value: "product", label: "Product Information", icon: HelpCircle },
  { value: "support", label: "Technical Support", icon: Headphones },
];

const contactSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s()-]{7,}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  company: yup.string().optional().nullable().required(),
  inquiryType: yup.string().required("Please select an inquiry type"),
  subject: yup.string().required("Subject is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
  preferredContact: yup.string().oneOf(["email", "phone"]).required(),
});

type ContactFormData = yup.InferType<typeof contactSchema>;

const font = {
  heading: "'Cormorant Garamond', serif",
  body: "'Inter', sans-serif",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      company: "",
      inquiryType: "general",
      subject: "",
      message: "",
      preferredContact: "email",
    },
  });

  const selectedInquiryType = watch("inquiryType");

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBaseClass =
    "w-full border py-3 px-4 bg-white outline-none transition-all text-stone-800";
  const inputNormalClass = `${inputBaseClass} border-stone-200 focus:border-[#111] focus:ring-1 focus:ring-[#111]`;
  const inputErrorClass = `${inputBaseClass} border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500`;

  return (
    <div className="relative bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#f5f2ed] pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p
              className="text-stone-400 mb-3"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: font.body,
              }}
            >
              We're here to help
            </p>
            <h1
              className="text-[#111] mb-5"
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Get in Touch with Our Team
            </h1>
            <p
              className="text-stone-500 max-w-2xl"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                fontFamily: font.body,
                fontWeight: 300,
              }}
            >
              Whether you need product information, technical assistance, or a custom quote — our dedicated team is ready to assist you with your project needs.
            </p>
          </motion.div>

          {/* Response time banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-3 mt-6 shadow-sm border border-stone-100"
          >
            
            <p
              className="text-stone-600"
              style={{
                fontSize: "0.8rem",
                fontFamily: font.body,
              }}
            >
              <strong className="text-[#111]">Quick Response Guarantee:</strong> We typically respond within 2-4 hours during business hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Contact Methods */}
          <div className="lg:col-span-1">
            <h2
              className="text-[#111] mb-8"
              style={{
                fontFamily: font.heading,
                fontSize: "1.6rem",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Contact Information
            </h2>

            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-5 bg-[#faf8f6] hover:bg-stone-100 transition-colors duration-300">
                    <div className="flex-shrink-0 w-10 h-10 bg-white flex items-center justify-center">
                      <item.icon size={18} className="text-stone-600" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-[#111] mb-2"
                        style={{
                          fontSize: "0.8rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          fontFamily: font.body,
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.details.map((d, i) => (
                        <p
                          key={i}
                          className="text-stone-600"
                          style={{ fontSize: "0.88rem", lineHeight: 1.6, fontFamily: font.body }}
                        >
                          {d}
                        </p>
                      ))}
                      {item.action && (
                        <button
                          className="inline-flex items-center gap-1 text-[#111] mt-2 text-sm hover:gap-2 transition-all"
                          style={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.05em",
                            fontFamily: font.body,
                          }}
                        >
                          {item.action}
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 p-6 bg-[#111] text-white"
            >
              <MessageCircle size={24} className="mb-3 opacity-80" />
              <h3
                className="mb-2"
                style={{
                  fontFamily: font.heading,
                  fontSize: "1.25rem",
                  fontWeight: 400,
                }}
              >
                Need Immediate Help?
              </h3>
              <p
                className="text-white/70 mb-4"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  fontFamily: font.body,
                }}
              >
                For urgent inquiries or technical support, please call us directly during business hours.
              </p>
              <a
                href="tel:+6328940000"
                className="inline-flex items-center gap-2 bg-white text-[#111] px-5 py-2.5 hover:bg-stone-100 transition-colors"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: font.body,
                }}
              >
                <Phone size={14} />
                Call Now
              </a>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#faf8f6] p-8 md:p-10">
              <h2
                className="text-[#111] mb-2"
                style={{
                  fontFamily: font.heading,
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Send Us a Message
              </h2>
              <p
                className="text-stone-500 mb-8"
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  fontFamily: font.body,
                }}
              >
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 bg-green-50 border-l-4 border-green-500 px-5 py-4 mb-8"
                >
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p
                      className="text-green-800 font-medium mb-1"
                      style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    >
                      Message Sent Successfully!
                    </p>
                    <p
                      className="text-green-700"
                      style={{ fontSize: "0.82rem", fontFamily: font.body }}
                    >
                      Thank you for contacting us. We've received your message and will respond within 2-4 business hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Inquiry Type Selection */}
              <div className="mb-8">
                <label
                  className="block text-stone-600 mb-4"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: font.body,
                    fontWeight: 500,
                  }}
                >
                  What can we help you with? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {inquiryTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex flex-col items-center gap-2 p-4 border-2 cursor-pointer transition-all ${
                        selectedInquiryType === type.value
                          ? "border-[#111] bg-white shadow-sm"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...register("inquiryType")}
                        className="sr-only"
                      />
                      <type.icon
                        size={20}
                        className={
                          selectedInquiryType === type.value
                            ? "text-[#111]"
                            : "text-stone-400"
                        }
                      />
                      <span
                        className={`text-center ${
                          selectedInquiryType === type.value
                            ? "text-[#111]"
                            : "text-stone-500"
                        }`}
                        style={{
                          fontSize: "0.7rem",
                          lineHeight: 1.3,
                          fontFamily: font.body,
                          fontWeight: selectedInquiryType === type.value ? 500 : 400,
                        }}
                      >
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.inquiryType && (
                  <p
                    className="text-red-500 mt-2"
                    style={{ fontSize: "0.75rem", fontFamily: font.body }}
                  >
                    {errors.inquiryType.message}
                  </p>
                )}
              </div>

              {/* Contact Form */}
              <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-stone-600 mb-2"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontFamily: font.body,
                      }}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className={
                        errors.firstName ? inputErrorClass : inputNormalClass
                      }
                      style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    />
                    {errors.firstName && (
                      <p
                        className="text-red-500 mt-1.5"
                        style={{ fontSize: "0.75rem", fontFamily: font.body }}
                      >
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-stone-600 mb-2"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontFamily: font.body,
                      }}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className={
                        errors.lastName ? inputErrorClass : inputNormalClass
                      }
                      style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    />
                    {errors.lastName && (
                      <p
                        className="text-red-500 mt-1.5"
                        style={{ fontSize: "0.75rem", fontFamily: font.body }}
                      >
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-stone-600 mb-2"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontFamily: font.body,
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={errors.email ? inputErrorClass : inputNormalClass}
                      style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    />
                    {errors.email && (
                      <p
                        className="text-red-500 mt-1.5"
                        style={{ fontSize: "0.75rem", fontFamily: font.body }}
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-stone-600 mb-2"
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontFamily: font.body,
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={errors.phone ? inputErrorClass : inputNormalClass}
                      style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    />
                    {errors.phone && (
                      <p
                        className="text-red-500 mt-1.5"
                        style={{ fontSize: "0.75rem", fontFamily: font.body }}
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label
                    className="block text-stone-600 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontFamily: font.body,
                    }}
                  >
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    {...register("company")}
                    className={inputNormalClass}
                    style={{ fontSize: "0.9rem", fontFamily: font.body }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="block text-stone-600 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontFamily: font.body,
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    className={
                      errors.subject ? inputErrorClass : inputNormalClass
                    }
                    style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && (
                    <p
                      className="text-red-500 mt-1.5"
                      style={{ fontSize: "0.75rem", fontFamily: font.body }}
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-stone-600 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontFamily: font.body,
                    }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className={`${
                      errors.message ? inputErrorClass : inputNormalClass
                    } resize-none`}
                    style={{ fontSize: "0.9rem", fontFamily: font.body }}
                    placeholder="Please provide as much detail as possible..."
                  />
                  {errors.message && (
                    <p
                      className="text-red-500 mt-1.5"
                      style={{ fontSize: "0.75rem", fontFamily: font.body }}
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label
                    className="block text-stone-600 mb-3"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontFamily: font.body,
                    }}
                  >
                    Preferred Contact Method *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="email"
                        {...register("preferredContact")}
                        className="w-4 h-4 text-[#111] border-stone-300 focus:ring-[#111]"
                      />
                      <span
                        style={{
                          fontSize: "0.88rem",
                          fontFamily: font.body,
                          color: "#444",
                        }}
                      >
                        Email
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="phone"
                        {...register("preferredContact")}
                        className="w-4 h-4 text-[#111] border-stone-300 focus:ring-[#111]"
                      />
                      <span
                        style={{
                          fontSize: "0.88rem",
                          fontFamily: font.body,
                          color: "#444",
                        }}
                      >
                        Phone
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#111] text-white px-12 py-4 hover:bg-stone-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: font.body,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                  <p
                    className="text-stone-400 mt-3"
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: font.body,
                      lineHeight: 1.5,
                    }}
                  >
                    By submitting this form, you agree to our privacy policy and consent to being contacted by our team.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2
              className="text-[#111] mb-3"
              style={{
                fontFamily: font.heading,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Visit Our Showroom
            </h2>
            <p
              className="text-stone-500"
              style={{
                fontSize: "0.9rem",
                fontFamily: font.body,
                lineHeight: 1.6,
              }}
            >
              Experience our premium materials in person
            </p>
          </div>
          <div className="bg-stone-200 aspect-[16/7] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-stone-400 mx-auto mb-3" />
              <p
                className="text-stone-500"
                style={{ fontSize: "0.85rem", fontFamily: font.body }}
              >
                Google Maps Integration
              </p>
              <p
                className="text-stone-400"
                style={{ fontSize: "0.75rem", fontFamily: font.body }}
              >
                488 Boni Avenue cor. San Joaquin Street, Mandaluyong
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
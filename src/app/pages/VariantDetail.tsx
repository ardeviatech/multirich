import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getCategoryBySlug, getSubProduct, getVariant } from "../data/products";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { formatPrice } from "../utils/currency";

export default function VariantDetail() {
  const { categorySlug, subProductId, variantId } = useParams();
  const category = getCategoryBySlug(categorySlug || "");
  const subProduct = getSubProduct(categorySlug || "", subProductId || "");
  const variant = getVariant(
    categorySlug || "",
    subProductId || "",
    variantId || ""
  );

  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  // Price per unit from variant data
  const pricePerUnit = variant?.price ?? 0;
  const totalPrice = pricePerUnit * quantity;

  if (!category || !subProduct || !variant) {
    return (
      <Navigate
        to={`/products/${categorySlug || ""}/${subProductId || ""}`}
        replace
      />
    );
  }

  const variants = subProduct.variants || [];
  const currentIdx = variants.findIndex((v) => v.id === variant.id);
  const prevVariant = currentIdx > 0 ? variants[currentIdx - 1] : null;
  const nextVariant =
    currentIdx < variants.length - 1 ? variants[currentIdx + 1] : null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: `${category.slug}-${subProduct.id}-${variant.id}`,
        productId: subProduct.id,
        productName: `${subProduct.name} - ${variant.name}`,
        variantId: variant.id,
        variantName: variant.name,
        categorySlug: category.slug,
        subProductId: subProduct.id,
        image: variant.image,
        price: pricePerUnit,
        quantity: quantity,
        finish: variant.finish,
      })
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-[#f8f6f3] min-h-screen">
      {/* HEADER */}
      <section className="bg-white border-b border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-6">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-stone-400 flex-wrap"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.03em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Link to="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <Link
              to="/products"
              className="hover:text-stone-600 transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <Link
              to={`/products/${category.slug}`}
              className="hover:text-stone-600 transition-colors"
            >
              {category.name}
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <Link
              to={`/products/${category.slug}/${subProduct.id}`}
              className="hover:text-stone-600 transition-colors"
            >
              {subProduct.name}
            </Link>
            <ChevronRight size={10} className="text-stone-300" />
            <span className="text-stone-600">{variant.name}</span>
          </nav>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square md:aspect-auto md:min-h-[560px] bg-stone-100"
            >
              <ImageWithFallback
                src={variant.image}
                alt={variant.name}
                className="w-full h-full object-cover"
              />

              {/* Prev/Next overlay arrows */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                {prevVariant ? (
                  <Link
                    to={`/products/${category.slug}/${subProduct.id}/${prevVariant.id}`}
                    className="w-10 h-10 bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={15} className="text-[#111]" />
                  </Link>
                ) : (
                  <div />
                )}
                {nextVariant ? (
                  <Link
                    to={`/products/${category.slug}/${subProduct.id}/${nextVariant.id}`}
                    className="w-10 h-10 bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ArrowRight size={15} className="text-[#111]" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="bg-white/85 backdrop-blur-sm px-3 py-1.5 text-stone-500"
                  style={{
                    fontSize: "0.62rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {currentIdx + 1} / {variants.length}
                </span>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="px-8 md:px-14 lg:px-20 py-12 md:py-16 flex flex-col justify-center"
            >
              <p
                className="text-stone-400 mb-2"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {category.name} &mdash; {subProduct.name}
              </p>
              <h1
                className="text-[#111] mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 300,
                  lineHeight: 1.12,
                }}
              >
                {variant.name}
              </h1>

              {/* Specs */}
              <div className="mb-10">
                {/* Price */}
                <div className="flex justify-between items-center py-3.5 border-b border-stone-200/50">
                  <span
                    className="text-stone-400"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Price per unit
                  </span>
                  <span
                    className="text-[#111]"
                    style={{
                      fontSize: "1.1rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {formatPrice(pricePerUnit)}
                  </span>
                </div>
                {variant.finish && (
                  <div className="flex justify-between items-center py-3.5 border-b border-stone-200/50">
                    <span
                      className="text-stone-400"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Finish
                    </span>
                    <span
                      className="text-[#111]"
                      style={{
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {variant.finish}
                    </span>
                  </div>
                )}
                {variant.color && (
                  <div className="flex justify-between items-center py-3.5 border-b border-stone-200/50">
                    <span
                      className="text-stone-400"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Color
                    </span>
                    <span
                      className="text-[#111]"
                      style={{
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {variant.color}
                    </span>
                  </div>
                )}
                {subProduct.specs?.map((spec) => (
                  <div
                    key={spec}
                    className="flex justify-between items-center py-3.5 border-b border-stone-200/50"
                  >
                    <span
                      className="text-stone-400"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {spec.split(":")[0]}
                    </span>
                    <span
                      className="text-[#111] text-right"
                      style={{
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {spec.split(":").slice(1).join(":").trim()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                {/* Quantity Selector */}
                <div className="mb-2">
                  <label
                    className="block text-stone-400 mb-2.5"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Quantity
                  </label>
                  <div className="flex items-center border border-stone-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-4 py-3 hover:bg-stone-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} className="text-[#111]" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1) {
                          setQuantity(val);
                        }
                      }}
                      className="flex-1 text-center py-3 border-x border-stone-300 bg-white text-[#111] focus:outline-none"
                      style={{
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                      }}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-stone-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} className="text-[#111]" />
                    </button>
                  </div>
                </div>

                {/* Total Price (if quantity > 1) */}
                {quantity > 1 && (
                  <div className="bg-stone-50 px-5 py-3.5 border border-stone-200">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-stone-500"
                        style={{
                          fontSize: "0.72rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        Subtotal ({quantity} units)
                      </span>
                      <span
                        className="text-[#111]"
                        style={{
                          fontSize: "1rem",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 transition-colors ${
                    addedToCart
                      ? "bg-green-700 text-white"
                      : "bg-[#111] text-white hover:bg-[#2a2a2a]"
                  }`}
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {addedToCart ? (
                    <>
                      <Check size={13} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={13} />
                      Add to Cart
                    </>
                  )}
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2.5 border border-stone-300 text-[#111] px-8 py-4 hover:bg-stone-50 transition-colors"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Inquire About This Product
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREV / NEXT VARIANT NAV */}
      <section className="bg-white border-t border-stone-200/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-stone-200/50">
            <div className="py-8 md:py-10 pr-4 md:pr-10">
              {prevVariant ? (
                <Link
                  to={`/products/${category.slug}/${subProduct.id}/${prevVariant.id}`}
                  className="group flex items-center gap-3"
                >
                  <ArrowLeft
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:-translate-x-1 duration-300"
                  />
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Previous
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {prevVariant.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  to={`/products/${category.slug}/${subProduct.id}`}
                  className="group flex items-center gap-3"
                >
                  <ArrowLeft
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:-translate-x-1 duration-300"
                  />
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Back to
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {subProduct.name}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            <div className="py-8 md:py-10 pl-4 md:pl-10 flex justify-end">
              {nextVariant ? (
                <Link
                  to={`/products/${category.slug}/${subProduct.id}/${nextVariant.id}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Next
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {nextVariant.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:translate-x-1 duration-300"
                  />
                </Link>
              ) : (
                <Link
                  to={`/products/${category.slug}/${subProduct.id}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p
                      className="text-stone-400 mb-0.5"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Back to
                    </p>
                    <p
                      className="text-stone-500 group-hover:text-[#111] transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                      }}
                    >
                      {subProduct.name}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-stone-300 group-hover:text-[#111] transition-colors group-hover:translate-x-1 duration-300"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-18">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2
                className="text-white mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.25,
                }}
              >
                Interested in {variant.name}?
              </h2>
              <p
                className="text-white/40"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}
              >
                Request physical material samples or speak with our specialists
                for expert guidance on your project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#111] px-7 py-3.5 hover:bg-stone-100 transition-colors whitespace-nowrap"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Request Samples
                <ArrowRight size={12} />
              </Link>
              <Link
                to={`/products/${category.slug}/${subProduct.id}`}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 hover:bg-white/10 transition-colors whitespace-nowrap"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                View All {subProduct.name}
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
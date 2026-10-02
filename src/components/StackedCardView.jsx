import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { ShoppingCart, Check } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-cards";
import "./StackedCardView.css";

export default function StackedCardView({
  products,
  activeProductIndex,
  setActiveProductIndex,
  addedItems,
  toggleCart,
}) {
  const containerRef = useRef(null);
  const currentProduct = products[activeProductIndex] || products[0];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="stacked-card-container" ref={containerRef}>
      <div className="swiper-card-wrapper">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          initialSlide={activeProductIndex}
          onSlideChange={(swiper) => setActiveProductIndex(swiper.activeIndex)}
          className="stacked-swiper"
        >
          {products.map((prod) => (
            <SwiperSlide key={prod.id} className="stacked-slide">
              <img src={prod.image} alt={prod.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="stacked-details">
        <h2 className="product-title">{currentProduct.title}</h2>
        <span className="product-price">{currentProduct.price}</span>

        <button
          onClick={() => toggleCart(currentProduct.id)}
          className={`add-to-cart-btn ${
            addedItems[currentProduct.id] ? "added" : ""
          }`}
        >
          {addedItems[currentProduct.id] ? (
            <>
              <Check size={16} /> Added to Cart
            </>
          ) : (
            <>
              Add to Cart <ShoppingCart size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
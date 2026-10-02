import React, { useState, useEffect } from "react";
import "./GalleryView.css";
import { PRODUCTS } from "../data/products";

export default function GalleryView() {
  const [isOpen, setIsOpen] = useState(false);

  // Trigger fan-out opening animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const totalCards = PRODUCTS.length;
  const centerIndex = (totalCards - 1) / 2; // Index 3 is the middle card for 7 items

  return (
    <div className="gallery-view-container">
      <p className="gallery-subtitle">BEST SELLERS</p>
      <h2 className="gallery-title">
        COLLECTIONS <span>GALLERY</span>
      </h2>

      {/* ARCH CARDS CONTAINER */}
      <div className={`gallery-arch-container ${isOpen ? "open" : ""}`}>
        {PRODUCTS.map((product, index) => {
          // Distance relative to center index (-3, -2, -1, 0, 1, 2, 3)
          const offset = index - centerIndex;

          // Arc Curve Math (X offset, Y offset, Rotation)
          const xOffset = offset * 140; // Horizontal spacing (px)
          const yOffset = Math.abs(offset) * 18 - (offset === 0 ? 12 : 0); // Vertical arc drop
          const rotateDeg = offset * 6; // Fan rotation degrees

          // Calculate staggered delay outwards from middle card (0ms for center, then 80ms, 160ms, etc.)
          const staggerDelay = Math.abs(offset) * 0.08;

          return (
            <div
              key={product.id}
              className="gallery-arch-card"
              style={{
                "--target-x": `${xOffset}px`,
                "--target-y": `${yOffset}px`,
                "--rotate-deg": `${rotateDeg}deg`,
                "--delay": `${staggerDelay}s`,
                zIndex: totalCards - Math.abs(offset), // Keep center card on top initially
              }}
            >
              <div className="gallery-card-frame">
                <img src={product.image} alt={product.title} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="gallery-footer-text">
        Explore our signature craft pieces with interactive views
      </p>
    </div>
  );
}
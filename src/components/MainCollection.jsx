import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import GalleryView from "./GalleryView";
import StackedCardView from "./StackedCardView";
import { PRODUCTS } from "../data/products";
import "./MainCollection.css";

export default function MainCollection() {
  const [view, setView] = useState("gallery");
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});

  const toggleCart = (id) => {
    setAddedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (index) => {
    setActiveProductIndex(index);
    setView("stacked");
  };

  return (
    <div className="main-collection-wrapper">
      {view === "stacked" && (
        <button
          className="back-navigation-btn"
          onClick={() => setView("gallery")}
        >
          <ArrowLeft size={14} /> Back
        </button>
      )}

      {view === "gallery" ? (
        <GalleryView products={PRODUCTS} onCardClick={handleCardClick} />
      ) : (
        <StackedCardView
          products={PRODUCTS}
          activeProductIndex={activeProductIndex}
          setActiveProductIndex={setActiveProductIndex}
          addedItems={addedItems}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
}
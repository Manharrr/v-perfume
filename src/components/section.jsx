

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import vid from "../assets/vid.mp4";
import a2 from "../assets/cover/a2.jpg";
import a3 from "../assets/cover/a3.jpg";
import a4 from "../assets/cover/a4.jpg";


import bannn from "../assets/cover/bannn.jpg"

const banners = [a3, a4, a2,];
const categories = [
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Exclusive", path: "/exclusive" },
];

export default function MainSection() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="px-4 md:px-6 py-10">

      {/* ================= HERO SLIDER ================= */}
      <section className="relative w-full h-[420px] md:h-[480px] mb-16 rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={banners[current]}
          alt="Luxury Perfume Banner"
          className="w-full h-full object-cover transition-transform duration-700 scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
         
        </div>
      </section>

      {/* ================= COLLECTIONS ================= */}
      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Our Collections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className="h-44 bg-gray-100 rounded-2xl flex items-center justify-center
                         text-xl font-semibold cursor-pointer
                         hover:bg-black hover:text-white
                         hover:scale-105 transition-all duration-300 shadow-md"
            >
              {item.name}
            </div>
          ))}
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="max-w-5xl mx-auto">
        <div className="relative h-[300px] md:h-[360px] rounded-3xl overflow-hidden shadow-2xl">

          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={vid} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => navigate("/product")}
              className="px-10 py-4 bg-white text-black text-lg font-semibold
                         rounded-full shadow-lg
                         hover:bg-black hover:text-white transition-all"
            >
              Shop All Fragrance →
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}





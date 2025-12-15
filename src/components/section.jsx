// import React from "react";

// const categories = [
//   "Men",
//   "Women",

//   "Exclusive",
  
//   "New Arrivals"
// ];

// function MainSection() {
//   return (
//     <main className="px-8 py-12">
//       {/* Heading */}
//       <h2 className="text-3xl font-semibold text-center mb-10">
//         Explore Our Collections
//       </h2>

//       {/* Category Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-medium hover:bg-black hover:text-white transition cursor-pointer"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// export default MainSection;
// src/components/MainSection.jsx


// import React, { useEffect, useState } from "react";

// const banners = [
//   "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
//   "https://images.unsplash.com/photo-1595425959632-34f2822322ce",
// ];

// const categories = ["Men", "Women", "Exclusive","New Arrivals"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);

//   // Auto change banner
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000); // change every 3 seconds

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-6 py-10">

//       {/* ===== Banner ===== */}
//       <div className="w-full h-[320px] mb-14 rounded-2xl overflow-hidden shadow-lg">
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />
//       </div>

//       {/* ===== Heading ===== */}
//       <h2 className="text-3xl font-semibold text-center mb-10">
//         Explore Our Collections
//       </h2>

//       {/* ===== Categories ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-40 bg-gray-100 rounded-xl flex items-center justify-center
//                        text-xl font-medium tracking-wide
//                        hover:bg-black hover:text-white
//                        transition duration-300 cursor-pointer shadow"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//     </main>
//   );
// }

// src/components/MainSection.jsx


// import React, { useEffect, useState } from "react";

// const banners = [
//   "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
//   "https://images.unsplash.com/photo-1595425959632-34f2822322ce",
// ];

// const categories = ["Men", "Women", "Exclusive"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-6 py-10">

//       {/* ===== BIG HERO BANNER ===== */}
//       <div className="w-full h-[520px] mb-16 rounded-3xl overflow-hidden shadow-xl">
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />
//       </div>

//       {/* ===== Heading ===== */}
//       <h2 className="text-3xl font-semibold text-center mb-12">
//         Explore Our Collections
//       </h2>

//       {/* ===== Categories ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-44 bg-gray-100 rounded-2xl flex items-center justify-center
//                        text-2xl font-medium
//                        hover:bg-black hover:text-white
//                        transition duration-300 cursor-pointer shadow-md"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//     </main>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const banners = [
//   "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
//   "https://images.unsplash.com/photo-1595425959632-34f2822322ce",
// ];

// const categories = ["Men", "Women", "Exclusive"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-6 py-10">

//       {/* ===== BIG HERO BANNER ===== */}
//       <div className="w-full h-[520px] mb-20 rounded-3xl overflow-hidden shadow-xl">
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />
//       </div>

//       {/* ===== Heading ===== */}
//       <h2 className="text-3xl font-semibold text-center mb-12">
//         Explore Our Collections
//       </h2>

//       {/* ===== Categories ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-44 bg-gray-100 rounded-2xl flex items-center justify-center
//                        text-2xl font-medium tracking-wide
//                        hover:bg-black hover:text-white
//                        transition duration-300 cursor-pointer shadow-md"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//       {/* ===== PERFUME VIDEO SECTION ===== */}
//       <div className="max-w-6xl mx-auto text-center mb-20">
//         <h3 className="text-2xl font-semibold mb-6">
//           Experience the Essence of Luxury
//         </h3>

//         <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
//           <video
//             src="https://cdn.coverr.co/videos/coverr-perfume-bottle-9710/1080p.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-[420px] object-cover"
//           />
//         </div>

//         {/* ===== VIEW ALL PRODUCTS BUTTON ===== */}
//         <button
//           onClick={() => navigate("/shop")}
//           className="px-10 py-4 bg-black text-white text-lg font-medium rounded-full
//                      hover:bg-gray-800 transition duration-300"
//         >
//           View All Products
//         </button>
//       </div>

//     </main>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const banners = [
//   "https://images.unsplash.com/photo-1523293182086-7651a899d37f",
//   "https://images.unsplash.com/photo-1595425959632-34f2822322ce",
// ];

// const categories = ["Men", "Women", "Exclusive"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   // Auto banner change
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-6 py-10">

//       {/* ===== BIG HERO IMAGE BANNER ===== */}
//       <div className="w-full h-[520px] mb-20 rounded-3xl overflow-hidden shadow-xl">
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />
//       </div>

//       {/* ===== HEADING ===== */}
//       <h2 className="text-3xl font-semibold text-center mb-12">
//         Explore Our Collections
//       </h2>

//       {/* ===== CATEGORIES ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-44 bg-gray-100 rounded-2xl flex items-center justify-center
//                        text-2xl font-medium tracking-wide
//                        hover:bg-black hover:text-white
//                        transition duration-300 cursor-pointer shadow-md"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

//       {/* ===== VIDEO SECTION WITH CENTER BUTTON ===== */}
//       <div className="max-w-6xl mx-auto mb-20">
//         <div className="relative rounded-3xl overflow-hidden shadow-xl">

//           {/* Video */}
//           <video
//             src="https://cdn.coverr.co/videos/coverr-perfume-bottle-9710/1080p.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-[450px] object-cover"
//           />

//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-black/30"></div>

//           {/* Center Button */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <button
//               onClick={() => navigate("/shop")}
//               className="px-12 py-4 bg-white text-black text-lg font-semibold
//                          rounded-full shadow-lg
//                          hover:bg-black hover:text-white
//                          transition duration-300"
//             >
//               Go Shopping →
//             </button>
//           </div>

//         </div>
//       </div>

//     </main>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import vid from "../assets/vid.mp4"


// import a1 from "../assets/cover/a1.jpg"
// import a2 from "../assets/cover/a2.jpg"
// import a3 from "../assets/cover/a3.jpg"
// import a4 from "../assets/cover/a4.jpg"



// const banners = [a3,a4,a2,];

// const categories = ["Men", "Women", "Exclusive"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-6 py-6">

//       {/* ===== HERO BANNER (MEDIUM HEIGHT) ===== */}
//       <div className="relative w-full h-[360px] mb-12 rounded-3xl overflow-hidden shadow-xl">

//         {/* Banner Image */}
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/30"></div>

//         {/* Banner Content */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
//           <h1 className="text-4xl md:text-5xl font-semibold mb-4">
//             {/* Discover Luxury Fragrance */}
//           </h1>
//           <p className="max-w-xl text-sm md:text-base mb-6">
//             {/* Experience premium perfumes crafted for elegance and confidence */}
//           </p>
//           {/* <button
//             onClick={() => navigate("/shop")}
//             className="px-8 py-3 bg-white text-black font-medium rounded-full
//                        hover:bg-black hover:text-white transition"
//           >
//             Shop Now → */}
//           {/* </button> */}
//         </div>
//       </div>

//       {/* ===== EXPLORE COLLECTION ===== */}
//       <h2 className="text-3xl font-semibold text-center mb-10">
//         Explore Our Collections
//       </h2>

//       {/* ===== CATEGORIES ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
//         {categories.map((item, index) => (
//           <div
//             key={index}
//             className="h-40 bg-gray-100 rounded-2xl flex items-center justify-center
//                        text-xl font-medium
//                        hover:bg-black hover:text-white
//                        transition duration-300 cursor-pointer shadow"
//           >
//             {item}
//           </div>
//         ))}
//       </div>

      
//       <div className="max-w-6xl mx-auto mb-20">
//   <div className="relative h-[360px] rounded-3xl overflow-hidden shadow-xl">

//     {/* VIDEO */}
//     <video
//       autoPlay
//       muted
//       loop
//       playsInline
//       className="absolute inset-0 w-full h-full object-cover"
//     >
//       <source src={vid} type="video/mp4" />
//     </video>

//     {/* DARK OVERLAY */}
//     <div className="absolute inset-0 bg-black/30"></div>

//     {/* CENTER BUTTON */}
//     <div className="absolute inset-0 flex items-center justify-center">
//       <button
//         onClick={() => navigate("/product")}
//         className="px-10 py-4 bg-white text-black text-lg font-semibold
//                    rounded-full shadow-lg
//                    hover:bg-black hover:text-white transition"
//       >
//         Go Shopping →
//       </button>
//     </div>

//   </div>
// </div>


//     </main>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import vid from "../assets/vid.mp4"
// import a2 from "../assets/cover/a2.jpg"
// import a3 from "../assets/cover/a3.jpg"
// import a4 from "../assets/cover/a4.jpg"

// const banners = [a3, a4, a2];
// const categories = ["Men", "Women", "Exclusive"];

// export default function MainSection() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <main className="px-4 py-8">
      
//       {/* HERO BANNER */}
//       <div className="relative w-full h-[400px] mb-12 rounded-3xl overflow-hidden">
//         <img
//           src={banners[current]}
//           alt="Luxury Perfume Banner"
//           className="w-full h-full object-cover transition-all duration-700"
//         />
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       {/* COLLECTIONS HEADER */}
//       <h2 className="text-3xl font-bold text-center mb-10">
//         Explore Collections
//       </h2>

//       {/* CATEGORIES GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(`/${category.toLowerCase()}`)}
//             className="h-40 bg-gray-100 rounded-xl flex items-center justify-center 
//                        text-xl font-medium cursor-pointer hover:bg-black hover:text-white 
//                        transition duration-300"
//           >
//             {category}
//           </div>
//         ))}
//       </div>

//       {/* VIDEO SECTION */}
//       <div className="max-w-4xl mx-auto">
//         <div className="relative h-[300px] rounded-2xl overflow-hidden">
//           <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="absolute inset-0 w-full h-full object-cover"
//           >
//             <source src={vid} type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-black/30"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <button
//               onClick={() => navigate("/product")}
//               className="px-8 py-3 bg-white text-black font-medium rounded-full 
//                          hover:bg-black hover:text-white transition"
//             >
//               Shop All Products →
//             </button>
//           </div>
//         </div>
//       </div>

//     </main>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import vid from "../assets/vid.mp4";
import a2 from "../assets/cover/a2.jpg";
import a3 from "../assets/cover/a3.jpg";
import a4 from "../assets/cover/a4.jpg";

const banners = [a3, a4, a2];
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





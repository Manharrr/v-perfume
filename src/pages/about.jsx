// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";

// function About() {
//   const navigate = useNavigate();

//   const teamMembers = [
//     {
//       name: "Alexandre Chen",
//       role: "Master Perfumer",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//       bio: "With over 25 years of experience in fragrance creation."
//     },
//     {
//       name: "Isabella Rossi",
//       role: "Creative Director",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
//       bio: "Leads our design and branding with a passion for luxury."
//     },
//     {
//       name: "Marcus Thorne",
//       role: "Quality Control Expert",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//       bio: "Ensures every bottle meets our highest standards."
//     },
//     {
//       name: "Sophie Laurent",
//       role: "Customer Experience",
//       image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
//       bio: "Dedicated to providing exceptional customer service."
//     }
//   ];

//   const values = [
//     {
//       title: "Quality First",
//       description: "We source only the finest ingredients from around the world.",
//       icon: "⭐"
//     },
//     {
//       title: "Sustainability",
//       description: "Eco-friendly packaging and ethical sourcing practices.",
//       icon: "🌿"
//     },
//     {
//       title: "Innovation",
//       description: "Constantly pushing boundaries in fragrance creation.",
//       icon: "✨"
//     },
//     {
//       title: "Customer Love",
//       description: "Your satisfaction is our ultimate priority.",
//       icon: "❤️"
//     }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-gray-900 to-black text-white">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               About V-PERFUMÉ
//             </h1>
//             <p className="text-xl text-gray-300 mb-8">
//               Crafting unforgettable scent experiences since 1995. 
//               Where luxury meets artistry in every bottle.
//             </p>
//             <button 
//               onClick={() => navigate("/product")}
//               className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300"
//             >
//               Explore Our Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Our Story */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//             <div className="space-y-4 text-gray-700">
//               <p>
//                 Founded in Paris in 1995, V-PERFUMÉ began as a small boutique perfumery 
//                 with a vision to revolutionize the fragrance industry. Our founder, 
//                 Vincent Dubois, believed that a scent should tell a story.
//               </p>
//               <p>
//                 Today, we've grown into an internationally recognized brand, but our 
//                 commitment to artisanal craftsmanship remains unchanged. Each fragrance 
//                 is still meticulously crafted by our master perfumers.
//               </p>
//               <p>
//                 We blend traditional techniques with modern innovation to create scents 
//                 that are both timeless and contemporary. Our ingredients are sourced 
//                 from the world's most exclusive regions.
//               </p>
//             </div>
//           </div>
//           <div className="rounded-2xl overflow-hidden shadow-2xl">
//             <img 
//               src="https://images.unsplash.com/photo-1587300003388-59208cc962cb" 
//               alt="Perfume Laboratory" 
//               className="w-full h-96 object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Our Values */}
//       <div className="bg-gray-50 py-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
//                 <div className="text-4xl mb-4">{value.icon}</div>
//                 <h3 className="text-xl font-bold mb-3">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Our Team */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="text-center">
//               <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
//                 <img 
//                   src={member.image} 
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="text-xl font-bold">{member.name}</h3>
//               <p className="text-gray-600 mb-2">{member.role}</p>
//               <p className="text-gray-700 text-sm">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Process Section */}
//       <div className="bg-black text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="text-5xl mb-4">1</div>
//               <h3 className="text-xl font-bold mb-3">Sourcing</h3>
//               <p className="text-gray-300">
//                 Hand-picking the finest raw materials from sustainable sources
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl mb-4">2</div>
//               <h3 className="text-xl font-bold mb-3">Creation</h3>
//               <p className="text-gray-300">
//                 Months of meticulous blending and testing by master perfumers
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="text-5xl mb-4">3</div>
//               <h3 className="text-xl font-bold mb-3">Packaging</h3>
//               <p className="text-gray-300">
//                 Elegant, sustainable packaging that protects the fragrance
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact CTA */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
//         <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 text-center shadow-lg">
//           <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             Our fragrance experts are here to help you find your perfect scent.
//           </p>
//           <button 
//             onClick={() => navigate("/product")}
//             className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300"
//           >
//             Contact Our Experts
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default About;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">About V-PERFUMÉ</h1>
        
        <div className="space-y-8 text-lg text-gray-700">
          <p>
            Welcome to V-PERFUMÉ, where every scent tells a story. Our journey began with a simple 
            passion for creating unforgettable fragrances that capture emotions, memories, and moments.
          </p>
          
          <p>
            What started as a small boutique in 2010 has grown into a beloved destination for perfume 
            enthusiasts. We believe that finding the perfect fragrance should be a personal and 
            joyful experience. That's why each of our scents is carefully crafted to resonate with 
            different personalities and occasions.
          </p>
          
          <p>
            Our team of expert perfumers travels the world to source the finest ingredients, from 
            French lavender fields to Indian sandalwood forests. We blend traditional craftsmanship 
            with modern innovation to create unique, long-lasting fragrances that you'll love wearing.
          </p>
          
          <p>
            At V-PERFUMÉ, we're not just selling perfume - we're helping you express yourself. 
            Whether you're looking for a signature scent, a special gift, or something new to try, 
            we're here to guide you on your fragrance journey.
          </p>
        </div>
        
        <div className="mt-12 p-8 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Quality ingredients from trusted sources</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Affordable luxury for everyone</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Eco-friendly packaging</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Excellent customer service</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;
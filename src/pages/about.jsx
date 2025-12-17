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
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About V-PERFUMÉ
        </h1>

        <div className="space-y-8 text-lg text-gray-700">
          <p>
            Welcome to V-PERFUMÉ, where every scent tells a story. Our journey
            began with a passion for creating unforgettable fragrances that
            capture emotions, memories, and moments.
          </p>

          <p>
            What started as a small boutique in 2025 has grown into a trusted
            destination for perfume lovers. We believe choosing a fragrance
            should be a personal and joyful experience.
          </p>

          <p>
            Our expert perfumers source the finest ingredients from around the
            world — from French lavender to Indian sandalwood — blending
            tradition with modern innovation.
          </p>

          <p>
            At V-PERFUMÉ, we don’t just sell perfume. We help you express who
            you are through scent.
          </p>
        </div>

     
        <section className="mt-12 p-8 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="space-y-3">
            {[
              "Quality ingredients from trusted sources",
              "Affordable luxury for everyone",
              "Eco-friendly packaging",
              "Excellent customer service",
            ].map((item) => (
              <li key={item} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        
        <div className="mt-12 text-center"> 
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Back to Home
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;

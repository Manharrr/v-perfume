
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-8 py-12 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">
            PERFUMÉ
          </h3>

          <p className="text-sm leading-relaxed mb-4">
            PERFUMÉ is a destination for passionate perfume lovers who believe
            fragrance is more than a scent — it is an identity. We curate
            premium, long-lasting fragrances inspired by elegance, confidence,
            and individuality. Every bottle tells a story crafted for those who
            appreciate luxury and refinement in every detail.
          </p>

          {/* Social Icons (SVG) */}
          <div className="flex gap-4 mt-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/>
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li className="hover:text-white cursor-pointer transition">Men</li>
            <li className="hover:text-white cursor-pointer transition">Women</li>
            <li className="hover:text-white cursor-pointer transition">Exclusive</li>
            <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Contact</h4>
          <p className="text-sm mb-2">Email: v-perfumes@perfume.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

      </div>

      <p className="text-center text-xs mt-10 text-gray-500">
        © 2025 PERFUMÉ. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

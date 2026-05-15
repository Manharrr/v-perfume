import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      const response = await api.post(
        "/api/users/forgot-password/",
        {
          email,
        }
      );

      alert("OTP sent successfully");

      navigate(
        "/reset-password",
        {
          state: { email }
        }
      );

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >

            {loading
              ? "Sending OTP..."
              : "Send OTP"}

          </button>

        </form>

      </div>

    </div>
  );
}
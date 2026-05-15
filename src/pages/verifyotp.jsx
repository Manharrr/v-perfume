import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function VerifyOTP() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   if (loading) return;

  //   setLoading(true);

  //   try {

  //     const response = await api.post(
  //       "/api/users/verify-otp/",
  //       formData
  //     );

  //     console.log(response.data);

  //     toast.dismiss();

  //     toast.success(
  //       response.data.message || "OTP verified"
  //     );

  //     setTimeout(() => {

  //       navigate("/login");

  //     }, 2000);

  //     return;

  //   } catch (error) {

  //     console.log(error);

  //     toast.dismiss();

  //     toast.error(
  //       error.response?.data?.error ||
  //       "OTP verification failed"
  //     );

  //   } finally {

  //     setLoading(false);

  //   }
  // };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {

    const response = await api.post(
      "/api/users/verify-otp/",
      formData
    );

    console.log(response.data);

    alert("OTP verified successfully");

    navigate("/login");

  } catch (error) {

    console.log(error);

    alert("OTP verification failed");

  } finally {

    setLoading(false);

  }
};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Verify OTP
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>

          {/* OTP */}
          <div>

            <label className="block mb-2 text-sm font-medium">
              OTP
            </label>

            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >

            {loading
              ? "Verifying..."
              : "Verify OTP"}

          </button>

        </form>

      </div>

    </div>
  );
}
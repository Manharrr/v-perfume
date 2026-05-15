import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [formData, setFormData] = useState({
        email,
        otp: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");

            return;
        }

        setLoading(true);

        try {

            await api.post(
                "/api/users/reset-password/",
                {
                    email: formData.email,
                    otp: formData.otp,
                    password: formData.password,
                }
            );

            alert("Password reset successful");

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.error ||
                "Reset password failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Reset Password
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full border rounded-lg px-4 py-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg"
                    >

                        {loading
                            ? "Resetting..."
                            : "Reset Password"}

                    </button>

                </form>

            </div>

        </div>
    );
}
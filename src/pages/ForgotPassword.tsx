import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import forgotImage from '@/images/forgot-password-image.png'

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password recovery
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0D9A83] to-[#3CCF9B] items-center justify-center relative ">
        <img
          src={forgotImage}
          alt="Illustration"
          className="w-5/6 max-w-lg rounded-[40px] object-cover shadow-md"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#F2F4E9] via-[#D9E8D5] to-[#A1D7C4] flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-[#D8E7D1] to-transparent rounded-br-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-l from-[#B7DFC8] to-transparent rounded-tl-[80px]" />

        {/* Form side */}
        <div className="relative z-10 w-full max-w-md bg-white bg-opacity-80 rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-center text-[#0B8A74] mb-8">
            Forgot Password?
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Enter your email and we'll send you instructions to reset your
            password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Enter your Recovery Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 mt-1 border-green-300 focus-visible:ring-[#0B8A74]"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#0B8A74] hover:bg-[#087060] text-white font-medium text-base rounded-full"
            >
              Recover Password
            </Button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-[#0B8A74] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

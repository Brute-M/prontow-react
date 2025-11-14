import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import loginImage from '@/images/login-image.png'


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://13.61.23.154:5000/api/auth/login/admin",
        {
          email,
          password,
        }
      );

      if (response.data?.status && response.data?.data?.otp) {
        // Store email for 2FA verification
        localStorage.setItem("loginEmail", email);
        localStorage.setItem("isNewUser", response.data.data.isNew.toString());
        
        // Navigate to 2FA page - NO ALERT HERE
        navigate("/2fa");
        
        // Remove console.log in production
        // console.log("OTP received:", response.data.data.otp);
      } else {
        alert(response.data?.message || "Login failed!");
      }

    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0D9A83] to-[#3CCF9B] items-center justify-center relative ">
        <img
          src={loginImage}
          alt="Login Image"
          className="w-5/6 max-w-lg rounded-[40px] object-cover shadow-md"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#F2F4E9] via-[#D9E8D5] to-[#A1D7C4] flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-[#D8E7D1] to-transparent rounded-br-[100px]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-l from-[#B7DFC8] to-transparent rounded-tl-[80px]" />

        <div className="relative z-10 w-full max-w-md bg-white bg-opacity-80 rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-center text-[#0B8A74] mb-8">
            Log In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 mt-1 border-green-300 focus-visible:ring-[#0B8A74]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 mt-1 border-green-300 focus-visible:ring-[#0B8A74]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onCheckedChange={(checked) =>
                    setKeepLoggedIn(checked as boolean)
                  }
                />
                <label
                  htmlFor="keep-logged-in"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Keep me logged in
                </label>
              </div>
              <Link
                to="/settings/forgot-password"
                className="text-sm text-[#0B8A74] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#0B8A74] hover:bg-[#087060] text-white font-medium text-base rounded-full"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
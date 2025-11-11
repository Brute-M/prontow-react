import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber) return;
    setStep("otp");
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://13.61.23.154:5000/api/auth/otp/verify",
        {
          phoneNumber: mobileNumber,
          otp: Number(otp),
        }
      );

      console.log("OTP verify full response:", res); // Full response object
      console.log("Response data:", res.data); // The `data` property from axios response

      // The backend response has the token at res.data.data.token
      let token = res.data?.data?.token;

      if (Array.isArray(token)) {
        token = token[0]; // use first token
      } else if (typeof token === "string" && token.includes(",")) {
        token = token.split(",")[0]; // pick first valid JWT
      }

      // ✅ Store only clean JWT
      if (res.status === 200 && token) {
        localStorage.setItem("token", token.trim());
        console.log(
          "✅ Token saved to localStorage:",
          localStorage.getItem("token")
        );

        // Verify it's stored correctly
        const savedToken = localStorage.getItem("token");
        console.log("Stored token:", savedToken);

        // Add a short delay to ensure any interceptors can pick up the new token
        setTimeout(() => {
          navigate("/dashboard");
        }, 300);
      } else {
        setErrorMsg("Invalid OTP or token missing in response");
      }
    } catch (err: any) {
      console.error("OTP Verify Error:", err.response?.data || err);
      setErrorMsg(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#F2F4E9] via-[#D9E8D5] to-[#A1D7C4]">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-[#D8E7D1] to-transparent rounded-br-[100px]" />
      <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-l from-[#B7DFC8] to-transparent rounded-tl-[80px]" />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white bg-opacity-80 rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl font-bold mb-2 text-center text-[#0B8A74]">
            2 Step Authentication
          </h2>

          {step === "mobile" ? (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <p className="text-sm text-center text-muted-foreground mb-6">
                We have sent a verification code to the mobile number whenever
                you Login in your account.
              </p>
              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="text-sm font-medium text-foreground"
                >
                  Mobile Number
                </label>
                <Input
                  id="mobile"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="h-12 border-green-300 focus-visible:ring-[#0B8A74]"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-[#0B8A74] hover:bg-[#087060] text-white font-medium text-base rounded-full"
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn’t receive the OTP SMS?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Send OTP again in 02.56 sec
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-center text-muted-foreground">
                    Enter the verification code we have sent to
                    <br />
                    +91 {mobileNumber || "9876543210"}
                  </p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[...Array(4)].map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-14 h-14 text-xl border-green-300 focus-visible:ring-[#0B8A74]"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </div>
              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#0B8A74] hover:bg-[#087060] text-white font-medium text-base rounded-full"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

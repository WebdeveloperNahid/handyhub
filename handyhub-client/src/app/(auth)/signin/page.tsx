"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TextField, Label, Input, FieldError, Button } from "@heroui/react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiTool,
  FiCheck,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import backgroundImage from "@/assets/images/login_bg.png";
import cardImage from "@/assets/images/login.png";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const trustPoints: string[] = [
  "500+ verified professionals",
  "Cleaning, electrical, printer, repair — all in one place",
  "Average 15-minute provider confirmation",
];

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setSubmitError(
          error.message || "Incorrect email or password, please try again",
        );
        return;
      }

      // window.location.href এর বদলে router.push — client-side navigation,
      // full page reload হয় না, তাই অনেক দ্রুত।
      // router.refresh() Navbar-এর session state সাথে সাথে আপডেট করে দেয়।
      router.push("/");
      router.refresh();
    } catch {
      setSubmitError("Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: better-auth google social signIn call goes here
    console.log("Google login clicked");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Full-page background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          placeholder="blur"
          className="object-cover scale-105 blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-[#1C1917]/25" />
      </div>

      {/* Centered card */}
      <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-[#FAF9F7] rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left info panel — shown from tablet upward */}
        <div className="hidden md:flex relative flex-col justify-between p-6 md:p-8 lg:p-10 overflow-hidden min-h-[480px] md:min-h-[560px] lg:min-h-[640px]">
          <Image
            src={cardImage}
            alt="HandyHub professional at work"
            fill
            sizes="(max-width: 768px) 0px, 50vw"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C24]/95 via-[#0F4C24]/50 to-[#0F4C24]/10" />

          <div className="relative z-10 flex items-center gap-2 text-white">
            <FiTool className="text-xl md:text-2xl" />
            <span className="text-lg md:text-xl font-semibold tracking-tight">
              HandyHub
            </span>
          </div>

          <div className="relative z-10 space-y-4 md:space-y-5">
            <h1 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
              Welcome back,
              <br />
              let&apos;s keep things moving.
            </h1>
            <p className="text-[#F0F0EE] text-sm">
              Log in to view your bookings, providers, and service history.
            </p>

            <ul className="space-y-2.5 md:space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <FiCheck className="text-[#F59E0B] text-xs" />
                  </span>
                  <span className="text-sm text-[#F0F0EE]">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-[#D6D3D1] pt-2">
              © {new Date().getFullYear()} HandyHub — Local service marketplace
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <div className="md:hidden flex items-center gap-2 mb-5 sm:mb-6 text-[#1C1917]">
            <FiTool className="text-2xl text-[#15803D]" />
            <span className="text-xl font-semibold">HandyHub</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1917] mb-1">
            Log in
          </h2>
          <p className="text-sm text-[#57534E] mb-5 sm:mb-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#15803D] font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

          <Button
            onPress={handleGoogleLogin}
            variant="outline"
            className="w-full font-medium mb-4 bg-white text-[#1C1917] border-[#E7E5E4] hover:bg-[#F5F5F4]"
            size="lg"
          >
            <FcGoogle className="text-xl mr-2" />
            Log in with Google
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-[#E7E5E4]" />
            <span className="text-xs text-[#78716C]">or</span>
            <div className="h-px flex-1 bg-[#E7E5E4]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <TextField
              name="email"
              type="email"
              fullWidth
              isInvalid={!!errors.email}
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            >
              <Label className="text-[#1C1917]">Email</Label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
                <Input
                  placeholder="you@example.com"
                   className="pl-10 !bg-white !text-[#1C1917] placeholder:!text-[#A8A29E] !border-[#E7E5E4] !shadow-sm"
                  fullWidth
                />
              </div>
              <FieldError>{errors.email}</FieldError>
            </TextField>

            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              isInvalid={!!errors.password}
              value={form.password}
              onChange={(v) => handleChange("password", v)}
            >
              <div className="flex items-center justify-between">
                <Label className="text-[#1C1917]">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#15803D] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
                <Input
                  placeholder="Your password"
                  className="pl-10 !bg-white !text-[#1C1917] placeholder:!text-[#A8A29E] !border-[#E7E5E4] !shadow-sm"
                  fullWidth
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <FieldError>{errors.password}</FieldError>
            </TextField>

            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              isPending={isSubmitting}
              className="w-full bg-[#15803D] text-white font-medium mt-2"
              size="lg"
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
  
}
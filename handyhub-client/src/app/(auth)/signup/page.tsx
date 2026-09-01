"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiTool, FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

type UserRole = "user" | "provider";

interface FormState {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const trustPoints: string[] = [
  "500+ verified professionals",
  "Cleaning, electrical, printer, repair — all in one place",
  "Average 15-minute provider confirmation",
];

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1676311396794-f14881e9daaa?auto=format&fit=crop&w=1920&q=80";
const CARD_IMAGE_URL =
  "https://images.unsplash.com/photo-1608109704808-62aadbc33a7d?auto=format&fit=crop&w=800&q=80";

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleChange = (field: "name" | "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Must be at least 8 characters";
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
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      if (error) {
        setSubmitError(error.message || "Could not create account, please try again");
        return;
      }

      window.location.href = "/";
    } catch {
      setSubmitError("Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: better-auth google social signIn call goes here
    console.log("Google signup clicked");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Full-page background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={BACKGROUND_IMAGE_URL}
          alt=""
          fill
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
            src={CARD_IMAGE_URL}
            alt="HandyHub professional at work"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C24]/95 via-[#0F4C24]/50 to-[#0F4C24]/10" />

          <div className="relative z-10 flex items-center gap-2 text-white">
            <FiTool className="text-xl md:text-2xl" />
            <span className="text-lg md:text-xl font-semibold tracking-tight">HandyHub</span>
          </div>

          <div className="relative z-10 space-y-4 md:space-y-5">
            <h1 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
              Home tasks made
              <br />
              easy, with trust.
            </h1>
            <p className="text-[#F0F0EE] text-sm">
              Cleaning, electrician, mechanic, printer service — find verified
              local professionals in minutes.
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
            Create your account
          </h2>
          <p className="text-sm text-[#57534E] mb-5 sm:mb-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#15803D] font-medium hover:underline">
              Log in
            </Link>
          </p>

          <Button
            onPress={handleGoogleSignup}
            variant="outline"
            className="w-full font-medium mb-4 bg-white text-[#1C1917] border-[#E7E5E4] hover:bg-[#F5F5F4]"
            size="lg"
          >
            <FcGoogle className="text-xl mr-2" />
            Sign up with Google
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-[#E7E5E4]" />
            <span className="text-xs text-[#78716C]">or</span>
            <div className="h-px flex-1 bg-[#E7E5E4]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <TextField
              name="name"
              fullWidth
              isInvalid={!!errors.name}
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            >
              <Label>Name</Label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
                <Input
                  placeholder="Your full name"
                  className="pl-10 bg-white text-[#1C1917] placeholder:text-[#A8A29E] border-[#E7E5E4]"
                  fullWidth
                />
              </div>
              <FieldError>{errors.name}</FieldError>
            </TextField>

            <TextField
              name="email"
              type="email"
              fullWidth
              isInvalid={!!errors.email}
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            >
              <Label>Email</Label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
                <Input
                  placeholder="you@example.com"
                  className="pl-10 bg-white text-[#1C1917] placeholder:text-[#A8A29E] border-[#E7E5E4]"
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
              <Label>Password</Label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
                <Input
                  placeholder="At least 8 characters"
                  className="pl-10 pr-10 bg-white text-[#1C1917] placeholder:text-[#A8A29E] border-[#E7E5E4]"
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

            {/* Role selection — User / Provider */}
            <div>
              <Label>I want to join as</Label>
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <label
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                    form.role === "user"
                      ? "border-[#15803D] bg-[#15803D]/5 text-[#15803D]"
                      : "border-[#E7E5E4] bg-white text-[#57534E]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === "user"}
                    onChange={() => setForm((prev) => ({ ...prev, role: "user" }))}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">User</span>
                </label>

                <label
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                    form.role === "provider"
                      ? "border-[#15803D] bg-[#15803D]/5 text-[#15803D]"
                      : "border-[#E7E5E4] bg-white text-[#57534E]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={form.role === "provider"}
                    onChange={() => setForm((prev) => ({ ...prev, role: "provider" }))}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Provider</span>
                </label>
              </div>
            </div>

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
              Create account
            </Button>
          </form>

          <p className="text-xs text-[#78716C] text-center pt-4">
            By creating an account you agree to HandyHub&apos;s{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
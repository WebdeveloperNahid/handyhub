"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import backgroundImage from "@/assets/images/login_bg.png";
import cardImage from "@/assets/images/login.png";

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

export default function SignupPage() {
  const router = useRouter();

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

  const handleGoogleSignup = () => {
    // TODO: better-auth google social signIn call goes here
    console.log("Google signup clicked");
  };

  // return (
  //   <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-6 lg:p-8">
  //     {/* Full-page background image */}
  //     <div className="fixed inset-0 -z-10">
  //       <Image
  //         src={backgroundImage}
  //         alt=""
  //         fill
  //         sizes="100vw"
  //         quality={60}
  //         placeholder="blur"
  //         className="object-cover scale-105 blur-[2px]"
  //         priority
  //       />
  //       <div className="absolute inset-0 bg-[#1C1917]/25" />
  //     </div>

  //     {/* Centered card */}
  //     <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-[#FAF9F7] rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2">
  //       {/* Left info panel — shown from tablet upward */}
  //       <div className="hidden md:flex relative flex-col justify-between p-6 md:p-8 lg:p-10 overflow-hidden min-h-[480px] md:min-h-[560px] lg:min-h-[640px]">
  //         <Image
  //           src={cardImage}
  //           alt="HandyHub professional at work"
  //           fill
  //           sizes="(max-width: 768px) 0px, 50vw"
  //           quality={70}
  //           placeholder="blur"
  //           className="object-cover"
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C24]/95 via-[#0F4C24]/50 to-[#0F4C24]/10" />

  //         <div className="relative z-10 flex items-center gap-2 text-white">
  //           <FiTool className="text-xl md:text-2xl" />
  //           <span className="text-lg md:text-xl font-semibold tracking-tight">HandyHub</span>
  //         </div>

  //         <div className="relative z-10 space-y-4 md:space-y-5">
  //           <h1 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
  //             Home tasks made
  //             <br />
  //             easy, with trust.
  //           </h1>
  //           <p className="text-[#F0F0EE] text-sm">
  //             Cleaning, electrician, mechanic, printer service — find verified
  //             local professionals in minutes.
  //           </p>

  //           <ul className="space-y-2.5 md:space-y-3">
  //             {trustPoints.map((point) => (
  //               <li key={point} className="flex items-start gap-3">
  //                 <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
  //                   <FiCheck className="text-[#F59E0B] text-xs" />
  //                 </span>
  //                 <span className="text-sm text-[#F0F0EE]">{point}</span>
  //               </li>
  //             ))}
  //           </ul>

  //           <p className="text-xs text-[#D6D3D1] pt-2">
  //             © {new Date().getFullYear()} HandyHub — Local service marketplace
  //           </p>
  //         </div>
  //       </div>

  //       {/* Right form panel */}
  //       <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
  //         <div className="md:hidden flex items-center gap-2 mb-5 sm:mb-6 text-[#1C1917]">
  //           <FiTool className="text-2xl text-[#15803D]" />
  //           <span className="text-xl font-semibold">HandyHub</span>
  //         </div>

  //         <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1917] mb-1">
  //           Create your account
  //         </h2>
  //         <p className="text-sm text-[#57534E] mb-5 sm:mb-6">
  //           Already have an account?{" "}
  //           <Link href="/signin" className="text-[#15803D] font-medium hover:underline">
  //             Log in
  //           </Link>
  //         </p>

  //         <Button
  //           onPress={handleGoogleSignup}
  //           variant="outline"
  //           className="w-full font-medium mb-4 bg-white text-[#1C1917] border-[#E7E5E4] hover:bg-[#F5F5F4]"
  //           size="lg"
  //         >
  //           <FcGoogle className="text-xl mr-2" />
  //           Sign up with Google
  //         </Button>

  //         <div className="flex items-center gap-3 mb-4">
  //           <div className="h-px flex-1 bg-[#E7E5E4]" />
  //           <span className="text-xs text-[#78716C]">or</span>
  //           <div className="h-px flex-1 bg-[#E7E5E4]" />
  //         </div>

  //         <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
  //           <TextField
  //             name="name"
  //             fullWidth
  //             isInvalid={!!errors.name}
  //             value={form.name}
  //             onChange={(v) => handleChange("name", v)}
  //           >
  //             <Label className="text-[#1C1917]">Name</Label>
  //             <div className="relative">
  //               <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
  //               <Input
  //                 placeholder="Your full name"
  //                 className="pl-10 !bg-white !text-[#1C1917] placeholder:!text-[#A8A29E] !border-[#E7E5E4] !shadow-sm"
  //                 fullWidth
  //               />
  //             </div>
  //             <FieldError>{errors.name}</FieldError>
  //           </TextField>

  //           <TextField
  //             name="email"
  //             type="email"
  //             fullWidth
  //             isInvalid={!!errors.email}
  //             value={form.email}
  //             onChange={(v) => handleChange("email", v)}
  //           >
  //             <Label className="text-[#1C1917]">Email</Label>
  //             <div className="relative">
  //               <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
  //               <Input
  //                 placeholder="you@example.com"
  //                 className="pl-10 !bg-white !text-[#1C1917] placeholder:!text-[#A8A29E] !border-[#E7E5E4] !shadow-sm"
  //                 fullWidth
  //               />
  //             </div>
  //             <FieldError>{errors.email}</FieldError>
  //           </TextField>

  //           <TextField
  //             name="password"
  //             type={showPassword ? "text" : "password"}
  //             fullWidth
  //             isInvalid={!!errors.password}
  //             value={form.password}
  //             onChange={(v) => handleChange("password", v)}
  //           >
  //             <Label className="text-[#1C1917]">Password</Label>
  //             <div className="relative">
  //               <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10" />
  //               <Input
  //                 placeholder="At least 8 characters"
  //                 className="pl-10 !bg-white !text-[#1C1917] placeholder:!text-[#A8A29E] !border-[#E7E5E4] !shadow-sm"
  //                 fullWidth
  //               />
  //               <button
  //                 type="button"
  //                 onClick={() => setShowPassword((s) => !s)}
  //                 className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] z-10"
  //                 tabIndex={-1}
  //               >
  //                 {showPassword ? <FiEyeOff /> : <FiEye />}
  //               </button>
  //             </div>
  //             <FieldError>{errors.password}</FieldError>
  //           </TextField>

  //           {/* Role selection — User / Provider */}
  //           <div>
  //             <Label className="text-[#1C1917]">I want to join as</Label>
  //             <div className="grid grid-cols-2 gap-3 mt-1.5">
  //               <label
  //                 className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
  //                   form.role === "user"
  //                     ? "border-[#15803D] bg-[#15803D]/5 text-[#15803D]"
  //                     : "border-[#E7E5E4] bg-white text-[#57534E]"
  //                 }`}
  //               >
  //                 <input
  //                   type="radio"
  //                   name="role"
  //                   value="user"
  //                   checked={form.role === "user"}
  //                   onChange={() => setForm((prev) => ({ ...prev, role: "user" }))}
  //                   className="sr-only"
  //                 />
  //                 <span className="text-sm font-medium">User</span>
  //               </label>

  //               <label
  //                 className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
  //                   form.role === "provider"
  //                     ? "border-[#15803D] bg-[#15803D]/5 text-[#15803D]"
  //                     : "border-[#E7E5E4] bg-white text-[#57534E]"
  //                 }`}
  //               >
  //                 <input
  //                   type="radio"
  //                   name="role"
  //                   value="provider"
  //                   checked={form.role === "provider"}
  //                   onChange={() => setForm((prev) => ({ ...prev, role: "provider" }))}
  //                   className="sr-only"
  //                 />
  //                 <span className="text-sm font-medium">Provider</span>
  //               </label>
  //             </div>
  //           </div>

  //           {submitError && (
  //             <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
  //               {submitError}
  //             </p>
  //           )}

  //           <Button
  //             type="submit"
  //             variant="primary"
  //             isPending={isSubmitting}
  //             className="w-full bg-[#15803D] text-white font-medium mt-2"
  //             size="lg"
  //           >
  //             Create account
  //           </Button>
  //         </form>

  //         <p className="text-xs text-[#78716C] text-center pt-4">
  //           By creating an account you agree to HandyHub&apos;s{" "}
  //           <Link href="/terms" className="underline">Terms</Link> and{" "}
  //           <Link href="/privacy" className="underline">Privacy Policy</Link>.
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#E1D4C2] p-3 sm:p-6 lg:p-8">
      {/* Full-page background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          placeholder="blur"
          className="scale-105 object-cover blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-[#291C0E]/30" />
      </div>

      {/* Signup Card */}
      <div className="grid w-full max-w-4xl max-h-[95vh] grid-cols-1 overflow-y-auto rounded-2xl border border-[#6E473B]/20 bg-[#E1D4C2] shadow-2xl sm:rounded-3xl md:grid-cols-2">

        {/* Left Image Panel */}
        <div className="relative hidden min-h-[480px] flex-col justify-between overflow-hidden p-6 md:flex md:min-h-[560px] md:p-8 lg:min-h-[640px] lg:p-10">
          <Image
            src={cardImage}
            alt="HandyHub professional at work"
            fill
            sizes="(max-width: 768px) 0px, 50vw"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />

          {/* Brown Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#291C0E]/95 via-[#6E473B]/65 to-[#291C0E]/15" />

          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-2.5 rounded-2xl border border-[#E1D4C2]/20 bg-[#291C0E]/55 px-4 py-2.5 shadow-lg backdrop-blur-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A78D78]">
              <FiTool className="text-lg text-[#291C0E]" />
            </span>

            <span className="text-lg font-bold tracking-tight text-[#E1D4C2] md:text-xl">
              Handy
              <span className="text-[#A78D78]">Hub</span>
            </span>
          </Link>

          {/* Content */}
          <div className="relative z-10 space-y-4 md:space-y-5">
            <h1 className="text-2xl font-semibold leading-tight text-[#E1D4C2] md:text-3xl">
              Home tasks made
              <br />
              easy, with trust.
            </h1>

            <p className="text-sm text-[#BEB5A9]">
              Cleaning, electrician, mechanic, printer service — find verified
              local professionals in minutes.
            </p>

            <ul className="space-y-2.5 md:space-y-3">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A78D78]/30">
                    <FiCheck className="text-xs text-[#E1D4C2]" />
                  </span>

                  <span className="text-sm text-[#BEB5A9]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <p className="pt-2 text-xs text-[#BEB5A9]/80">
              © {new Date().getFullYear()} HandyHub — Local service marketplace
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center bg-[#E1D4C2] p-5 sm:p-8 lg:p-10">

          {/* Mobile Logo */}
          <div className="mb-5 flex items-center gap-2 text-[#291C0E] sm:mb-6 md:hidden">
            <FiTool className="text-2xl text-[#6E473B]" />

            <span className="text-xl font-semibold">
              Handy
              <span className="text-[#6E473B]">Hub</span>
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-1 text-xl font-semibold text-[#291C0E] sm:text-2xl">
            Create your account
          </h2>

          <p className="mb-5 text-sm text-[#6E473B] sm:mb-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#6E473B] hover:text-[#291C0E] hover:underline"
            >
              Log in
            </Link>
          </p>

          {/* Google Signup */}
          <Button
            onPress={handleGoogleSignup}
            variant="outline"
            className="mb-4 w-full border-[#6E473B]/25 bg-[#BEB5A9]/30 font-medium text-[#291C0E] hover:bg-[#BEB5A9]/50"
            size="lg"
          >
            <FcGoogle className="mr-2 text-xl" />
            Sign up with Google
          </Button>

          {/* Divider */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#6E473B]/25" />

            <span className="text-xs text-[#6E473B]">
              or
            </span>

            <div className="h-px flex-1 bg-[#6E473B]/25" />
          </div>

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3.5 sm:space-y-4"
          >
            {/* Name */}
            <TextField
              name="name"
              fullWidth
              isInvalid={!!errors.name}
              value={form.name}
              onChange={(v) => handleChange("name", v)}
            >
              <Label className="text-[#291C0E]">
                Name
              </Label>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#6E473B]" />

                <Input
                  placeholder="Your full name"
                  className="!border-[#6E473B]/25 !bg-[#BEB5A9]/25 pl-10 !text-[#291C0E] !shadow-sm placeholder:!text-[#6E473B]/60"
                  fullWidth
                />
              </div>

              <FieldError>
                {errors.name}
              </FieldError>
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              fullWidth
              isInvalid={!!errors.email}
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            >
              <Label className="text-[#291C0E]">
                Email
              </Label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#6E473B]" />

                <Input
                  placeholder="you@example.com"
                  className="!border-[#6E473B]/25 !bg-[#BEB5A9]/25 pl-10 !text-[#291C0E] !shadow-sm placeholder:!text-[#6E473B]/60"
                  fullWidth
                />
              </div>

              <FieldError>
                {errors.email}
              </FieldError>
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              isInvalid={!!errors.password}
              value={form.password}
              onChange={(v) => handleChange("password", v)}
            >
              <Label className="text-[#291C0E]">
                Password
              </Label>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#6E473B]" />

                <Input
                  placeholder="At least 8 characters"
                  className="!border-[#6E473B]/25 !bg-[#BEB5A9]/25 pl-10 !pr-11 !text-[#291C0E] !shadow-sm placeholder:!text-[#6E473B]/60"
                  fullWidth
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[#6E473B] transition-colors hover:text-[#291C0E]"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <FieldError>
                {errors.password}
              </FieldError>
            </TextField>

            {/* Role Selection */}
            <div>
              <Label className="text-[#291C0E]">
                I want to join as
              </Label>

              <div className="mt-1.5 grid grid-cols-2 gap-3">
                {/* User */}
                <label
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 transition-all ${form.role === "user"
                      ? "border-[#6E473B] bg-[#6E473B]/10 text-[#6E473B] shadow-sm"
                      : "border-[#6E473B]/25 bg-[#BEB5A9]/20 text-[#6E473B] hover:bg-[#BEB5A9]/40"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === "user"}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        role: "user",
                      }))
                    }
                    className="sr-only"
                  />

                  <FiUser className="text-sm" />

                  <span className="text-sm font-medium">
                    User
                  </span>
                </label>

                {/* Provider */}
                <label
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 transition-all ${form.role === "provider"
                      ? "border-[#6E473B] bg-[#6E473B]/10 text-[#6E473B] shadow-sm"
                      : "border-[#6E473B]/25 bg-[#BEB5A9]/20 text-[#6E473B] hover:bg-[#BEB5A9]/40"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={form.role === "provider"}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        role: "provider",
                      }))
                    }
                    className="sr-only"
                  />

                  <FiTool className="text-sm" />

                  <span className="text-sm font-medium">
                    Provider
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <p className="rounded-lg border border-[#6E473B]/20 bg-[#BEB5A9]/30 px-3 py-2 text-sm text-[#291C0E]">
                {submitError}
              </p>
            )}

            {/* Create Account Button */}
            <Button
              type="submit"
              variant="primary"
              isPending={isSubmitting}
              className="mt-2 w-full bg-[#6E473B] font-medium text-[#E1D4C2] hover:bg-[#291C0E]"
              size="lg"
            >
              Create account
            </Button>
          </form>

          {/* Terms */}
          <p className="pt-4 text-center text-xs text-[#6E473B]">
            By creating an account you agree to HandyHub&apos;s{" "}
            <Link
              href="/terms"
              className="underline hover:text-[#291C0E]"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-[#291C0E]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { UserIcon } from '@/components/ui/Icons';
import type { LoginFormData, LoginFormErrors } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo: check for hardcoded credentials
      if (formData.username === 'admin' && formData.password === 'password123') {
        // Successful login - redirect to dashboard
        router.push('/dashboard');
      } else {
        // Show error
        setErrors({ password: 'Incorrect Password' });
      }
    } catch {
      setErrors({ password: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[548px]">
          {/* Login Form Container */}
          <div className="p-6">
            {/* Greeting */}
            <div className="mb-8">
              <p className="font-urbanist text-[16px] text-[var(--brand)] mb-1">
                السَّلَامُ عَلَيْكُمْ
              </p>
              <h1 className="font-urbanist font-semibold text-[36px] text-[var(--grey-800)]">
                Welcome Back 👋
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username Field */}
              <Input
                label="Username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange('username')}
                error={errors.username}
                icon={<UserIcon className="text-[var(--neutral-500)]" size={20} />}
                autoComplete="username"
              />

              {/* Password Field */}
              <Input
                label="Password"
                placeholder="*********"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={errors.password}
                showPasswordToggle
                autoComplete="current-password"
              />

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                className="mt-4"
              >
                Log In
              </Button>

              {/* Forgot Password Link */}
              <button
                type="button"
                className="font-urbanist font-medium text-[20px] text-[var(--grey-800)] text-center hover:underline"
                onClick={() => {
                  // TODO: Implement forgot password
                  console.log('Forgot password clicked');
                }}
              >
                Forget Password?
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-[136px] py-[42px] flex justify-between items-center">
        <span className="font-dm-sans font-medium text-[12px] text-[var(--neutral-600)]">
          © 2025 ALL RIGHTS RESERVED
        </span>
        <span className="font-dm-sans font-medium text-[12px] text-[var(--neutral-600)]">
          Terms Of Use. Privacy Policy
        </span>
      </footer>
    </div>
  );
}

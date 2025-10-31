"use client";

import { Suspense } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Link href="/landing" className="flex items-center space-x-2 group">
            <img 
              src="/images/oncare-logo2.png" 
              alt="onCare Logo" 
              className="h-40 w-auto transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/oncare-logo2.png";
                e.target.className = "h-40 w-40 opacity-50 transition-transform duration-300 group-hover:scale-105";
              }}
            />
          </Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import VerificationForm from '../../components/verification/VerificationForm';
import Layout from '../../components/layout/Layout';

export default function VerificationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role === 'user') {
      router.push('/profile');
      return;
    }

    fetchVerificationStatus();
  }, [user]);

  const fetchVerificationStatus = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${API_URL}/api/verification/status`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setVerificationStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch verification status:', error);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${API_URL}/api/verification/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/profile?verification=submitted');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit verification');
      }
    } catch (error) {
      console.error('Verification submission failed:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  if (verificationStatus?.has_request) {
    return (
      <Layout>
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-[#1A2333] border border-[#2A3343] rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Verification Status</h2>
          <p className="text-[#B8C1CF] mb-4">
            Your verification request is currently <strong>{verificationStatus.request.status}</strong>
          </p>
          <button
            onClick={() => router.push('/profile')}
            className="bg-[#3A86FF] text-white px-6 py-2 rounded-lg hover:bg-[#2A76EF] transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <VerificationForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
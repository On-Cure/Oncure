'use client';

import { useState } from 'react';
import { Shield, Upload, FileText, CheckCircle } from 'lucide-react';

export default function VerificationForm({ onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    requested_role: 'coach',
    documents: [],
    notes: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = async (files) => {
    try {
      const { upload } = await import('../../lib/api');
      const uploadPromises = Array.from(files).map(file => upload.uploadFile(file));
      
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.url);
      
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...urls]
      }));
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-bold text-text-primary font-display">Verification Request</h2>
        <p className="text-text-secondary">
          Complete your verification to become a certified coach or mentor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-text-primary font-medium mb-2">
            Verification Type
          </label>
          <select
            value={formData.requested_role}
            onChange={(e) => setFormData(prev => ({...prev, requested_role: e.target.value}))}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:border-primary focus:outline-none"
          >
            <option value="coach">Health Coach</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">
            Supporting Documents
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
            <Upload className="mx-auto h-8 w-8 text-text-secondary mb-2" />
            <p className="text-text-secondary mb-2">Upload certificates, licenses, or credentials</p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-hover transition-colors"
            >
              Choose Files
            </label>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-text-secondary">
                  <FileText size={16} />
                  <span className="text-sm">{file.name}</span>
                  <CheckCircle size={16} className="text-success" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-text-primary font-medium mb-2">
            Additional Information
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-disabled focus:border-primary focus:outline-none resize-vertical"
            placeholder="Tell us about your experience, qualifications, and why you want to become a verified coach/mentor..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || formData.documents.length === 0}
          className="w-full bg-primary-gradient text-white py-3 rounded-lg font-medium hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-normal"
        >
          {loading ? 'Submitting...' : 'Submit Verification Request'}
        </button>
      </form>
    </div>
  );
}
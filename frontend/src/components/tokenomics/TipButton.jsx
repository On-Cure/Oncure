"use client";

import { useState } from "react";
import { HeartPulse, Loader2 } from "lucide-react";
import { tokenomics } from "../../lib/tokenomics";

export default function TipButton({ postId, recipientId, recipientName, onTipSent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTip = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    try {
      const transaction = await tokenomics.sendTip(
        recipientId,
        parseFloat(amount),
        message
      );
      
      if (onTipSent) {
        onTipSent(transaction);
      }
      
      setIsOpen(false);
      setAmount("");
      setMessage("");
    } catch (error) {
      console.error("Error sending tip:", error);
      alert("Failed to send tip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 p-2.5 rounded-xl transition-all duration-normal text-text-secondary hover:text-warning hover:bg-warning/5 hover:scale-105"
        title="Send thanks"
      >
        <HeartPulse size={22} strokeWidth={2} className="transition-transform hover:scale-110" />
        <span className="text-sm font-medium">Thanks</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="rounded-xl p-6 w-full max-w-md" style={{backgroundColor: 'rgb(var(--color-surface))', border: '1px solid rgba(var(--color-border), 0.3)'}}>
            <h3 className="text-lg font-semibold mb-4" style={{color: 'rgb(var(--color-text-primary))'}}>
              Send Thanks to {recipientName}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'rgb(var(--color-text-secondary))'}}>
                  Amount (KSH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(var(--color-background), 0.8)',
                    border: '1px solid rgba(var(--color-border), 0.3)',
                    color: 'rgb(var(--color-text-primary))'
                  }}
                />
                {amount && (
                  <p className="text-xs mt-1" style={{color: 'rgb(var(--color-text-secondary))'}}>
                    ≈ {(parseFloat(amount) / 50).toFixed(4)} HBAR
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'rgb(var(--color-text-secondary))'}}>
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Thank you for your support..."
                  rows="3"
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: 'rgba(var(--color-background), 0.8)',
                    border: '1px solid rgba(var(--color-border), 0.3)',
                    color: 'rgb(var(--color-text-primary))'
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-normal"
                style={{color: 'rgb(var(--color-text-secondary))'}}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleTip}
                disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                className="flex-1 px-4 py-2 font-medium rounded-lg transition-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgb(var(--color-primary))',
                  color: 'rgb(var(--color-background))'
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Thanks"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Coins, Loader2 } from "lucide-react";
import { tokenomics } from "../../lib/tokenomics";

export default function BalanceDisplay() {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
    // Update balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBalance = async () => {
    try {
      const balanceData = await tokenomics.getBalance();
      setBalance(balanceData);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-text-secondary">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-text-primary">
      <Coins size={16} className="text-warning" />
      <span className="text-sm font-medium">
        {balance ? `${balance.ksh.toLocaleString()} KSH` : "0 KSH"}
      </span>
    </div>
  );
}
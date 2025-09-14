"use client";

import { useState, useEffect } from "react";
import { Coins, ArrowUpCircle, ArrowDownCircle, Clock, CheckCircle, Loader2 } from "lucide-react";
import { tokenomics } from "../../lib/tokenomics";
import Layout from  '../../components/layout/Layout';

export default function AccountPage() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const [balanceData, transactionData] = await Promise.all([
        tokenomics.getBalance(),
        tokenomics.getTransactions(1, 10)
      ]);
      setBalance(balanceData);
      setTransactions(transactionData.transactions);
    } catch (error) {
      console.error("Error fetching account data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;

    setIsProcessing(true);
    try {
      await tokenomics.deposit(parseFloat(depositAmount));
      setShowDeposit(false);
      setDepositAmount("");
      await fetchAccountData();
    } catch (error) {
      console.error("Error depositing:", error);
      alert("Failed to deposit. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    if (balance && parseFloat(withdrawAmount) > balance.hbar) {
      alert("Insufficient balance");
      return;
    }

    setIsProcessing(true);
    try {
      await tokenomics.withdraw(parseFloat(withdrawAmount));
      setShowWithdraw(false);
      setWithdrawAmount("");
      await fetchAccountData();
    } catch (error) {
      console.error("Error withdrawing:", error);
      alert("Failed to withdraw. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'tip_sent':
      case 'withdrawal':
        return <ArrowUpCircle className="text-error" size={20} />;
      case 'tip_received':
      case 'deposit':
      case 'reward':
        return <ArrowDownCircle className="text-success" size={20} />;
      default:
        return <Coins className="text-warning" size={20} />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'tip_sent':
      case 'withdrawal':
        return 'text-error';
      case 'tip_received':
      case 'deposit':
      case 'reward':
        return 'text-success';
      default:
        return 'text-text-primary';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Account</h1>

        {/* Balance Card */}
        <div className="glassmorphism p-6 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Balance</h2>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    
                    {balance ? `${balance.ksh.toLocaleString()} KSH` : "0 KSH"}
                  </p>
                  <p className="text-text-secondary">
                    ≈ {balance ? `${balance.hbar.toFixed(2)} HBAR` : "0.00 HBAR"}
                  </p>
                </div>
              </div>
            </div>
            <Coins size={48} className="text-warning" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDeposit(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-normal"
              style={{
                backgroundColor: 'rgb(var(--color-success))',
                color: 'rgb(var(--color-background))'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(var(--color-success-dark))'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(var(--color-success))'}
            >
              <ArrowDownCircle size={20} />
              Deposit
            </button>
            <button
              onClick={() => setShowWithdraw(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg transition-normal"
              style={{
                backgroundColor: 'rgb(var(--color-error))',
                color: 'rgb(var(--color-background))'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(var(--color-error-dark))'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(var(--color-error))'}
            >
              <ArrowUpCircle size={20} />
              Withdraw
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="glassmorphism p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Recent Transactions</h2>
          
          {transactions.length === 0 ? (
            <p className="text-text-secondary text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <p className="font-medium text-text-primary capitalize">
                        {tx.description}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {new Date(tx.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(tx.type)}`}>
                      {tx.type.includes('sent') || tx.type === 'withdrawal' ? '-' : '+'}
                      {tx.ksh_amount?.toLocaleString()} KSH
                    </p>
                    <p className="text-sm text-text-secondary">
                      ≈ {tx.amount} HBAR
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deposit Modal */}
        {showDeposit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-xl p-6 w-full max-w-md border border-border/30">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Deposit HBAR</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Amount (HBAR)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    className="w-full p-3 bg-background/80 border border-border/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {depositAmount && (
                    <p className="text-xs text-text-secondary mt-1">
                      ≈ {(parseFloat(depositAmount) * 50).toFixed(2)} KSH
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeposit(false)}
                  className="flex-1 px-4 py-2 text-text-secondary hover:text-primary rounded-lg transition-normal"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isProcessing}
                  className="flex-1 px-4 py-2 font-medium rounded-lg transition-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'rgb(var(--color-success))',
                    color: 'rgb(var(--color-background))'
                  }}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgb(var(--color-success-dark))')}
                  onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgb(var(--color-success))')}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Deposit"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-xl p-6 w-full max-w-md border border-border/30">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Withdraw HBAR</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Amount (HBAR)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    max={balance?.hbar || 0}
                    className="w-full p-3 bg-background/80 border border-border/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {withdrawAmount && (
                    <p className="text-xs text-text-secondary mt-1">
                      ≈ {(parseFloat(withdrawAmount) * 50).toFixed(2)} KSH
                    </p>
                  )}
                  <p className="text-xs text-text-secondary mt-1">
                    Available: {balance?.hbar.toFixed(2)} HBAR
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 px-4 py-2 text-text-secondary hover:text-primary rounded-lg transition-normal"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || isProcessing}
                  className="flex-1 px-4 py-2 font-medium rounded-lg transition-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'rgb(var(--color-error))',
                    color: 'rgb(var(--color-background))'
                  }}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgb(var(--color-error-dark))')}
                  onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = 'rgb(var(--color-error))')}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Withdraw"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}
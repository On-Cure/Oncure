// Mock Tokenomics API for Hedera integration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  
  const fetchOptions = {
    ...options,
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, fetchOptions)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    console.error('Tokenomics API Error:', error)
    throw error
  }
}

// Mock exchange rate (1 HBAR = 50 KSH for demo)
const HBAR_TO_KSH_RATE = 50

// Tokenomics API
export const tokenomics = {
  // Get user's token balance
  getBalance: async () => {
    try {
      const response = await fetchAPI('/api/transfer/balance')
      const hbarBalance = response.balance || 0
      return {
        hbar: hbarBalance,
        ksh: hbarBalance * HBAR_TO_KSH_RATE
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error)
      return {
        hbar: 0,
        ksh: 0
      }
    }
  },

  // Send tip to another user
  sendTip: async (recipientId, amount, message = '') => {
    try {
      const response = await fetchAPI('/api/transfer/hbar', {
        method: 'POST',
        body: JSON.stringify({
          to_user_id: recipientId,
          amount: amount
        })
      })
      
      return {
        id: `tip_${Date.now()}`,
        type: 'tip_sent',
        amount: amount,
        recipient_id: recipientId,
        message: message,
        timestamp: new Date().toISOString(),
        status: 'completed',
        ...response
      }
    } catch (error) {
      console.error('Failed to send tip:', error)
      throw error
    }
  },

  // Get transaction history
  getTransactions: async (page = 1, limit = 20) => {
    try {
      const response = await fetchAPI('/api/transfer/history')
      const transfers = response.transfers || []
      
      const transactions = transfers.map(transfer => ({
        id: transfer.id,
        type: transfer.from_user_id ? 'tip_sent' : 'tip_received',
        amount: transfer.amount,
        ksh_amount: transfer.amount * HBAR_TO_KSH_RATE,
        timestamp: transfer.created_at,
        status: transfer.status,
        transaction_hash: transfer.transaction_id || 'N/A',
        description: transfer.from_user_id ? 'HBAR sent to user' : 'HBAR received from user'
      }))
      
      return {
        transactions,
        page,
        limit,
        total: transactions.length,
        hasMore: false
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
      return {
        transactions: [],
        page,
        limit,
        total: 0,
        hasMore: false
      }
    }
  },

  // Deposit tokens
  deposit: async (amount) => {
    // Mock implementation - replace with actual Hedera deposit
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject(new Error('Amount must be greater than 0'))
          return
        }
        
        const transaction = {
          id: `deposit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'deposit',
          amount: amount,
          ksh_amount: amount * HBAR_TO_KSH_RATE,
          timestamp: new Date().toISOString(),
          status: 'completed',
          transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`
        }
        
        resolve(transaction)
      }, 1500)
    })
  },

  // Withdraw tokens
  withdraw: async (amount) => {
    // Mock implementation - replace with actual Hedera withdrawal
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject(new Error('Amount must be greater than 0'))
          return
        }
        
        const transaction = {
          id: `withdrawal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'withdrawal',
          amount: amount,
          ksh_amount: amount * HBAR_TO_KSH_RATE,
          timestamp: new Date().toISOString(),
          status: 'completed',
          transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`
        }
        
        resolve(transaction)
      }, 1500)
    })
  },

  // Get exchange rates
  getExchangeRate: async () => {
    return {
      hbar_to_ksh: HBAR_TO_KSH_RATE,
      ksh_to_hbar: 1 / HBAR_TO_KSH_RATE
    }
  }
}

export default tokenomics
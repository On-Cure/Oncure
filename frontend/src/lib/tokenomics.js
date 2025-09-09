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
    // Mock implementation - replace with actual Hedera API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockBalance = {
          hbar: Math.floor(Math.random() * 1000) + 100, // 100-1100 HBAR
          ksh: 0 // Will be calculated from HBAR
        }
        mockBalance.ksh = mockBalance.hbar * HBAR_TO_KSH_RATE
        resolve(mockBalance)
      }, 500)
    })
  },

  // Send tip to another user
  sendTip: async (recipientId, amount, message = '') => {
    // Mock implementation - replace with actual Hedera transaction
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount <= 0) {
          reject(new Error('Amount must be greater than 0'))
          return
        }
        
        const transaction = {
          id: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'tip_sent',
          amount: amount,
          recipient_id: recipientId,
          message: message,
          timestamp: new Date().toISOString(),
          status: 'completed',
          transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`
        }
        
        resolve(transaction)
      }, 1000)
    })
  },

  // Get transaction history
  getTransactions: async (page = 1, limit = 20) => {
    // Mock implementation - replace with actual Hedera transaction history
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTransactions = []
        const types = ['tip_sent', 'tip_received', 'deposit', 'withdrawal', 'reward']
        
        for (let i = 0; i < limit; i++) {
          const type = types[Math.floor(Math.random() * types.length)]
          const amount = Math.floor(Math.random() * 100) + 1
          
          mockTransactions.push({
            id: `tx_${Date.now()}_${i}`,
            type: type,
            amount: amount,
            ksh_amount: amount * HBAR_TO_KSH_RATE,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`,
            description: type === 'tip_sent' ? 'Tip sent to user' :
                        type === 'tip_received' ? 'Tip received from user' :
                        type === 'deposit' ? 'Account deposit' :
                        type === 'withdrawal' ? 'Account withdrawal' :
                        'Weekly reward'
          })
        }
        
        resolve({
          transactions: mockTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
          page,
          limit,
          total: 100,
          hasMore: page < 5
        })
      }, 800)
    })
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
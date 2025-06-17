import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
    account: string | null;
    isConnecting: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    // Check if MetaMask is installed
    const isMetaMaskInstalled = () => {
        return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
    };

    // Connect to MetaMask
    const connectWallet = async () => {
        if (!isMetaMaskInstalled()) {
            alert('Please install MetaMask to continue');
            return;
        }

        setIsConnecting(true);
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            if (accounts.length > 0) {
                setAccount(accounts[0]);
                localStorage.setItem('connectedAccount', accounts[0]);
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask');
        } finally {
            setIsConnecting(false);
        }
    };

    // Disconnect wallet
    const disconnectWallet = () => {
        setAccount(null);
        localStorage.removeItem('connectedAccount');
    };

    // Check for existing connection on component mount
    useEffect(() => {
        const checkConnection = async () => {
            if (!isMetaMaskInstalled()) return;

            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts',
                });

                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            } catch (error) {
                console.error('Error checking MetaMask connection:', error);
            }
        };

        checkConnection();

        // Listen for account changes
        if (isMetaMaskInstalled()) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    localStorage.setItem('connectedAccount', accounts[0]);
                } else {
                    setAccount(null);
                    localStorage.removeItem('connectedAccount');
                }
            });
        }

        return () => {
            if (isMetaMaskInstalled()) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    const value = {
        account,
        isConnecting,
        connectWallet,
        disconnectWallet,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

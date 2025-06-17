import { useNavigate } from "react-router-dom"
import { useWallet } from "../contexts/WalletContext"

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { account, isConnecting, connectWallet, disconnectWallet } = useWallet();

    const formatAccount = (account: string) => {
        return `${account.slice(0, 6)}...${account.slice(-4)}`;
    };

    return (
        <div className="sticky top-0 bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                nftix
            </h1>

            <div className="flex items-center gap-4">
                <button
                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
                    onClick={() => navigate('/create-event')}
                >
                    Create Event
                </button>

                {account ? (
                    <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {formatAccount(account)}
                        </span>
                        <button
                            onClick={disconnectWallet}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                    >
                        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateEventForm from './components/CreateEventForm';
import { WalletProvider } from './contexts/WalletContext';

function App() {
    return (
        <WalletProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/create-event" element={<CreateEventForm />} />
                </Routes>
            </Router>
        </WalletProvider>
    );
}

export default App

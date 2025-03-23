import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateEventForm from './components/CreateEventForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-event" element={<CreateEventForm />} />
            </Routes>
        </Router>
    );
}
export default App

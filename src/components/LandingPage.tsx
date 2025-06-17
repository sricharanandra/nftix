import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header"

interface Event {
    _id: string;
    name: string;
    venue: string;
    capacity: number;
    date: string;
    time: string;
}

const LandingPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                    {events.length === 0 ? (
                        <p>No events found. Create one to get started!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map(event => (
                                <div key={event._id} className="bg-white p-4 rounded-lg shadow">
                                    <h3 className="text-xl font-bold">{event.name}</h3>
                                    <p><strong>Venue:</strong> {event.venue}</p>
                                    <p><strong>Capacity:</strong> {event.capacity}</p>
                                    <p><strong>Date:</strong> {event.date}</p>
                                    <p><strong>Time:</strong> {event.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </>

    );
};

export default LandingPage;


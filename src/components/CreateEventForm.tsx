import React, { useState } from 'react';
import axios from 'axios';

interface EventFormData {
    name: string;
    venue: string;
    capacity: number;
    date: string;
    time: string;
}

export default function CreateEventForm(): any {
    const [formData, setFormData] = useState<EventFormData>({
        name: '',
        venue: '',
        capacity: 0,
        date: '',
        time: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'capacity' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/events', formData);
            alert('Event created successfully!');
            setFormData({ name: '', venue: '', capacity: 0, date: '', time: '' });
        } catch (error) {
            console.error('Error creating event:', error);
            alert('Failed to create event.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>

            <label className="block mb-2">Event Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <label className="block mb-2 mt-4">Event Venue</label>
            <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <label className="block mb-2 mt-4">Capacity</label>
            <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <label className="block mb-2 mt-4">Date</label>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <label className="block mb-2 mt-4">Time</label>
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <button type="submit" className="w-full mt-6 bg-blue-500 text-white p-2 rounded">Create Event</button>
        </form>
    );
}

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect('mongodb://localhost:27017/eventDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const eventSchema = new mongoose.Schema({
    name: String,
    venue: String,
    capacity: Number,
    date: String,
    time: String,
});

const Event = mongoose.model('Event', eventSchema);

// Create Event
app.post('/events', async (req, res) => {
    const event = new Event(req.body);
    try {
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});














//import express from 'express';
//import bodyParser from 'body-parser';
//
//const app = express();
//
//app.use(bodyParser.json());
//
//let events = [];
//
//app.post('/events', (req, res) => {
//    const event = req.body;
//    events.push(event);
//    console.log('Event stored:', event);
//    res.status(201).json({ message: 'Event created successfully' });
//});
//
//app.get('/events', (req, res) => {
//    res.json(events);
//});
//
//app.listen(3000, () => {
//    console.log('Server running on http://localhost:3000');
//});
//

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Appointment = require('./backend/models/Appointment');
const Doctor = require('./backend/models/Doctor');
const PetOwner = require('./backend/models/PetOwner');

// Routes
const appointmentRoutes = require('./backend/routes/appointmentRoutes');
const doctorRoutes = require('./backend/routes/doctorRoutes');
const petOwnerRoutes = require('./backend/routes/petOwnerRoutes');

// App setup
const app = express();
app.use(express.json());  // For parsing JSON bodies
app.use(cors());  // Enable Cross-Origin Requests

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed', err);
    }
};

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/petowners', petOwnerRoutes);

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
    connectDB();  // Connect to the database
});

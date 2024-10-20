const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');

// Initialize Express
const app = express();
app.use(bodyParser.json());
const MONGO_URI = 'mongodb://localhost:27017/healthcareServices';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define the healthcare service schema for MongoDB
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Create a model for Service
const Service = mongoose.model('Service', serviceSchema);

// Define Joi validation schema
const serviceValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .regex(/^[a-zA-Z0-9 ]+$/)
        .required()
        .messages({
            'string.min': 'Service name should be at least 3 characters long.',
            'string.max': 'Service name should be at most 100 characters long.',
            'string.pattern.base': 'Service name should only contain letters, numbers, and spaces.'
        }),
    description: Joi.string()
        .min(10)
        .max(500)
        .required(),
    price: Joi.number()
        .greater(0)
        .precision(2)
        .required()
        .messages({
            'number.greater': 'Price must be greater than zero.',
            'number.precision': 'Price can have a maximum of two decimal places.'
        }),
});

// 1. Add a new service (POST)
app.post('/api/services', async (req, res) => {
    const { error } = serviceValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description, price, category } = req.body;

    try {
        // Check if a service with the same name already exists
        const existingService = await Service.findOne({ name });
        if (existingService) {
            return res.status(400).json({ message: 'Service with this name already exists' });
        }

        const newService = new Service({ name, description, price, category });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 2. Get all services (GET)
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Update a service by ID (PUT)
app.put('/api/services/:id', async (req, res) => {
    const { error } = serviceValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description, price } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.name = name;
        service.description = description;
        service.price = price;

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Delete a service by ID (DELETE)
app.delete('/api/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await service.remove();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

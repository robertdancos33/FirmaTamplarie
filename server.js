// server.js

const express = require('express');
const connectDB = require('./database');
const User = require('./models/User');

const app = express();

// Conectare la MongoDB
connectDB();

// Middleware pentru parsarea corpului cererilor
app.use(express.json());

// Ruta pentru înregistrare (signup)
app.post('/signup', async(req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificăm dacă utilizatorul există deja în baza de date
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Creăm un utilizator nou
        const newUser = new User({
            username,
            email,
            password
        });

        // Salvăm utilizatorul în baza de date
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Pornim serverul
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
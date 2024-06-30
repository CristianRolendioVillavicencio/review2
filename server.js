const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = "AIzaSyCJWmirH9vAYIn_nOP0ug2THZZMjy7TwQ0"; // Reemplaza con tu API Key
const placeId = "ChIJMYySAB_SEKwR4aoS-1A8AHQ"; // Reemplaza con el Place ID

app.use(express.static('public'));

app.get('/reviews', async (req, res) => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

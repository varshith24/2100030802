const express = require('express');
const axios = require('axios');
const app = express();
const getToken = require('./BearerToken'); // Ensure this file exports a function that returns a token
const PORT = 9876;

let token;

const initializeToken = async () => {
    try {
        token = await getToken();
        // console.log('Token fetched:', token);
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
    }
};
initializeToken();

app.get("/test/p", async (req, res) => {
    if (!token) {
        res.status(500).send("Token is not available");
        return;
    }

    try {
        const response = await axios.get('http://20.244.56.144/test/primes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log(response.data);
        res.status(200).json(response.data);
    } catch (e) {
        console.error('Error:', e.message || e);
        res.status(500).send("Error fetching data");
    }
});

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

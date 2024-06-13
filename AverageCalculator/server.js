const express = require('express');
const axios = require('axios');
const getToken = require('./BearerToken');
const app = express();
const PORT = 9876;

const type = {
    "p": "primes",
    "e": "even",
    "f": "fibo",
    "o": "odd",
    "r": "rand"
}

let token;
const previousRequests = [];

const initializeToken = async () => {
    try {
        token = await getToken();
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
    }
};

initializeToken()

app.get("/test/:id", async (req, res) => {
    const id = req.params.id;

    if (!token) {
        res.status(500).send("Token is not available");
        return;
    }

    try {
        const response = await axios.get(`http://20.244.56.144/test/${type[id]}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        let s = 0;
        for (let i = 0; i < response.data.numbers.length; i++) {
            s += response.data.numbers[i];
        }
        const avg = s / response.data.numbers.length;

        console.log(response.data);
        res.status(200).json({ "windowPrevState": previousRequests.length == 0 ? [] : previousRequests[previousRequests.length - 1], "windowCurrState": response.data.numbers, "avg": avg });
        previousRequests.push(response.data.numbers)
    } catch (e) {
        console.error('Error:', e.message || e);
        res.status(500).send("Error fetching data");
    }
});

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
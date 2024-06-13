const express = require('express');
const axios = require('axios');
const getToken = require('./BearerToken');
const app = express();
const PORT = 9876;

let token;


const initializeToken = async () => {
    try {
        token = await getToken();
        console.log('Token initialized successfully.');
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
        process.exit(1);
    }
};


initializeToken().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
});


app.get("/test/companies/:companyname/categories/:categoryname/products", async (req, res) => {
    const companyName = req.params.companyname;
    const categoryName = req.params.categoryname;

    try {
        const response = await axios.get(`http://20.244.56.144/products/companies/${companyName}/categories/${categoryName}/products`, {
            params: req.query,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error.message || error);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch products' });
    }
});

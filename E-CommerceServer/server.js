const express = require('express');
const axios = require('axios');
const getToken = require('./BearerToken');
const app = express();
const PORT = 9876;

let token;

const company = ["AMZ", "FLP", "SNP", "MYN", "AZO"]
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]

const initializeToken = async () => {
    try {
        token = await getToken();
        // console.log(token);
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
    }
};


initializeToken()


app.get("/test/companies/:companyname/categories/:categoryname/products", async (req, res) => {
    const companyName = req.params.companyname;
    const categoryName = req.params.categoryname;
    console.log(companyName)
    if (company.includes(companyName) && categories.includes(categoryName)) {

        try {
            const response = await axios.get(`http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products?top=10&minPrice=1&maxPrice=10000`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(response)
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching products:', error || error);
            res.status(error.response?.status || 500).json({ error: 'Failed to fetch products' });
        }
    }
    else {
        res.json({ "message": "category or company Invalid" })
    }
});

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
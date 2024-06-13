const express = require('express')
const axios = require('axios')
const getToken = require('./BearerToken');
const app = express();
const PORT = 9876;

let token;


const initializeToken = async () => {
    try {
        token = await getToken();
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
    }
};

initializeToken()

app.get("/test/companies/:companyname/categories/:categoryname/products", async (req, res) => {

    const companyname = req.params.companyname
    const categoryname = req.params.categoryname
    console.log(req.query)

    try {
        const data = await axios.get(`http://20.244.56.144/products/comapnies/${companyname}/categories/${categoryname}/products`, {
            params: req.query,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        res.json(data.data)
    }
    catch (e) {
        console.log(e)
    }

    res.json({ "name": "hello" })
})


app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
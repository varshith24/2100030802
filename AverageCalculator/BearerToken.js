const axios = require('axios');

const cred = {
    "companyName": "KL University",
    "clientID": "b8859151-64f2-4535-9210-8325737236dc",
    "clientSecret": "GxCKIpLGutKfItOr",
    "ownerName": "Varshith",
    "ownerEmail": "varshi1188@gmail.com",
    "rollNo": "2100030802"
};

const getToken = async () => {
    try {
        const response = await axios.post("http://20.244.56.144/test/auth", cred);
        // console.log(response.data.access_token); // Log the access token to console
        return response.data.access_token; // Return the access token
    } catch (error) {
        console.error('Error fetching token:', error.message || error);
        throw error;
    }
};

module.exports = getToken;

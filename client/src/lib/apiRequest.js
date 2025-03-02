// import axios from "axios";

// const apiRequest = axios.create({
//     baseURL:"http://localhost:8800/api",
//     // withCredentials:true // error aa rha tha isiliye comment kiye hia (Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'data'))
// });

// export default apiRequest;

import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://real-estate-web-app-1cus.onrender.com/api",
    // baseURL: "http://localhost:8800/api",
    withCredentials: true
});

export default apiRequest;
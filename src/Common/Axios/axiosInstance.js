import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "partner-code":"UIClient",
    "client-code":1,
    "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJwYXJ0bmVyLWNvZGUiOiJVSUNsaWVudCIsImp0aSI6ImY2NDZmNTFmLWIwMGQtNDhmNy04YTdmLWRlODU3Y2U4NGI3NCIsImV4cCI6MTcwOTcyODM1MCwiaXNzIjoieHl6IiwiYXVkIjoic2RmYXNkZmRzZmFzZF9TRkRhc2RmYXNkZl9EU0FmZ0RHRl9GRFNnc2RmZ3NkZl9HZGZzZ3NkZmdzZGZfR2RzZmdzZGZnX0RzZmcifQ.3F-a6PxbgDVZZK-maASP6tgvyjJcMGg9pUaAfSU8QwA"
  },
});
  
export default api;
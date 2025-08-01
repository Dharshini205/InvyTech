// src/api/axios.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000', // Backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

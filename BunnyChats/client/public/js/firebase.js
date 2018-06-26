const { initializeApp } = require('firebase')

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCuDs2RVUsFs5R2Kv2xdVZoR8yvjLrLup4",
  authDomain: "bunnychat-ed8e7.firebaseapp.com",
  databaseURL: "https://bunnychat-ed8e7.firebaseio.com",
  projectId: "bunnychat-ed8e7",
  storageBucket: "bunnychat-ed8e7.appspot.com",
  messagingSenderId: "708566635360"
})

const db = firebaseApp.database();

module.exports = db

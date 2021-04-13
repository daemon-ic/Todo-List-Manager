import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCxx4Oi_LLhhP7jyUgVqcO234bYrqpkJD4",
  authDomain: "inventory-app-1e971.firebaseapp.com",
  projectId: "inventory-app-1e971",
  storageBucket: "inventory-app-1e971.appspot.com",
  messagingSenderId: "1021437833964",
  appId: "1:1021437833964:web:45e3a3788e2a8b79476bc9",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export { fire as default };

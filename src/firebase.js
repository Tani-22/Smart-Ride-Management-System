import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDYnO9lSGdkRkpbekRF99GRw3qMU5vJHU4",
  authDomain: "poolpals.firebaseapp.com",
  projectId: "poolpals",
  databaseURL: "https://poolpals-default-rtdb.firebaseio.com/",
  storageBucket: "poolpals.appspot.com",
  messagingSenderId: "388538622954",
  appId: "1:388538622954:web:d885e8836f546e99fd0893",
  measurementId: "G-DKF4JEJRES"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage };
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0l_jCePVoiUnX70mwRWpR8ThN1SdnLak",
    authDomain: "milherramientas-ec1c4.firebaseapp.com",
    projectId: "milherramientas-ec1c4",
    storageBucket: "milherramientas-ec1c4.firebasestorage.app",
    messagingSenderId: "275985408917",
    appId: "1:275985408917:web:0bbc5118894dfbc7ba4c9c"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
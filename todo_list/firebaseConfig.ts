import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOt622RgPHQSn6SUevSgaQpMqZew2Zs34",
    authDomain: "todolist-181a6.firebaseapp.com",
    projectId: "todolist-181a6",
    storageBucket: "todolist-181a6.firebasestorage.app",
    messagingSenderId: "734500469151",
    appId: "1:734500469151:web:667156efaba56a74a2a5aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

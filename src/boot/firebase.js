import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyB4zqNbCsyOuIRbo3-TR-c9J-CyO-eQ06k",
  authDomain: "patient-record-for-hospital.firebaseapp.com",
  projectId: "patient-record-for-hospital",
  storageBucket: "patient-record-for-hospital.firebasestorage.app",
  messagingSenderId: "934858064330",
  appId: "1:934858064330:web:f21f4191864bd2b9bc4f33"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

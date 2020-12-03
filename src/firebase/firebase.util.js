import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDHz4DDN9MQ4ChuLBhm91MEhgEtfbXJKOw",
    authDomain: "instagram-clone-3de52.firebaseapp.com",
    projectId: "instagram-clone-3de52",
    storageBucket: "instagram-clone-3de52.appspot.com",
    messagingSenderId: "24113790067",
    appId: "1:24113790067:web:e181312ae00254c455be06",
    measurementId: "G-N47HFS0D9D"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
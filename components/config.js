import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAhQxxvGRe7FC7czps_Z9UPxPdf4sFmA2E",
    authDomain: "react-native-timer.firebaseapp.com",
    databaseURL: "https://react-native-timer-default-rtdb.firebaseio.com",
    projectId: "react-native-timer",
    storageBucket: "react-native-timer.appspot.com",
    messagingSenderId: "147977430494",
    appId: "1:147977430494:web:13c37545e6abaa3eb5e94f"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
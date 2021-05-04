import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIRE_API_KEY,
        authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIRE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIRE_APP_ID,
        measurementId: process.env.REACT_APP_FIRE_MEASURMENT_ID};

        const fire = firebase.initializeApp(firebaseConfig);
        //firebase.analytics();
        

        export default fire;



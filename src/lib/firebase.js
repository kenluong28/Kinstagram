import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyARTNOboOBpO2M9VsK_57mfbwYrRqrAzGs",
    authDomain: "kinstagram-fb884.firebaseapp.com",
    projectId: "kinstagram-fb884",
    storageBucket: "kinstagram-fb884.appspot.com",
    messagingSenderId: "303484936716",
    appId: "1:303484936716:web:bb7633edf926b516ae4429"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
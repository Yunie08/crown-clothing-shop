import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzjo6FMWDYJK-4H4god0IjnTSzw-K5B14",
  authDomain: "crwn-clothing-db-91af7.firebaseapp.com",
  projectId: "crwn-clothing-db-91af7",
  storageBucket: "crwn-clothing-db-91af7.appspot.com",
  messagingSenderId: "521274830539",
  appId: "1:521274830539:web:81a858ae446215c172354e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize provider for Google Authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore database instanciation
export const db = getFirestore();

// Get user data from login and store it in database
export const createUserDocumentFromAuth = async (userAuth) => {
  // 1) we check if there is an existing document reference with this uid
  // if there is no reference with this id, Firebase will still create a new ref for us to store our new userdata
  // doc(database, collection, unique id) => retrieve documents inside firestore db, not the data!
  // in the data returned by google auth, we can use the "uid" as unique id in our db
  const userDocRef = doc(db, "users", userAuth.uid);

  // 2) We get the data associated to the ref previously received
  const userSnapshot = await getDoc(userDocRef);

  // 3) We check if the user already exists in our database
  // 3.1. if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // create / set the document with the data from the userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // 3.2 if user data exists
  return userDocRef;
};

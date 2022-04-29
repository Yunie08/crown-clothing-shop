import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // Populate db
  collection,
  writeBatch,
  // Get shop data from db
  query,
  getDocs,
} from "firebase/firestore";

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

// EXPORT SHOP DATA TO DATABASE
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // Create collection reference
  const collectionRef = collection(db, collectionKey);

  // Creating batch of actions
  const batch = writeBatch(db);
  // For each object ('hats', 'jackets', 'mens', 'womens', 'snickers')
  objectsToAdd.forEach((object) => {
    // Create doc reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // Set value
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// CREATE USER FROM GOOGLE AUTH
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
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
        // additional info to overwrite displayName === null when we do not authenticate with Google (we set the displayName 'manually')
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // 3.2 if user data exists
  return userDocRef;
};

// CREATE USER WITH EMAIL & PASSWORD
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// SIGNIN WITH EMAIL & PASSWORD
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// LOGOUT
export const signOutUser = async () => signOut(auth);

// AUTHENTICATION LISTENER
// Trigger a callback whenever the auth state changes
// As this is an open listener (always listening) we need to stop it whenever needed to avoid any memory leak
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// GET SHOP DATA FROM DB
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

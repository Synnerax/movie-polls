//import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getFirestore, collection, addDoc } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
import { ref, onUnmounted } from "vue";


import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDgLnvgdnFSpL8-7LUVAl24ju4z-J46hLo",
  authDomain: "movie-polls-cc6db.firebaseapp.com",
  projectId: "movie-polls-cc6db",
  storageBucket: "movie-polls-cc6db.appspot.com",
  messagingSenderId: "205791155131",
  appId: "1:205791155131:web:643ba30869daed2fe5aa9e",
  measurementId: "G-0GWKDGV0D7",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db);
const auth = getAuth(firebaseApp);
//const firebaseApp = firebase.initializeApp(firebaseConfig)
//const db = firebaseApp.firestore()


//const auth = getAuth();
export const signUpWithEmailAndPassword = ( email, password ) => {
  console.log("signed up with: ", email, password)

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export const logInWithEmailAndPassword = ( email, password ) => {
  console.log("email: ", email, "password: ", password)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log("you signed in")
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
const groupsCollection = collection(db, "groups");
console.log(groupsCollection);
//const projectStorage = getStorage();
export const createGroup = (group) => {
  return addDoc(groupsCollection, { group });
};

export const getGroup = async (id) => {
  const user = await groupsCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateGroup = (id, group) => {
  return groupsCollection.doc(id).update(group);
};

export const deleteGroup = (id) => {
  return groupsCollection.doc(id).delete();
};

export const useLoadGroups = () => {
  const groups = ref([]);
  groupsCollection.onSnapshot((snapshot) => {
    groups.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return;
};

export const logout = () => {
  signOut(auth)
  }

const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
}
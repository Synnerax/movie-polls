//import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, query , updateDoc, onSnapshot, arrayUnion, FieldPath } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
import { ref, onUnmounted } from "vue";


import { 
  getAuth,
  onAuthStateChanged, 
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
export const db = getFirestore(firebaseApp);
console.log(db);
export const auth = getAuth(firebaseApp);
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
export const groupsCollection = collection(db, "groups");


//const projectStorage = getStorage();
export const createGroup = (group) => {
  return addDoc(groupsCollection,  group );
};
console.log(groupsCollection)
export const getGroup = async (id) => {
  const user = await groupsCollection.doc(id).get();
  console.log(user)
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


const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("user token: ", token)
  })
  .catch((error) => {
    console.log(error)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
}

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signed out")
  }).catch((error) => {
    // An error happened.
    console.log("not signed in")
  });
}

export const loadGroups = (async () => {
   const snapshot = await getDocs(groupsCollection)
   let groups = snapshot.docs.map(doc => doc.data())
   console.log("look here ---- ", snapshot.docs.map(doc => doc.data()))
   
   return groups
})
export const groupsFeed = () => {
    let groups = []
         onSnapshot(groupsCollection, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id});
            });
            console.log("*********im here*******")
            console.log(documents)
            groups = [...documents]
        })
        return groups;
}





export const joinCommunity = async (userID, community) => {
  //const q = query(groupsCollection, where("IsPrivate", "==", false))
  //const querySnapshot = await getDocs(q);
  //const groupRef = []
  const docRef = doc(db, "groups", community)
 /* querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log("and here: ")
    console.log(doc.id, " => ", doc.data());
    groupRef.push(doc.data())
    console.log("Groupref:  ", groupRef )
  });*/
  //const groupsCollectionRef = doc(groupsCollection, " ")
  await updateDoc(docRef, {
    members: arrayUnion(userID)
  });
  console.log("Joined as member", userID, community)
}
//checka detta : https://firebase.google.com/docs/firestore/query-data/queries

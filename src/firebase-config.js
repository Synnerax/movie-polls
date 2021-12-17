import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc ,getDocs, doc, query, where , updateDoc, onSnapshot, arrayUnion, arrayRemove } from "firebase/firestore";


import { 
  getAuth,
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

//Not sure if this was added when deplying to heroku
import { stringify } from "@firebase/util";
import { compile } from "@vue/compiler-dom";

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
export const auth = getAuth(firebaseApp);

export const signUpWithEmailAndPassword = ( email, password ) => {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    //Not using the data here as we retrive it from onAuthStateChanged in App.vue
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode: ", errorCode)
    console.log("errorMessage: ", errorMessage)

  });
}

export const logInWithEmailAndPassword = ( email, password ) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log("You signed in")
    const user = userCredential.user;

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode: ", errorCode)
    console.log("errorMessage: ", errorMessage)

  });
}
export const groupsCollection = collection(db, "groups");
export const publicGroups = query(groupsCollection, where("isPrivate", "==", false));



export const createGroup = async (group) => {
  let docRef = await addDoc(groupsCollection,  group );
  return new Promise((resolve, reject) => {
    resolve(docRef.id)
  })
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



const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    //Not using the data here as we retrive it from onAuthStateChanged in App.vue
    const user = result.user;
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  })
}


export const initializeData = () => {
  const q = query(groupsCollection, where("isPrivate", "==", false));
  return new Promise((resolve, reject) => {
    onSnapshot(q, (querySnapshot) => {
      const documents = [];
      const polls = [];
      querySnapshot.forEach((doc) => {
          documents.push({...doc.data(), id: doc.id});
          if(doc.data().polls.length > 0) {
            doc.data().polls.forEach((poll) => {
              polls.push({...poll, groupName: doc.data().name})
            })
          }
      });
      resolve({groups: documents, polls: polls})
  })
  })      
}

export const joinCommunity = async (userID, community) => {

  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "groups", community)
    await updateDoc(docRef, {
      members: arrayUnion(userID)
    });
    const updatedDoc = await getDoc(docRef)
    resolve(updatedDoc.data())
  })
}

export const leaveCommunity = async (userID, community) => {

  // Atomically remove a region from the "regions" array field.
  return new Promise( async (resolve, reject) => {
    const docRef = doc(db, "groups", community)
    await updateDoc(docRef, {
      members: arrayRemove(userID)
    });

    const updatedDoc = await getDoc(docRef)
    resolve(updatedDoc.data())
  }) 
    
}


export const publishPoll = async (poll, community) => {

  const docRef = doc(db, "groups", community)
  await updateDoc(docRef, {
    polls: arrayUnion(JSON.parse(JSON.stringify(poll)))
  });
}
//checka detta : https://firebase.google.com/docs/firestore/query-data/queries

//Vote on Poll
export const pushVote = async (userVote, community, index, title) => {

  const docRef = doc(db, "groups", community)
  const docSnap = await getDoc(docRef)

  const polls = docSnap.data().polls

  return new Promise((resolve, reject) => {
    polls.forEach((poll) => {
      if(poll.title === title) {

        const result = poll.movieList[index].votes.find(vote => vote === userVote);

        if(!result) {
          console.log("Added Vote")
          poll.movieList[index].votes.push(userVote)
          updateDoc(docRef, { polls: polls })

        } else {
          console.log("already voted!")
          return 
        }
      }
    })
    resolve(true)  
  })
}

export const fetchUsersCommunitys = async (id) => {
  let docsRef = query(groupsCollection, where("members", "array-contains-any", [id]))
  let snapShot = await getDocs(docsRef)  
  return new Promise((resolve, reject) => {
    let communitys = []
    snapShot.forEach((doc) => {
    communitys.push({...doc.data(), id: doc.id})
  })
  resolve(communitys)
  })
}


export const searchForKeyWord = async (searchWord, selectedSearch) => {
  let searchQuery
  
  if(selectedSearch === "name") {
    searchQuery = query(groupsCollection, where("name", "==", searchWord))
  } 
  else {
    searchQuery = query(groupsCollection, where(selectedSearch, "array-contains-any", [searchWord]))
  }
  
  const docSnap = await getDocs(searchQuery)
  return new Promise((resolve, reject) => {
    let communitys = []
      docSnap.forEach((doc) => {
        communitys.push({...doc.data(), id: doc.id})
      })
      resolve(communitys)
  })
}


export const deleteAllUserInfo = () => {
  deleteUser(auth.currentUser).then(() => {
    // User deleted.
      this.$router.push("/")
      }).catch((error) => {
        // An error ocurred
        // ...
      });
}
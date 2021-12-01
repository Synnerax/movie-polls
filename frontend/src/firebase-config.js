//import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref, onUnmounted } from "vue"

const firebaseConfig = {
  apiKey: "AIzaSyDgLnvgdnFSpL8-7LUVAl24ju4z-J46hLo",
  authDomain: "movie-polls-cc6db.firebaseapp.com",
  projectId: "movie-polls-cc6db",
  storageBucket: "movie-polls-cc6db.appspot.com",
  messagingSenderId: "205791155131",
  appId: "1:205791155131:web:643ba30869daed2fe5aa9e",
  measurementId: "G-0GWKDGV0D7"
};




const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db)
//const firebaseApp = firebase.initializeApp(firebaseConfig)
//const db = firebaseApp.firestore()

const groupsCollection = collection(db, 'groups')
console.log(groupsCollection)
const projectStorage = getStorage()
export const createGroup = group => {
  return groupsCollection.add(group)
}

export const getGroup = async id => {
  const user = await groupsCollection.doc(id).get()
  return user.exists ? user.data() : null;
}

export const updateGroup = (id, group) => {
  return groupsCollection.doc(id).update(group)
}

export const deleteGroup = id => {
  return groupsCollection.doc(id).delete()
}

export const useLoadGroups = () => {
  const groups = ref([])
  groupsCollection.onSnapshot(snapshot => {
    groups.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return
}
<template>
  <section class="joined-communitys">
    <section v-if="displayLigthBox" class="delete-lightbox">
      <section class="delete-confirm-wrapper">
        <span class="cancel-delete" @click="toggleLigthbox">&#10006;</span>
        <h1>Are you sure you want to delete your account?</h1>
        <input v-model="password" v-if="!isGoogle" type="password" name="" id="">
        <section class="delete-buttons-section">
          <button class="confirm-button" @click="deleteByID">Delete User</button>
          <button class="cancel-button" @click="toggleLigthbox">Cancel</button>
        </section>
      </section>
      
    </section>
    <button class="delete-user" @click="toggleLigthbox">Delete user</button>
    
    <h1>Joined communitys:</h1>
    <section class="user-list-wrapper">
      <article v-for="(community, index) in communitys" :key="index">
        <span @click="checkOutCommunity(community.id)" >{{community.name}}</span>
        <span>Members: {{community.members.length}}</span>
      </article>
    </section>
  </section>
</template>

<script>

import {fetchUsersCommunitys, auth,} from '../firebase-config'
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
export default {
  name: "Joined-Communitys",
  props: ["joinedCommunitys", "provider", "email", "currentUser"],
  data() {
    return {
      fetchedList: [],
      displayLigthBox: false,
      googleProvider: null,
      password: ""
    }
  },
  methods: {
      checkOutCommunity(id){
      this.$router.push({name: "Community", params: {id: id}})

    },
    async deleteByID(){
      
        if(this.isGoogle) {
          
          const provider = new GoogleAuthProvider();
          // Start a sign in process for an unauthenticated user.
          provider.addScope('profile');
          provider.addScope('email');
          let newSignIn = await signInWithPopup(auth, provider);
          deleteUser(newSignIn.user).then(() => {
        // User deleted.
          this.$router.push("/")
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log(error)
          })
        } else {
          const authCredential = EmailAuthProvider.credential(this.email.toString(), this.password);
           reauthenticateWithCredential(this.currentUser, authCredential).then(() => {
             deleteUser(this.currentUser).then(() => {
                this.$router.push("/")
                return user
              }).catch((error) => {
                return error
              })
            }).catch((e) => {
              console.log(e)
            })
        }
        
    },
    toggleLigthbox() {
      this.displayLigthBox = !this.displayLigthBox
    }
  },
  computed: {
    communitys: function () {
      return this.fetchedList ? this.fetchedList : "failed to fetch groups"
    },
    isGoogle: function () {
      return this.provider === "google.com"
    }
  },
  async mounted() {
    this.fetchedList = await fetchUsersCommunitys(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

.joined-communitys {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .user-list-wrapper {
    background: #fff;
    width: 25%;
  }


  article {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 10px;

    &:nth-child(odd){
      background: rgb(207, 207, 207);
    }
    span {
      border-bottom: 1px solid rgb(204, 204, 204);
    }
  }
}

.delete-user {
  min-width: 4.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #4547e4;
  background: #fff;
  font-weight: bold;
  max-width: 11rem;
  width: 40%;
}

.delete-lightbox {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .delete-confirm-wrapper {
    display: flex;
    gap: 20px;
    flex-direction: column;
    position: relative;
    text-align: left;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    min-height: 10rem;
    padding: 2rem;
    
    input {
      height: 2.25rem;
      line-height: 1.5;
      padding: 0.375rem 0.75rem;
      color: #495057;
      border: 1px solid #ced4da;
      border-radius: 5px;
    }
    .cancel-delete {
      cursor: pointer;
      color: red;
      position: absolute;
      top: 5px;
      right: 15px;
      font-size: 20px;
    }

    .delete-buttons-section {
      display: flex;
      justify-content: space-evenly;
      .confirm-button, .cancel-button {
      color: #fff;
      background-color: #4547e4;
      text-align: center;
      height: 2.5rem;
      width: 8rem;
      border: 1px solid transparent;
      border-radius: 10px;
      margin-top: 2rem;
      cursor: pointer;
      transition: 0.3s;
      }
    }
  }
}
</style>
<template>
  <section class="sign-up-page">
    <article class="sign-up-wrapper">
    <h1>Sign Up</h1>
      <form action="">

      
      <input v-model="emailReg" type="text" name="Email" placeholder="Email">

      <input v-model="passwordReg" type="password" name="password" placeholder="Password">
      <img src="../assets/google.svg" @click="googleProviderSignUp" class="google-sign-up">
      <button @click.prevent="doRegister" class="submit-create-user">Create Account</button>
    </form>
    <p>Already got a account? Login</p>
    </article>

  </section>
</template>

<script>
import { signUpWithEmailAndPassword, signInWithGoogle } from "../firebase-config";

export default {
  name: "SignUp",
  props: ["isLoggedIn"],
  mounted(){
    if(this.isLoggedIn) {
      this.$router.push("/")
    }
  },
  data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      emptyFields: false
    }
  },
   methods: {
      doLogin() {
         if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {
            alert("You are now logged in");
         }
      },
      
      doRegister() {
         if (this.emailReg === "" || this.passwordReg === "" ) {
            this.emptyFields = true;
         } else {
            signUpWithEmailAndPassword(this.emailReg, this.passwordReg)
         }
      },
      googleProviderSignUp() {
        signInWithGoogle()
      }
   },
   watch: {
    isLoggedIn: function(to, from) {
    if(to) {
      this.$router.push("/")
    }
  }
  },
}
</script>

<style lang="scss">

.sign-up-page {
  height: 74vw;
  display: flex;
  align-items: center;
  justify-content: center;

  .sign-up-wrapper {
    background: #fff;
    padding: 20px;
    border-radius: 5px;

    h1 {
      text-align: left;
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    form {
      width: 100%;
      height: 17rem;
      width: 15rem;
      display: flex;
      flex-direction: column;

      .input-wrapper {
        height: 50%;
      }

      input {
        height: 2.25rem;
        line-height: 1.5;
        padding: .375rem .75rem;
        color: #495057;
        border: 1px solid #ced4da;
        border-radius: 5px;

        &:nth-child(1) {
          margin-bottom: 2rem;
        }
      }
      .google-sign-up {
        cursor: pointer;
        margin-top: 15px;
        width: 30px;
      }
      .submit-create-user {
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

        &:hover {
          border: 1px solid #4547e4;
          box-shadow: 0px 0px 10px #4547e4;
          background-color: #5457e2;
        }
      }
    }
    
  }

  
}
</style>
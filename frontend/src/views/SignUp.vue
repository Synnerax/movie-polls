<template>
  <section class="sign-up-page">
    <article class="sign-up-wrapper">
    <h1>Sign in</h1>
      <form action="">

      
      <input type="text" name="Email" placeholder="Email">

      <input type="password" name="password" placeholder="Password">
      <button class="submit-create-user">Create Account</button>
    </form>
    <p>Already got a account? <router-link to="/">Login</router-link></p>
    </article>

  </section>
</template>

<script>
export default {
  name: "SignUp",
  setup() {
    console.log("setup() in SignUp form")
    return {}
  },
  data() {
    return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
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
         if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
            this.emptyFields = true;
         } else {
            alert("You are now registered");
         }
      }
   }
}
</script>

<style lang="scss">

.sign-up-page {
  min-height: 64vw;
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

      .submit-create-user {
        color: #fff;
        background-color: #007bff;
        text-align: center;
        height: 2.5rem;
        width: 8rem;
        border: 1px solid transparent;
        border-radius: 10px;
        margin-top: 2rem;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          border: 1px solid #007bff;
          box-shadow: 0px 0px 10px #007bff;
          background-color: #016cdf;
        }
      }
    }
    
  }
}
</style>
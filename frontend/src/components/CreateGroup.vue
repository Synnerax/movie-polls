<template>
  <section>
    <form @submit.prevent="onSubmit">
      <h1>Create a group!</h1>
      <div class="create-group-container">
          <label class="label-margin" for="name">Group name</label>
        <input v-model="group.name" type="text" name="name" id="" />
        <label for="owner">Owner</label>
        <input v-model="group.owner" type="text" name="owner" id="" />
         <label for="Genre">Genre</label>
        <input v-model="group.Genre" type="text" name="Genre" id="" />
        <label for="description">Description</label>
        <textarea style="resize: none;" v-model="group.description" type="text" name="description" id="" />
      <button class="add-button" type="submit">Add Group</button>
      </div>
    </form>
  </section>
</template>

<script>
import { createGroup } from "../firebase-config";
export default {
   data() {
    return {
      group: {
        name: "",
        owner: "",
        genre: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    onSubmit() {
      var data = {
        title: this.group.name,
        owner: this.group.owner,
        genre: this.group.genre,
        description: this.group.description,
        published: false
      };

      createGroup(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
     newGroup() {
      this.submitted = false;
      this.group = {
        name: "",
        owner: "",
        genre: "",
        description: "",
        published: false
      };
    }
  }
};


</script>

<style scoped>
h1 {
  padding-top: 4rem;
}
.create-group-container {
  background: rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 26rem;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 1px 1px black;
}
label {
  margin-top: 2rem;
}
.add-button {
margin-bottom: 2rem;
    border: 1px solid black;
    padding: 1rem 4rem;
    border-radius: 5px;
    background: #42b983;
}
input {
  border:none;
  border: 1px solid black;
  border-radius: 10px;
  height: 1.5rem;
}
textarea {
  border-radius: 10px;
  min-height: 10rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

</style>
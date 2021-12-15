<template>
  <section class="group-container ">
    <form @submit.prevent="onSubmit">
      <h1>Create a group!</h1>
      <div class="create-group-container card-border">
          <label class="label-margin" for="name">Group name</label>
        <input placeholder="Example: Movie-club" class="group-name-input" v-model="group.name" type="text" name="name" id="" />
        <div class="flex-wrapper">
        <div v-for="(genre, index) in genres" :key="index" class="genre-container">
        <input :value="genre" v-model="group.genre" type="checkbox" name="Genre" id="" />
        <label style="text-transform: capitalize;">
          {{genre}}
        </label>
        | 
        </div>
        </div>
        <label class="discription-label" for="description">Description</label>
        <textarea style="resize: none;" v-model="group.description" type="text" name="description" id="" />
        <div class="private-container">
        <input v-model="group.isPrivate" type="checkbox" name="private" id="private-checkbox">
         <p>Private group</p>
         </div>
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
      createdID: "",
      group: {
        name: "",
        owner: this.userID,
        genre: [],
        description: "",
        isPrivate: false,
        members: [this.userID],
        polls: []
      },
      genres: [ "horror", "action","adventure","drama","comedy", "musical", "western", "documentary","thriller",]
    }
  },
  props: ["userID"],
  methods: {
    onSubmit() {
      if(this.group.name === "" || this.group.genre.length <= 0) {
        console.log("try again madda fakka")
      } else {
        createGroup(this.group)
        .then((id) => {
          console.log("Created new item successfully!");
          this.submitted = true;
             this.group = {
                name: "",
                owner: this.userID,
                genre: [],
                description: "",
                isPrivate: false,
                members: [this.userID],
                polls: []
        }
        this.updateRoute(id) 
        })
        .catch(e => {
          console.log(e);
        });
      }
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
    },
    async updateRoute(id) {
      this.$emit("fetchData")
      console.log("this should be the id: ", id)
      this.$router.push({name: "Home"})
    }
  }
};


</script>

<style scoped>
#private-checkbox {
    margin-right: 5px;
}
.private-container {
    display: inline-flex;
}
.label-margin {
  width: 100%;
  text-align: left;
}
.flex-wrapper {
      width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.genre-container {
  display: flex;
} 
.genre-container > label {
  margin: 0;
  margin: 0 5px;
}
.group-container {
    height: 89%;
    font-family: 'Oxygen', sans-serif;
    display: flex;
    justify-content: center;
    font-weight: bold;
    align-items: center;
}
form {
  width: 50%;
  min-width: 22rem;
}

form > h1 {
  margin-bottom: 10px;
}
.create-group-container {

  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
}
label {
  margin-top: 2rem;
}
.add-button {
margin-bottom: 2rem;
    border: 1px solid black;
    padding: 1rem 4rem;
    border-radius: 5px;
    background: #4547e4;
    color: white;
    font-family: 'Oxygen', sans-serif;
    font-weight: bold;
}
input {
  height: 1.5rem;
}
.discription-label {
  text-align: left;
  width: 100%;
}

textarea {
  width: 95%;
  border-radius: 7px;
  min-height: 10rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.group-name-input {
  padding: 0.275rem;
  border: none;
  border-bottom: 2px solid #e5e5e5;
  width: 100%;
  margin-bottom: 2rem;
}
</style>
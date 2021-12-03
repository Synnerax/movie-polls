<template>
  <section>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">Group name</label>
        <input v-model="group.name" type="text" name="name" id="" />
        <label for="description">description</label>
        <input v-model="group.description" type="text" name="description" id="" />
      </div>
      <button type="submit">Add Group</button>
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
        description: "",
        published: false
      };
    }
  }
};


</script>

<style></style>
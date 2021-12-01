<template>
  <section>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">Group name</label>
        <input type="text" name="name" id="">
      </div>

      <button type="submit">Add Group</button>
    </form>
  </section>
</template>

<script>
import { createGroup } from "../firebase-config"
import { reactive } from "vue"
export default {
  setup() {
      const form = reactive({ name: ""})
      const onSubmit = async () => {
        await createGroup({...form})
        form.name = ''
      }

      return { form, onSubmit }
    }
}
</script>

<style>

</style>
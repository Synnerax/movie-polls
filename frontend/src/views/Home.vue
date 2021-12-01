<template>
  <div class="home">
    <CreateGroup/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateGroup from "@/components/CreateGroup.vue"
export default {
  name: "Home",
  components: {
    CreateGroup
  },
};
</script>

<template>
      <article >
      <!--This should return group name and not group ID-->
      <p>c/{{poll.groupName}}</p>
      <p>{{poll.title}} - Votes: {{votes}}</p>
      <section v-for="(movie, index) in poll.movieList" :key="index">
        <p>{{movie.title}} - {{movie.release}} - {{movie.director}}</p>
      </section>
    </article>
</template>

<script>
export default {
  name: "feed-poll",
  props: ["poll"],
  computed: {
    votes: function() {
      
      let oldList = 0
      this.poll.movieList.map((list) => {
       if(list.votes) {
         oldList = oldList + list.votes.length
       } else {
         oldList = "Missing"
       }
     })
       return oldList
    }
  }
}
</script>

<style>

</style>
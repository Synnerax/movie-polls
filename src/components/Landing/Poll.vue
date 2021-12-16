<template>
      <article class="poll-feed-item" v-bind:class="{ active: isExpired, expired: !isExpired}">
      <!--This should return group name and not group ID-->
      <p>c/{{poll.groupName}}</p>
      <p>{{poll.title}} - Votes: {{votes}}</p>
      <p>Expired: {{!isExpired}}</p>
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
    },
    isExpired: function() {
    let date = this.poll.voteExpire ? this.poll.voteExpire : "Missing Expire Date" 
    return new Date(date) >= new Date()
  }
  }
}
</script>

<style lang="scss">
.poll-feed-item {
  p {
    padding: 5px 15px;
  }
}

.active {
  border: 2px solid rgb(39, 184, 34);
}

.expired {
  border: 2px solid red;
}
</style>
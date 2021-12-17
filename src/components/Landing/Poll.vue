<template>
      <article class="poll-feed-item" v-bind:class="{ active: isExpired, expired: !isExpired}">
      <p>c/{{poll.groupName}}</p>
      <p>{{poll.title}} - Votes: {{votes}}</p>
      <section v-for="(movie, index) in poll.movieList" :key="index">
        <p>{{movie.title}} - {{movie.release}} - {{movie.director}}</p>
      </section>
      <span v-if="!isExpired" class="expired-ribbon expired">Expired</span>
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
  position: relative;
  overflow: hidden;
  p {
    padding: 5px 15px;
  }
}

.active {
  border: 1px solid rgb(39, 184, 34);
}

.expired {
  border: 1px solid red;
}

.expired-ribbon {
position: absolute;
top: 15px;
right: -35px;
transform: rotate(
48deg);
text-align: center;
width: 80px;
background: red;
padding: 0 1rem;
color: white;

}
</style>
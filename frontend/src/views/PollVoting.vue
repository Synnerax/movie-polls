<template>
  <section class="voting">
    <section class="poll-voting-view">
      <article class="left-section-poll-view">
        <h1>
        {{this.poll.title}}
        </h1>
        <p>Votes: {{this.countedVotes}}</p>
        <section v-for="(movie, index) in this.poll.movieList" :key="index">
          <p>{{movie.title}}</p>
          <p>{{movie.director}}</p>
          <p>{{movie.release}}</p>
        </section>
      </article>
      <article class="right-section-poll-view">
        <PieChart /> 
      </article>


    </section>
  </section>
</template>

<script>

import PieChart from "../components/Chart/PieChart.vue"

//chart: https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js
export default {
  data() {
    return {
      poll: {
        voted: [ "hej"]
    }}
  },
  props: ["pollsFeed"],
  mounted() {
    this.pollsFeed.forEach((poll) => {
      if(poll.title === this.$route.params.title) {
        this.poll = poll
      }
    })
    console.log(this.poll.voted.length)
  },
  computed: {
    countedVotes() {
      let check = this.poll ? this.poll.voted.length : "Error getting votes"
      return check
    }
  },
  components: {
    PieChart
  }
}
</script>

<style lang="scss">

.voting {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  .poll-voting-view {
    display: flex;
    position: relative;
    text-align: left;
    min-width: 15rem;
    width: 75vw;
    min-height: 19rem;
    height: 40vw;
    background: #fff;
  }
}

.left-section-poll-view, .right-section-poll-view {
  position: relative;

}

.left-section-poll-view {
  height: 100%;
  flex: 1 1 60%
}


.right-section-poll-view {
  position: relative;
  height: 100%;
  flex: 1 1 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
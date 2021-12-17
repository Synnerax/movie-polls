<template>
  <section class="voting">
    <section class="poll-voting-view">
      <article class="left-section-poll-view">
        <section>
        <h1>
        {{this.poll.title}}
        </h1>
        <p>Votes: {{this.votes}}</p>
        </section>

        <section class="poll-option" v-for="(movie, index) in this.poll.movieList" :key="index">
          <p>{{movie.title}}</p>
          <span>-</span>
          <p>{{movie.director}}</p>
          <span>-</span>
          <p>{{movie.release}}</p>
          <button @click="voteOnTitle(index)" :disabled="!isExpired">Vote</button>
        </section>
      </article>
      <article class="right-section-poll-view">
        <MovieChart :voteIndex="this.voteIndex" :movies="this.poll.movieList" /> 
      </article>


    </section>
  </section>
</template>

<script>

import MovieChart from "../components/Chart/PieChart.vue"
import { pushVote, auth } from "../firebase-config"
import { onAuthStateChanged,  } from "firebase/auth"
export default {
  name: "Voting",
  data() {
    return {
      poll: {
        movieList: [],
        voted: [ ["userid", "moreVote"], ["anotheruser"], ["userthird"], ["thoruthdas"]]
      },
      chartData: [],
      voteIndex: null,
    }
  },
  props: ["pollsFeed", "userID"],
  mounted() {
    this.pollsFeed.forEach((poll) => {
      if(poll.title === this.$route.params.title) {
        this.poll = poll
      }
    })

  },
  updated(){
    this.pollsFeed.forEach((poll) => {
      if(poll.title === this.$route.params.title) {
        this.poll = poll
      }
    })
  },
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
  },
  components: {
    MovieChart
  },
  methods: {
    async voteOnTitle(index) {
      onAuthStateChanged(auth, async (user) => {
      if(user) {
        await pushVote(this.userID, this.poll.group, index, this.poll.title)
        this.voteIndex = index
        this.$emit("fetchData")
      } else {
        //should show error in frontend
        this.$router.push({name: "Login"})
        console.log("not logged in")
      }
    })
    }
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
    margin-top: 4rem;
    padding: 2rem;
    display: flex;
    position: relative;
    text-align: left;
    min-width: 15rem;
    
    background: #fff;
  }
}


.left-section-poll-view, .right-section-poll-view {
  position: relative;

}
.poll-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 5px;
  background: #f6f9fc;
}
.left-section-poll-view {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  flex: 1 1 50%;

  p {
    width: 10ch;
  }
}


.right-section-poll-view {
  position: relative;
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


@media only screen and (max-width: 770px) {
  .voting {
    .poll-voting-view {
      flex-direction: column;
      height: unset;
    }
  }
}
</style>
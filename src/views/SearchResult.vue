<template>
  <section class="search">
    <article class="search-result-wrapper">
      <section v-if="isPoll" class="array-result">
        <section class="community-links">
        <p v-for="community in result" :key="community.id" @click="checkOutCommunity(community.id)">{{community.name}}</p>
        </section>
      </section>
      <section v-else class="object-result">
        <Poll @click="checkOutPoll(result.title)" :poll="result"  class="poll-wrapper"/>
        <!--
        <article @click="checkOutPoll(result.title)" class="poll-feed-item" >
        
        <p>c/{{result.groupName}}</p>
        <p>{{result.title}} - Votes: {{votes}}</p>
          <section v-for="(movie, index) in result.movieList" :key="index">
            <p>{{movie.title}} - {{movie.release}} - {{movie.director}}</p>
          </section>
        </article>
        -->
      </section>
    </article>
  </section>
</template>

<script>
import Poll from "../components/Landing/Poll.vue"

export default {
  name: "SearchResult", 
  props: ["result"],
  components: {
    Poll
  },
  computed: {
    isPoll: function () {
      return Array.isArray(this.result)
    }
  },
  methods: {
    checkOutCommunity(id){
      this.$router.push({name: "Community", params: {id: id}})

    },
    checkOutPoll(title){
      this.$router.push({name: "Poll Voting", params: {title: title}})
    }
  }
}
</script>

<style lang="scss">

.search {
  display: flex;
  justify-content: center;

  .search-result-wrapper {
    //width: 30rem;
    min-height: 20rem;
    //background: #fff;
    margin-top: 3rem;

    .array-result {
      align-self: flex-end;
      min-width: 15rem;
      width: 20vw;
      min-height: 20rem;
      background: #fff;
      border-radius: 10px;
      padding: 1rem;
      text-align: left;
    
      h1 {
        margin-bottom: 15px;
      }

      .community-links {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;

        p {
          cursor: pointer;
          border-bottom: 2px solid #e5e5e5;
        }
      }
    }
  }
  .object-result {
    min-width: 25rem;
    width: 62vw;
    cursor: pointer;
      text-align: left;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      &:hover {
        border: 1px solid;

      }
      p {
        max-width: 25ch;
      }
  }
}
</style>
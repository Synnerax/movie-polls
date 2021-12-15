<template>
  <section class="search">
    <article class="search-result-wrapper">
      <section v-if="isPoll" class="array-result">
        <section class="community-links">
        <p v-for="community in result" :key="community.id" @click="checkOutCommunity(community.id)">{{community.name}}</p>
        </section>
      </section>
      <section v-else class="object-result">
        <article @click="checkOutPoll(result.title)" class="poll-feed-item" >
        <!--This should return group name and not group ID-->
        <p>c/{{result.groupName}}</p>
        <p>{{result.title}} - Votes: {{votes}}</p>
          <section v-for="(movie, index) in result.movieList" :key="index">
            <p>{{movie.title}} - {{movie.release}} - {{movie.director}}</p>
          </section>
        </article>
      </section>
    </article>
  </section>
</template>

<script>
export default {
  name: "SearchResult", 
  props: ["result"],
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
        console.log("Imma fiering my laza ")
      this.$router.push({name: "Poll Voting", params: {title: title}})
      console.log(this.$route.params.title)
    }
  }
}
</script>

<style lang="scss">

.search {
  display: flex;
  justify-content: center;

  .search-result-wrapper {
    width: 30rem;
    min-height: 20rem;
    //background: #fff;
    margin-top: 3rem;
  }
  .object-result {
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
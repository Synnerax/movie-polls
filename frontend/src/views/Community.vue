<template>
  <section class="community-wrapper">

      <PollsFeed :polls="this.communityFeed"/>


    <section class=".member-list">
      <div class="join-community-wrapper">       
        <button
        class="join-community"
        @click="joinCommunity(userID, this.$route.params.id)"
      >
        Join community
      </button>
      Member: {{this.memberCount}}
      </div>

        {{this.description}}
      
    </section>
      
  </section>
</template>
<script>

/*
.collection("groups")
.where("genre", "array-contains-any", ["comedy"])
*/
import { joinCommunity } from "../firebase-config";
import PollsFeed from '../components/Landing/PollsFeed.vue';

export default {
  name: "community-view",
  props: ["userID", "communitys", ],
  components: { 
    PollsFeed
    },
  methods: {
    joinCommunity,
    pollFeed() {
      let pollList = []
      this.communitys.map((community) => {
        if(community.id === this.url) {
          this.communityFeed = community.polls
        } 
      })
      return pollList
    }
  },
  data() {
    return {
      url: this.$route.params.id,
      communityFeed: [],
      isMember: false,
      communityInfo: {}
    };
  },
  mounted() {
    this.pollFeed()
    
    this.communitys.forEach((community) => {
      if(community.id === this.url) {
        this.communityInfo = community
        community.members.forEach((member) => {
          if(member === this.userID) {
            this.isMember = true
          }
        })
      }
    })
  },
  computed: {
    test() {
      return this.isMember ? this.isMember : "failed to fetch"
    },
    description() {
      return this.communityInfo.description ? this.communityInfo.description : "Community is missing a description"
    },
    memberCount() {
      return this.communityInfo.members ? this.communityInfo.members.length : "No members"
    }
  }
};
</script>

<style lang="scss" scoped>
.community-wrapper {
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  row-gap: 1rem;
}
.member-list {
  align-self: flex-end;
  min-width: 15rem;
  width: 20vw;
  height: 20rem;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  text-align: left;
}
.community-feed {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  min-width: 25rem;
  width: 67vw;
  min-height: 30rem;
  background: #fff;
  border-radius: 10px;
  .join-community {
    width: 7rem;
    height: 3rem;
    background: #fff;
  }
}
h1{
  align-self: center;
}
.border { border-radius: 0px 0px 10px 10px;}
.join-community {
    min-width: 1.5rem;
    width: 5.5rem;
    height: 2rem;
    border-radius: 25px;
    background: #4547e4;
    color: #fff;
    border: none;
    font-weight: bold;
}
.join-community-wrapper {
  background: #fff;
  border-radius: 10px 10px 0px 0px;
}

</style>
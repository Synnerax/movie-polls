<template>
  <section class="community-wrapper">
      <PollsFeed :polls="this.communityFeed"/>
    <section class="comunity-information">
      <div class="join-community-wrapper">       
        <button v-show="!isMember"
        class="join-community"
        @click="memberJoin">
        Join community
      </button>
      <button 
        v-show="isMember"
        class="join-community"
        @click="leaveFromMember">
      Leave
      </button>
      Members: {{this.memberCount}}
      </div>
      <div class="comunity-name">
        {{this.communityName}}
      </div>
        <div class="comunity-description">
        {{this.description}}
      </div>
        
        
       <section class="comunity-tag" v-for="tag in this.gerneTags" :key="tag">
         <span>{{tag}}</span>
         
       </section>
      
    </section>
      
  </section>
</template>
<script>


import { joinCommunity, leaveCommunity, initializeData } from "../firebase-config";
import PollsFeed from '../components/Landing/PollsFeed.vue';

export default {
  name: "community-view",
  props: ["userID", "communitys", ],
  components: { 
    PollsFeed
    },
  methods: {
    async memberJoin() {
      let updatedGroupInfo = await joinCommunity(this.userID, this.$route.params.id)
      this.communityInfo = await updatedGroupInfo
      this.isMember = true
    },
    async leaveFromMember() {
      let updatedGroupInfo = await leaveCommunity(this.userID, this.$route.params.id)
      this.communityInfo = await updatedGroupInfo
      this.isMember = false
    },

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
          } else {
            this.isMember = false
          }
        })
      }
    })
  },
  computed: {
    test() {
      return this.isMember ? this.isMember : "failed to fetch"
    },
    communityName() {
      return this.communityInfo.name ? this.communityInfo.name : "Community is missing a name"
    },
    description() {
      return this.communityInfo.description ? this.communityInfo.description : "Community is missing a description"
    },
    memberCount() {
      return this.communityInfo.members ? this.communityInfo.members.length : "No members"
    },
    gerneTags() {
      return this.communityInfo.genre ? this.communityInfo.genre : "No Tags"
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
.comunity-information {
  align-self: flex-end;
  min-width: 15rem;
  width: 20vw;
  min-height: 20rem;
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
    display: flex;
    border-radius: 10px 10px 0px 0px;
    flex-direction: column;
    align-items: center;
}
.comunity-name {
  text-align: center;
  font-weight: bold;
  margin: 1rem;
  font-size: 18px;
}
.comunity-description {
text-align: center;
border-bottom: 1px solid black;
}
.comunity-tag {
  display: inline-flex
}
span{
  margin: 0.3rem 0.5rem;
}
</style>
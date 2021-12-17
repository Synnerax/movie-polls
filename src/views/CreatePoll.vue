<template>
  <section class="create-poll">
    <article class="new-poll card-border">
      <div class="poll-header">
        <input 
          class="first" 
          v-model="pollName" 
          type="text" 
          name="poll-title" 
          id="poll-title" 
          placeholder="Title"
          :class="{ missing: validation.pollTitle }"
          >
          
        <v-select 
          v-if="this.communitys" 
          @change="() => updateSelectedGroup" 
          class="group-selector" 
          v-model="groupName" 
          :options="options"
          >
          
          </v-select>
        <button class="push-poll" @click.prevent="onSubmitPoll">Push</button>
      </div>
      <div class="poll-body">
        <section class="add-title">
          <input v-model="movie.title" type="text" placeholder="Movie Title" :class="{ missing: validation.title }">
          <input v-model="movie.release" type="text" placeholder="Release Date" :class="{ missing: validation.release }">
          <input v-model="movie.director" type="text" placeholder="Director" :class="{ missing: validation.director }">
          <section class="private-section">
              <input v-model="expireDate" type="date" min="2021-01-01" max="2023-12-31" name="" id="" :class="{ missing: validation.expireDate }">
          </section>
          <button @click.prevent="addToPoll">Add To Poll</button>
        </section>
        <section class="added-titles">
          <article class="poll-item" v-for="(movie, index) in addedTitles" :key="movie.title">
            <span class="remove-poll-item" @click="removeTitle(index)">&#10006;</span>
            <p>{{movie.title}}</p>
            <p>{{movie.release}}</p>
            <p>{{movie.director}}</p>
          </article>
        </section>
      </div>
    </article>
  </section>
</template>

<script>

import { publishPoll, fetchUsersCommunitys } from "../firebase-config"
export default {
  name: "new-poll",
  data() {
    return {
      expireDate: null,
      selectedFile: null,
      imageSource: "",
      preview: false,
      posterRef: "",
      groupName: "",
      pollName: "",
      group: "",
      movie: {
        title: "",
        release: "",
        director: "",
        votes: []
      },
      addedTitles: [],
      isPrivate: false,
      options: [],
      validation: {
        title: false,
        release: false,
        director: false,
        expireDate: false,
        pollTitle: false,
        group: false
      }
    }
  },
  props: {
    userID: String, 
    communitys: Array
  },
  methods: {
    addToPoll() {
      if(!this.movie.title || !this.movie.release || !this.movie.director) {
        //Should display error on inputs
        if(this.movie.title === "") {
          this.validation.title = true
        }
        if(this.movie.release === "") {
          this.validation.release = true

        }
        if(this.movie.director === "") {
          this.validation.director = true

        }

      } else {
        this.addedTitles.push(this.movie)
        this.movie = {
          title: "",
          release: "",
          director: "",
          votes: []
        }
        this.validation = {
        title: false,
        release: false,
        director: false,
        expireDate: false
      }
      }
    },
    removeTitle(index) {
      this.addedTitles.splice(index, 1)
    },
    async onSubmitPoll() {
      // Checks if user has set a group
      if(this.groupName && this.expireDate.length === 10 && this.pollName === ""){
        //takes the groups ID
        const groupID = await this.updateSelectedGroup()
         const poll = {
          voteExpire: this.expireDate,
          owner: this.userID,
          group: groupID, 
          title: this.pollName, 
          private: this.private, 
          movieList: this.addedTitles, 
        }

      publishPoll(poll, groupID)
      this.$emit("fetchData")
      this.$router.push({name: "Home"})
      } else {
        if(this.groupName === "") {
          this.validation.pollTitle = true
        }
        if(this.expireDate === null || this.expireDate.length === !10) {
          this.validation.expireDate = true
        }
        if(this.pollName === "") {
          this.validation.pollTitle = true
        }
      }

    },
    updateSelectedGroup() {
      return new Promise ((resolve, reject) => {
        this.communitys.forEach((community) => {
        if(community.name === this.groupName) {
          resolve(community.id)
        }
      })
      }) 
    },

  },
   async created() {
     
     let options = await fetchUsersCommunitys(this.userID)
     options.forEach((option) => {
       this.options.push(option.name)
     })

  },
  
  

}
</script>

<style lang="scss" >

  .group-selector {
    width: 25%;

  }
  .push-poll {
    margin-left: 5px;
    border: 1px solid black;
    padding: 0 1rem;
    border-radius: 5px;
    background: #4547e4;
    color: white;
    font-family: 'Oxygen', sans-serif;
    font-weight: bold;
  }
  .create-poll {
    background: rgb(231, 231, 231);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;


    .new-poll {

      background: #fff;
      min-width: 65vw;
      min-height: 25vw;
      padding: 15px;


      .poll-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        h1 {
          text-align: left;
          font-size: 2rem;
        }
        input.first {
          padding: 0.275rem;
          border: none;
          border-bottom: 2px solid #e5e5e5;
          width: 60%;
          margin-right: 0.75rem;
        }
        select {
          width: 30%;
          margin-right: 1rem;
        }
      }
      .poll-body {
        display: flex;
        height: 15rem;
        .add-title {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          input {
            //height: 13%;
            border: none;
            border-bottom: 2px solid #e5e5e5;
          }
          .private-section {
            display: flex;
            align-items: center;

            #private-checkbox {
              margin-right: 10px;
            }
          }
          
        }

        .added-titles {
          width: 80%;
          display: flex;
          flex-direction: column;
          overflow: auto;
          
          p:last-child {
            margin-bottom: 10px;
          }

          article {
            text-align: left;
            margin-left: 2rem;
            margin-bottom: 1rem;
            border-bottom: 2px solid #e5e5e5;
            position: relative;

            .remove-poll-item {
              cursor: pointer;
              position: absolute;
              top: 5px;
              right: 15px;
            }
          }
        }
      }
    }
  }
  .missing {
    background: red;
  }
</style>
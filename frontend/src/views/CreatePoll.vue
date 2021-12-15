<template>
  <section class="create-poll">
    <article class="new-poll card-border">
      <div class="poll-header">
        <input class="first" v-model="pollName" type="text" name="poll-title" id="poll-title" placeholder="Title">
       <!--
        <select v-model="group" :disabled="isPrivate" id="group-selector">
            <option value="" disabled selected>Select Group</option>
            <option v-for="community in communitys" :key="community.id" :value="community.id">{{community.name}}</option>
        </select> -->
        <v-select v-if="this.communitys" @change="() => updateSelectedGroup" class="group-selector" v-model="groupName" :options="options"></v-select>
        <button class="push-poll" @click.prevent="onSubmitPoll">Push</button>
      </div>
      <div class="poll-body">
        <section class="add-title">
          <input v-model="movie.title" type="text" placeholder="Movie Title">
          <input v-model="movie.release" type="text" placeholder="Release Date">
          <input v-model="movie.director" type="text" placeholder="Director">
          <section class="private-section">
              <input v-model="expireDate" type="date" name="" id="">
          </section>
          <button @click.prevent="addToPoll">Add To Poll</button>
        </section>
        <section class="added-titles">
          <article v-for="movie in addedTitles" :key="movie.title">
            <!-- 
            <section>
              <input 
              @change="onFileSelected" 
              type="file" 
              name="private" 
              accept="image/*"
              id="private-checkbox">
            </section>
            -->

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
//missing poll end date
//missing vote end date
import { publishPoll } from "../firebase-config"
export default {
  name: "new-poll",
  data() {
    return {
      expireDate: "yyyy/mm/dd",
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
      options: []
    }
  },
  props: {
    userID: String, 
    communitys: Array
  },
  methods: {
    onFileSelected(event) {
      this.imageSource = URL.createObjectURL(event.target.files[0]);
      this.preview = true;
      this.selectedFile = event.target.files[0];
    },
    addToPoll() {
      if(!this.movie.title || !this.movie.release || !this.movie.director) {
        console.log("missing input")
      } else {
        console.log("all inputs filled")
        this.addedTitles.push(this.movie)
        this.movie = {
          title: "",
          release: "",
          director: "",
          votes: []
        }
        console.log("this is addedTitles: ", this.addedTitles)
      }
    },
    async onSubmitPoll() {
      // Checks if user has set a group
      if(this.groupName){
        //takes the groups ID
        const groupID = await this.updateSelectedGroup()
         const poll = {
          owner: this.userID,
          group: groupID, 
          title: this.pollName, 
          private: this.private, 
          movieList: this.addedTitles, 
        }

      publishPoll(poll, groupID)
      this.$emit("fetchData")
      this.$router.push({name: "Home"})

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
  created() {
    
    this.communitys.forEach((group) => {
      this.options.push(group.name)
    })
  }

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

          }
        }
      }
    }
  }
</style>
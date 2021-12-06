<template>
  <section class="create-poll">
    <article class="new-poll">
      <div class="poll-header">
        <input v-model="pollName" type="text" name="poll-title" id="poll-title" placeholder="Title">
        <select v-model="group" id="group-selector">
            <option value="" disabled selected>Select Group</option>
            <option value="dummy group">Dummy group</option>
        </select>
        <button>Push</button>
      </div>
      <div class="poll-body">
        <section class="add-title">
          <input v-model="movie.title" type="text" placeholder="Movie Title">
          <input v-model="movie.release" type="text" placeholder="Release Date">
          <input v-model="movie.director" type="text" placeholder="Director">
          <button @click.prevent="addToPoll">Add To Poll</button>
        </section>

        <section class="added-titles">
          <article v-for="movie in addedTitles" :key="movie.title">
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

export default {
  name: "new-poll",
  data() {
    return {
      pollName: "",
      group: "",
      movie: {
        title: "",
        release: "",
        director: "",
      },
      addedTitles: []
    }
  },
  methods: {
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
        }
        console.log("this is addedTitles: ", this.addedTitles)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
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
        margin-bottom: 2rem;
        h1 {
          text-align: left;
          font-size: 2rem;
        }
        input {
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
            height: 13%;
            border: none;
            border-bottom: 2px solid #e5e5e5;
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
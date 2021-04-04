<template>
  <div class="container">
    <h1>Movies
      <router-link to="/movies/add" class="btn btn-sm btn-success float-end">
        Add
      </router-link>
    </h1>
    <p v-if="movies === null">Loading...</p>
    <p v-else-if="movies.length == 0">No movies yet</p>
    <table v-else class="table table-bordered">
      <thead class="bg-light">
        <tr>
          <th style="width: 3rem">ID</th>
          <th>Title</th>
          <th style="padding-right: 2rem">Release date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id" class="movie-row">
          <td>{{ movie.id }}</td>
          <td>
            <router-link v-if="$auth.can('update:movie')" :to="'/movies/'+movie.id">
              {{ movie.title }}
            </router-link> 
            <span v-else>{{ movie.title }}</span>
          </td>
          <td>{{ movie.release_date }}
            <button v-if="$auth.can('delete:movie')" class="btn-close btn btn-danger float-end" @click="$router.push('/movies/'+movie.id+'/delete')"/>
          </td>
        </tr>
      </tbody>
    </table>
    <transition name="modal">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import hub from './hub'
export default {
  data() { return {
    movies: null,
  } },
  methods: {
    movieUpdated(i) {
      this.$api.get('/movies/'+i)
      .then(res => {
        console.log(res)
        const index = this.movies.findIndex(m => m.id == i)
        console.log({index})
        this.movies.splice(index, 1, res.movie)
      })
    },
    movieAdded(movie) {
      this.movies.push(movie)
    },
    movieDeleted(id) {
      const index = this.movies.findIndex(m => m.id == id)
      this.movies.splice(index, 1)
    }
  },
  created() {
    this.$api.get('/movies')
    .then(res => (this.movies = res.movies, console.log(res)))
    hub.$on('update-movie', this.movieUpdated)
    hub.$on('add-movie', this.movieAdded)
    hub.$on('delete-movie', this.movieDeleted)
  },
  beforeDestroy() {
    hub.$off('update-movie', this.movieUpdated)
    hub.$off('add-movie', this.movieAdded)
    hub.$off('delete-movie', this.movimovieeDeleted)
  },
}
</script>


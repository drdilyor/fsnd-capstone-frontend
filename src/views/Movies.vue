<template>
  <div class="container">
    <h1>Movies</h1>
    <p v-if="movies === null">Loading...</p>
    <p v-else-if="movies.length == 0">No movies yet</p>
    <table v-else class="table table-bordered">
      <thead class="bg-light">
        <tr>
          <th style="width: 3rem">ID</th>
          <th>Title</th>
          <th>Release date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.id }}</td>
          <td>
            <router-link v-if="$auth.can('update:movie')" :to="'/movies/'+movie.id">
              {{ movie.title }}
            </router-link> 
            <span v-else>{{ movie.title }}</span>
          </td>
          <td>{{ new Date(movie.release_date).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <transition name="modal">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data() { return {
    movies: null,
  } },
  created() {
    this.$api.get('/movies')
    .then(res => this.movies = res.movies)
  }
}
</script>

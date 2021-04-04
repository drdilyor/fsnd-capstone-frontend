<template>
  <div class="container home-page">
    <h1 class="text-center">Casting Agency Application</h1>
    <div class="home-page-cards flex-grow-1" v-if="$auth.loggedIn()">
      <div class="card">
        <img class="card-img-top" :src="require('@/assets/img/actors.jpg')" alt="Actors image">
        <div class="card-body">
          <h5 class="card-title">Actors</h5>
          <div class="card-text">You can manage actors and assign them to movies here</div>
          <router-link class="btn btn-danger stretched-link mt-4" to="/actors">Go!</router-link>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" :src="require('@/assets/img/movies.jpg')" alt="Actors image">
        <div class="card-body">
          <h5 class="card-title">Movies</h5>
          <div class="card-text">You can manage movies that are being took here</div>
          <router-link class="btn btn-warning stretched-link mt-4" to="/movies">Go!</router-link>
        </div>
      </div>
    </div>
    <p v-else class="flex-grow-1 text-center-xy" style="vertical-align: top">
      Log in to continue. <router-link to="/profile">Open profile page</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
}

.home-page-cards {
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 18rem);
  justify-content: center;
  align-content: center;
}

.text-center-xy {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

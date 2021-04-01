<template>
  <div class="container home-page">
    <h1 class="text-center">Casting Agency Application</h1>
    <div class="home-page-cards">
      <div class="card">
        <router-link class="card-body" to="/actors" tag="div">
          <h5 class="card-title">Actors</h5>
          <div class="card-text">You can manage actors and assign them to movies here</div>
        </router-link>
      </div>
      <div class="card">
        <router-link class="card-body" to="/movies" tag="div">
          <h5 class="card-title">Movies</h5>
          <div class="card-text">You can manage movies that are being took here</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

.home-page-cards {
  flex: 1;
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fit, 18rem);
  justify-content: center;
  align-items: center;
}
</style>

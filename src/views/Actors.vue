<template>
  <div class="container">
    <h1>Actors</h1>
    <p v-if="actors === null">Loading...</p>
    <p v-else-if="actors.length == 0">No actors yet</p>
    <table v-else class="table table-bordered">
      <thead class="bg-light">
        <tr>
          <th style="width: 3rem">ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actor in actors" :key="actor.id">
          <td>{{ actor.id }}</td>
          <td>
            <router-link v-if="$auth.can('update:actor')" :to="'/actors/'+actor.id">
              {{ actor.name }}
            </router-link> 
            <span v-else>{{ actor.name }}</span>
          </td>
          <td>{{ actor.age }}</td>
          <td>{{ ['Man', 'Woman'][actor.gender] }}</td>
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
    actors: null,
  } },
  created() {
    this.$api.get('/actors')
    .then(res => this.actors = res.actors)
  }
}
</script>

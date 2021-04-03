<template>
  <div class="container">
    <h1>Actors
      <router-link to="/actors/add" class="btn btn-sm btn-success float-end">
        Add
      </router-link>
    </h1>
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
import hub from './ActorHub'
export default {
  data() { return {
    actors: null,
  } },
  methods: {
    actorUpdated(i) {
      this.$api.get('/actors/'+i)
      .then(res => {
        console.log(res)
        const index = this.actors.findIndex(a => a.id == i)
        console.log({index})
        this.actors.splice(index, 1, res.actor)
      })
    },
    actorAdded(actor) {
      this.actors.push(actor)
    }
  },
  created() {
    this.$api.get('/actors')
    .then(res => this.actors = res.actors)
    hub.$on('update-actor', this.actorUpdated)
    hub.$on('add-actor', this.actorAdded)
  },
  beforeDestroy() {
    hub.$off('update-actor', this.actorUpdated)
    hub.$off('add-actor', this.actorAdded)
  },
}
</script>

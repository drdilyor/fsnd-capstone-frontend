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
          <th style="padding-right: 2rem">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actor in actors" :key="actor.id" class="actor-row">
          <td>{{ actor.id }}</td>
          <td>
            <router-link v-if="$auth.can('update:actor')" :to="'/actors/'+actor.id">
              {{ actor.name }}
            </router-link> 
            <span v-else>{{ actor.name }}</span>
          </td>
          <td>{{ actor.age }}</td>
          <td>{{ ['Man', 'Woman'][actor.gender] }}
            <button class="btn-close btn btn-danger float-end" @click="$router.push('/actors/'+actor.id+'/delete')"/>
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
    },
    actorDeleted(id) {
      const index = this.actors.findIndex(a => a.id == id)
      this.actors.splice(index, 1)
    }
  },
  created() {
    this.$api.get('/actors')
    .then(res => this.actors = res.actors)
    hub.$on('update-actor', this.actorUpdated)
    hub.$on('add-actor', this.actorAdded)
    hub.$on('delete-actor', this.actorDeleted)
  },
  beforeDestroy() {
    hub.$off('update-actor', this.actorUpdated)
    hub.$off('add-actor', this.actorAdded)
    hub.$off('delete-actor', this.actorDeleted)
  },
}
</script>

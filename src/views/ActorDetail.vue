<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="actor === null ? 'Loading...' : actor.name" @close="close">
      <div v-if="actor !== null">
        <p>
          <span class="text-primary">Age</span>: {{ actor.age }}
        </p>
        <p>
          <span class="text-primary">Gender</span>: {{ ['Man', 'Woman'][actor.gender] }}
        </p>
        <p>
          <span class="text-primary">Movie id</span>: 
          <router-link v-if="actor.movie_id" to="'/movies/'+actor.movie_id">{{ actor.movie_id }}</router-link>
          <span v-else>Not assigned to a movie yet</span>
        </p>
      </div>
      <template #footer>
        <button class="btn btn-primary" type="button" @click="close">Close</button>
      </template>
    </modal>
</template>

<script>
export default {
  components: {
    Modal: require('@/components/ui/Modal.vue').default,
  },
  data() { return {
    actor: null,
  } },
  methods: {
    close() {
      this.$router.push('/actors')
    }
  },
  created() {
    this.$api.get('/actors/'+this.$route.params.id)
    .then(res => this.actor = res.actor)
  },
}
</script>

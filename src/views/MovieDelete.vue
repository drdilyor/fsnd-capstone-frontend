<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="'Delete a movie'" @close="close">
      <p>Are you sure you want to delete movie with ID {{ movieId }}</p>
      <template #footer>
        <button class="btn btn-sm btn-secondary" :disabled="submitting" @click="close">Hell no!</button>
        <button class="btn btn-sm btn-danger" :disabled="submitting" @click="yesDelete">Yes, delete</button>
      </template>
    </modal>
</template>

<script>
import hub from './hub'

export default {
  components: {
    Modal: require('@/components/ui/Modal.vue').default,
  },
  data() { return {
    movieId: +this.$route.params.id,
    submitting: false,
  } },
  methods: {
    close() {
      this.$router.push('/movies')
    },
    yesDelete() {
      this.submitting = true
      this.$api.request('DELETE', '/movies/'+this.  movieId)
      .then(res => {
        if (res.error == 404)
          alert('Movie doesn\'t exist')
        else
          hub.$emit('delete-movie', this.movieId)
        this.$router.push('/movies')
      })
    }
  },
  created() {
    if (!Number.isInteger(+this.$route.params.id))
      this.$router.push('/404')
  }
}
</script>

<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="title" @close="close">
      <movie-form v-if="movie !== null" :movie="movie" :meta="formMeta" @submit="close"/>
      <template #footer>
        <button class="btn btn-primary" type="button" :disabled="!formMeta.valid" @click="close">
          {{ !submitting ? 'Close' : 'Saving..'}}
        </button>
      </template>
    </modal>
</template>

<script>
import hub from './hub'
export default {
  components: {
    Modal: require('@/components/ui/Modal.vue').default,
    MovieForm: require('@/components/MovieForm.vue').default,
  },
  data() { return {
    movie: null,
    title: 'Loading...',
    formMeta: {
      valid: true,
      disabled: false,
    },
    submitting: false,
  } },
  methods: {
    close() {
      this.formMeta.disabled = true
      this.submitting = true
      this.$api.request('PATCH', '/movies/'+this.movie.id, this.movie)
      .then(res => {
        console.log(res)
        if (res.error == 422) {
          this.formMeta.disabled = false
          this.submitting = false
          alert("Error")
        } else {
          hub.$emit('update-movie', this.movie.id)
          this.$router.push('/movies')
        }
      })
    }
  },
  created() {
    this.$api.get('/movies/'+this.$route.params.id)
    .then(res => {
      if (res.error == 404) {
          this.$router.push('/404')
      }
      else {
        this.movie = res.movie
        this.title = res.movie.title
      }
    })
  },
}
</script>

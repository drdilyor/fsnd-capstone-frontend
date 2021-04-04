<template>
  <!-- This component will be used as a modal nested view -->
    <modal title="Add a movie" @close="close">
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
    movie: {
      title: '',
      release_date: '',
    },
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
      this.$api.request('POST', '/movies', this.movie)
      .then(res => {
        console.log(res)
        if (res.success) {
          hub.$emit('add-movie', res.movie)
          this.$router.push('/movies')
        } else {
          this.formMeta.disabled = false
          this.submitting = false
        }
      })
    }
  },
}
</script>

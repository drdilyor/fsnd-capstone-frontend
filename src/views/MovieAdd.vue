<template>
  <!-- This component will be used as a modal nested view -->
    <modal title="Add a movie" @close="close">
      <movie-form v-if="movie !== null" :movie="movie" :meta="formMeta" @submit="close"/>
      <template #footer>
        <button class="btn btn-secondary" type="button" @click="close">Cancel</button>
        <button class="btn btn-primary" type="button" :disabled="!formMeta.valid" @click="save">
          {{ !submitting ? 'Save' : 'Saving..'}}
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
      valid: false,
      disabled: false,
    },
    submitting: false,
  } },
  methods: {
    save() {
      this.formMeta.disabled = true
      this.submitting = true
      this.$api.request('POST', '/movies', this.movie)
      .then(res => {
        console.log(res)
        if (res.success) {
          hub.$emit('add-movie', res.movie)
          this.close()
        } else {
          this.formMeta.disabled = false
          this.submitting = false
          alert('Unprocessable!')
        }
      })
    },
    close() {
      this.$router.push('/movies')
    },
  },
}
</script>

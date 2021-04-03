<template>
  <!-- This component will be used as a modal nested view -->
    <modal title="Add an actor" @close="close">
      <actor-form v-if="actor !== null" :actor="actor" :meta="formMeta" @submit="close"/>
      <template #footer>
        <button class="btn btn-primary" type="button" :disabled="!formMeta.valid" @click="close">
          {{ !submitting ? 'Close' : 'Saving..'}}
        </button>
      </template>
    </modal>
</template>

<script>
export default {
  components: {
    Modal: require('@/components/ui/Modal.vue').default,
    ActorForm: require('@/components/ActorForm.vue').default,
  },
  data() { return {
    actor: {
      name: '',
      age: '',
      movie_id: '',
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
      this.$api.request('POST', '/actors', {
        ...this.actor,
        movie_id: this.actor.movie_id === '' ? null : this.actor.movie_id
      })
      .then(res => {
        console.log(res)
        if (res.error == 422) {
          this.formMeta.disabled = false
          this.submitting = false
          alert('Movie doesn\'n exist')
        } else {
          this.$router.push('/actors')
        }
      })
    }
  },
}
</script>

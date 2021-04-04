<template>
  <!-- This component will be used as a modal nested view -->
    <modal title="Add an actor" @close="close">
      <actor-form v-if="actor !== null" :actor="actor" :meta="formMeta" @submit="close"/>
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
    ActorForm: require('@/components/ActorForm.vue').default,
  },
  data() { return {
    actor: {
      name: '',
      age: '',
      gender: 0,
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
      this.$api.request('POST', '/actors', this.actor)
      .then(res => {
        console.log(res)
        if (res.success) {
          hub.$emit('add-actor', res.actor)
          this.close()
        } else {
          this.formMeta.disabled = false
          this.submitting = false
          alert("Unprocessable!")
        }
      })
    },
    close() {
      this.$router.push('/actors')
    },
  },
}
</script>

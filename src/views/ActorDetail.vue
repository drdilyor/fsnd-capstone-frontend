<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="title" @close="close">
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
    actor: null,
    title: 'Loading...',
    formMeta: {
      valid: true,
      disabled: false,
    },
    submitting: false,
  } },
  methods: {
    save() {
      console.log('saving')
      this.formMeta.disabled = true
      this.submitting = true
      this.$api.request('PATCH', '/actors/'+this.actor.id, this.actor)
      .then(res => {
        console.log(res)
        if (res.error == 422) {
          this.formMeta.disabled = false
          this.submitting = false
          alert("Error")
        } else {
          hub.$emit('update-actor', this.actor.id)
          this.close()
        }
      })
    },
    close() {
      this.$router.push('/actors')
    },
  },
  created() {
    this.$api.get('/actors/'+this.$route.params.id)
    .then(res => {
      if (res.error == 404) {
          this.$router.push('/404')
      }
      else {
        this.actor = res.actor
        this.title = res.actor.name
      }
    })
  },
}
</script>

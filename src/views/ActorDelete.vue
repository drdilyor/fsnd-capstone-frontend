<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="'Delete an actor'" @close="close">
      <p>Are you sure you want to delete actor with ID {{ actorId }}</p>
      <template #footer>
        <button class="btn btn-sm btn-secondary" :disabled="submitting" @click="close">Hell no!</button>
        <button class="btn btn-sm btn-danger" :disabled="submitting" @click="yesDelete">Yes, delete</button>
      </template>
    </modal>
</template>

<script>
import hub from './ActorHub'

export default {
  components: {
    Modal: require('@/components/ui/Modal.vue').default,
  },
  data() { return {
    actorId: +this.$route.params.id,
    submitting: false,
  } },
  methods: {
    close() {
      this.$router.push('/actors')
    },
    yesDelete() {
      this.submitting = true
      this.$api.request('DELETE', '/actors/'+this.  actorId)
      .then(res => {
        if (res.error == 404)
          alert('Actor doesn\'t exist')
        else
          hub.$emit('delete-actor', this.actorId)
        this.$router.push('/actors')
      })
    }
  },
  created() {
    if (!Number.isInteger(+this.$route.params.id))
      this.$router.push('/404')
  }
}
</script>

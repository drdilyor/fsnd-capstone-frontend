<template>
  <!-- This component will be used as a modal nested view -->
    <modal :title="actor === null ? 'Loading...' : actor.name" @close="close">
      <actor-form v-if="actor !== null" :actor="actor"/>
      <template #footer>
        <button class="btn btn-primary" type="button" @click="close">Close</button>
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

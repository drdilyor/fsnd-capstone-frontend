<template>
  <form @submit.prevent="$emit('submit')">
    <label class="form-label" for="actorName">Name:</label>
    <input class="form-control" id="actorName" type="text" v-model="actor.name">
    <div class="mb-3"/>
    <label class="form-label" for="actorAge">Age:</label>
    <input class="form-control" id="actorMovie" type="number" v-model="actor.age">
    <div class="mb-3"/>
    <label class="form-label" for="actorMovie">Movie id:</label>
    <input class="form-control" id="actorMovie" type="number" v-model="actor.movie_id">
  </form>
</template>

<script>
export default {
  props: {
    actor: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <fieldset :disabled="meta.disabled" @input="setValid">
      <label class="form-label" for="movieName">Name:</label>
      <input
        class="form-control"
        :class="$v.movie.title.$error ? 'is-invalid' : 'is-valid'"
        id="movieName" 
        ype="text"
        v-model="movie.title">
      <div class="mb-3"/>
      <p v-if="!$v.movie.title.required" class="text-danger">This field is required</p>

      <label class="form-label" for="movieReleaseDate">Release date:</label>
      <input
        class="form-control"
        :class="$v.movie.release_date.$error ? 'is-invalid' : 'is-valid'"
        id="movieReleaseDate"
        type="date"
        v-model="movie.release_date">
      <div class="mb-3"/>
      <p v-if="!$v.movie.release_date.required" class="text-danger">This field is required</p>
    </fieldset>
  </form>
</template>

<script>
import { required, integer, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    meta: {
      type: Object,
    },
  },
  methods: {
    setValid() {
      this.$v.$touch()
      this.meta.valid = !this.$v.$invalid
    }
  },
  validations: {
    movie: {
      title: {
        required,
      },
      release_date: {
        required,
      },
    }
  },
}
</script>

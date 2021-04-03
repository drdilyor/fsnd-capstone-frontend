<template>
  <form @submit.prevent="$emit('submit')">
    <fieldset :disabled="meta.disabled" @input="setValid">
      <label class="form-label" for="actorName">Name:</label>
      <input
        class="form-control"
        :class="$v.actor.name.$error ? 'is-invalid' : 'is-valid'"
        id="actorName" 
        ype="text"
        v-model="actor.name">
      <div class="mb-3"/>
      <p v-if="!$v.actor.name.required" class="text-danger">This field is required</p>

      <label class="form-label" for="actorAge">Age:</label>
      <input
        class="form-control"
        :class="$v.actor.age.$error ? 'is-invalid' : 'is-valid'"
        id="actorAge"
        type="number"
        v-model.number="actor.age">
      <div class="mb-3"/>
      <p v-if="!$v.actor.age.required" class="text-danger">This field is required</p>
      <p v-if="!$v.actor.age.between" class="text-danger">Age must be between 3 and 99</p>
      
      <p>Gender:
        <label>
          <input type="radio" value="0" name="actorGender" required v-model.number="actor.gender">
          Man
        </label>
        <span class="ms-3"/>
        <label>
          <input type="radio" value="1" name="actorGender" required v-model.number="actor.gender">
          Woman
        </label>
      </p>
    </fieldset>
  </form>
</template>

<script>
import { required, integer, between } from 'vuelidate/lib/validators'

export default {
  props: {
    actor: {
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
    actor: {
      name: {
        required,
      },
      age: {
        required,
        integer,
        between: between(3, 99)
      },
    }
  },
}
</script>

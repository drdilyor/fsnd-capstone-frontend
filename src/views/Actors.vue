<template>
  <div class="container">
    <h1>Actors</h1>
    <table class="table table-bordered">
      <thead class="bg-light">
        <tr>
          <th style="width: 3rem">ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th style="width: 0"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="actor in actors" :key="actor.id">
          <td>{{ actor.id }}</td>
          <td>{{ actor.name }}</td>
          <td>{{ actor.age }}</td>
          <td>{{ ['Man', 'Woman'][actor.gender] }}</td>
          <td>
            <button class="btn btn-sm btn-primary" @click="editActor(actor.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() { return {
    actors: [
      {id: 1, name: 'Blah', age: 99, gender: 0}
    ]
  } },
  methods: {
    editActor(id) {
    },
  },
}
</script>

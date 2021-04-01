<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light mb-4"
    >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Casting Agency</router-link>
      <button class="navbar-toggler" type="button" @click="navbarExpand = !navbarExpand">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" :class="{collapse: navbarExpand}" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(link, index) in navbarLinks" :key="index">
            <router-link
              class="nav-link"
              exact-active-class="active"
              :to="link.to"
            >{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() { return {
    navbarLinks: [
      {to: '/actors', name: 'Actors'},
      {to: '/movies', name: 'Movies'},
    ],
    navbarExpand: false,
  } },
}
</script>

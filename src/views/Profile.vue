<template>
  <div class="container">
    <h1>Profile</h1>
    <div v-if="$auth.loggedIn()">
      <p>You are logged in</p>
      <pre style="overflow: auto">{{ $auth.getJwt() }}</pre>
      <p class="btn-group">
        <button @click="$auth.logout(), $forceUpdate()" class="btn btn-lg btn-secondary">Log out</button>
        <button @click="$auth.logoutHard()" class="btn btn-lg btn-outline-secondary">Log out hard</button>
      </p>
    </div>
    <div v-else>
      <p>You aren't logged in currently</p>
      <p><button @click="$auth.login" class="btn btn-lg btn-primary">Login</button></p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const match = this.$route.hash.match(/^#access_token=(.*?)&/)

    if (match) {
      const token = match[1]
      if (token)
        this.$auth.setJwt(token)
    }
    
  }
}
</script>

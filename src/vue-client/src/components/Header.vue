<template>
  <div class="home">
    <img alt="logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'songs',
      });
    },
  },
};
</script>

<style scoped>
.home{
  cursor: pointer;
}

.home:hover {
  color: #E9E;
}
</style>

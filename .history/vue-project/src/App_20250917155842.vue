<template>
  <div class="container" id="app">
    <nav>
      <!-- Add router links for navigation -->
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/carts">Cart({{ cartItemCount }})</router-link> |
      <a href="#" @click.prevent="logout">Logout</a>
      <button @click="logout">Logout</button>

    </nav>
    <button v-on:click="test">Chào mừng</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartItemCount']),
    isLoggedIn() {
      return !!localStorage.getItem('authToken');
    }
  },
  methods: {
    test() {
      console.log('test here');
    },
    logout() {
      console.log('call logout');
      // Clear the token from localStorage or Vuex
      localStorage.removeItem('authToken');

      // Optionally, clear the cart or other user data
      // this.$store.dispatch('clearCart');

      // Redirect to login page
      this.$router.push('/login');
    },
  }

};
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
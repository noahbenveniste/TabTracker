<template>
  <div id="app">
    <v-app>
      <v-card class="flex-column elevation-24 pa-2" tile>
        <v-toolbar-title>New User Registration</v-toolbar-title>
        <v-container fluid>
          <form name="registration-form" autocomplete="off">
            <input type="email" name="email" v-model="email"  placeholder="Email"/>
            <br>
            <input type="password" name="password" v-model="password" autocomplete="new-password" placeholder="Password"/>
            <br>
            <v-btn @click="register">Register</v-btn>
            <br>
            <div class="error" v-html="error"></div>
          </form>
        </v-container>
      </v-card>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {

        const response = await AuthenticationService.register({
          email : this.email,
          password : this.password
        });

        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);

      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>

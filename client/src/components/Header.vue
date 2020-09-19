<!-- eslint-disable -->
<template>
  <v-app-bar fixed color=cyan>
    <v-toolbar-title class=mr-4>
			TabTracker
		</v-toolbar-title>
		<v-toolbar-items>
			<v-btn text dark>Browse</v-btn>
		</v-toolbar-items>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn v-if="!$store.state.isUserLoggedIn" text dark to='/login'>
				Log in
			</v-btn>
		</v-toolbar-items>
		<v-toolbar-items>
			<v-btn v-if="!$store.state.isUserLoggedIn" text dark to='/register'>
				Sign up
			</v-btn>
		</v-toolbar-items>
		<v-toolbar-items>
			<v-btn text dark to='/'>
				Home
			</v-btn>
		</v-toolbar-items>
  </v-app-bar>
</template>

<script>
/* eslint-disable */
export default {
	
}
</script>

<style scoped>
.mr-4 {
	color: white;
}
</style>
<template>
  <div class="app-background">
    <user-profile-card/>
  </div>
</template>

<script>
  import UserProfileCard from './components/UserProfileCard.vue';

  export default {
    components: {
      UserProfileCard,
    },
    methods: {
      fetchUsers(searchTerm) {
        console.log('Fetching users with search term:', searchTerm);
      },
    },
  };
</script>

<style>
  .app-background {
    background-color: #f0f0f0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push('/home')
}
</script>
<template>
  <div class="about-view">
    <nav class="page-nav">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>
    <h1>About This App</h1>
    <p>This is a task management application built with Vue 3, Vue Router, and Pinia.</p>
    <button @click="goHome">← Back to Home</button>
  </div>
</template>
<style scoped>
.about-view {
  width: 100%;
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #EFC7C2;
  margin-bottom: 36px;
}
button {
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background: #35a372;
}
.page-nav { 
  margin-bottom: 20px; 
  display: flex;
  gap: 8px;
}
.page-nav a { 
  color: #42B883; 
  text-decoration: none; 
  font-weight: 600; 
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  width: 50px;
  text-align: center;
}
.page-nav a:hover {
  background: #f0fdf4;
}
.page-nav a.router-link-active {
  background: #42B883;
  color: white;
}
.page-nav a.router-link-exact-active {
  background: #35a372;
  color: white;
}
</style>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../../stores/Day3/taskStore.js'
const router = useRouter()
const taskStore = useTaskStore()
// Calculate statistics
const totalTasks = computed(() => taskStore.tasks.length)
const doneTasks = computed(() => taskStore.tasks.filter(t => t.done).length)
const pendingTasks = computed(() => taskStore.tasks.filter(t => !t.done).length)
function goHome() {
  router.push('/home')
}
</script>
<template>
  <div class="stats-view">
    <nav class="page-nav">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>
    <h1>📊 Task Statistics</h1>
    <div class="stats-grid">
      <div class="stat-card total">
        <div class="stat-number">{{ totalTasks }}</div>
        <div class="stat-label">Total Tasks</div>
      </div>
      <div class="stat-card done">
        <div class="stat-number">{{ doneTasks }}</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-card pending">
        <div class="stat-number">{{ pendingTasks }}</div>
        <div class="stat-label">Pending</div>
      </div>
    </div>
    <button @click="goHome">← Back to Home</button>
  </div>
</template>
<style scoped>
.stats-view {
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
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 6px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  gap: 10px;
}
.stat-card.total {
  border-color: #3B82F6;
}
.stat-card.done {
  border-color: #42B883;
}
.stat-card.pending {
  border-color: #F59E0B;
}
.stat-number {
  font-size: 48px;
  font-weight: bold;
  margin-top: 8px;
}
.stat-card.total .stat-number {
  color: #3B82F6;
}
.stat-card.done .stat-number {
  color: #42B883;
}
.stat-card.pending .stat-number {
  color: #F59E0B;
}
.stat-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
button {
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  display: block;
  margin: 0 auto;
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
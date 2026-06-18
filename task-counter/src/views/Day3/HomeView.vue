<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../../stores/Day3/taskStore.js'

const taskStore = useTaskStore()
const route     = useRoute()

// TODO 1: Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => route.query.error === 'notfound')
</script>

<template>
  <div class="home-view">
    <nav class="page-nav">
      <!-- TODO 3: Add a RouterLink to /about -->
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>
    <h1>📝 My Tasks</h1>

    <!-- TODO 2: Show a warning banner if showErrorBanner is true -->
    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>


    <!-- TODO 4: Render each task as a RouterLink to /task/:id -->
    <!-- Use <RouterLink :to="`/task/${task.id}`"> as the wrapper -->
    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <!-- TODO 5: Wrap this in a RouterLink -->
        <RouterLink :to="`/task/${task.id}`">
          <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-view { 
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
.error-banner { 
  background: #fef3c7; 
  border: 1px solid #f59e0b; 
  border-radius: 6px; 
  padding: 10px 14px; 
  margin-bottom: 16px; 
  color: #92400e; 
  font-size: 14px; 
}
.page-nav { 
  margin-bottom: 20px; 
  display: flex;
  gap: 8px;
}
.page-nav a { 
  color: #FFE5D4; 
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
.task-list { 
  list-style: none; 
  padding: 0; 
  margin: 0 auto;
  max-width: 60%;

}
.task-list li { 
  padding: 12px; 
  background: white; 
  border-radius: 8px; 
  margin-bottom: 8px;
  border: 5px solid #3a832f; 
  cursor: pointer; 
}
.task-list a {
  color: #1f2937;
  text-decoration: none;
  display: block;

}
.task-list li:hover { 
  border-color: #42B883; 
}
.done { 
  text-decoration: line-through; 
  color: #a6a9af; 
}
</style>

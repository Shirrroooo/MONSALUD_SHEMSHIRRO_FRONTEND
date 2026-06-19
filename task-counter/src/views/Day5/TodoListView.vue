<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '../../composables/useFetch'

const filter = ref('done') // 'all' | 'done' | 'pending'

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
const { data: todos, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos')

const filteredTodos = computed(() => {
  if (!todos.value) return [] // still loading
  if (filter.value === 'all') return todos.value.slice(0, 20)
  if (filter.value === 'done') return todos.value.filter(todo => todo.completed)
  if (filter.value === 'pending') return todos.value.filter(todo => !todo.completed)
  return []
})

// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
// const filteredTodos = computed(() => { ... })
</script>

<template>
  <div class="todo-view">
    <h1>📋 Todo List</h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <!-- TODO 3: Show a loading message/spinner while loading is true -->
    <div v-if="loading" class="loading">⏳ Loading todos...</div>
    <!-- TODO 4: Show an error message if error has a value -->
    <div v-if="error" class="error-box">X Error: {{ error }}</div>
    <!-- TODO 5: Show the content block when NOT loading and NO error -->
    <div v-if="!loading && !error" class="content">
      <!-- Filter buttons -->
      <div class="filters">
        <!-- TODO 6: Three buttons — All, Done, Pending -->
        <!-- Each sets filter.value and gets :class="{ active: filter === '...' }" -->
         <button @click="filter = 'all'" :class="{ active: filter === 'all' }">All</button>
         <button @click="filter = 'done'" :class="{ active: filter === 'done' }">Done</button>
         <button @click="filter = 'pending'" :class="{ active: filter === 'pending' }">Pending</button>
      </div>

      <!-- TODO 7: Render filteredTodos using v-for -->
      <ul class="todo-list">
        <!-- li with checkbox (disabled, reflects todo.completed) and title -->
         <li v-for="todo in filteredTodos" :key="todo.id" :class="{ 'done-item': todo.completed }">
          <input type="checkbox" :checked="todo.completed" disabled />
          <span :class="{ 'completed-text': todo.completed }">{{ todo.title }}</span>
        </li>
      </ul>
      <!-- TODO 8: Show count of visible items -->
       <p class="count"> Showing {{ filteredTodos.length }} todos</p>
    </div>
  </div>
</template>

<style scoped>
.todo-view { 
  width: 100%;
  max-width: 520px; 
  margin: 40px auto; 
  padding: 24px; 
  font-family: Arial, sans-serif; 
}
h1 { 
  color: #EFC7C2; 
  margin-bottom: 4px; 
}
.subtitle { 
  color: #9ca3af; 
  font-size: 13px; 
  margin-bottom: 20px;
  margin-top: 20px; 
}
.loading { 
  text-align: center; 
  padding: 48px; 
  color: #42B883; 
  font-size: 16px; 
}
.error-box { 
  background: #fef2f2; 
  border: 1px solid #fca5a5; 
  border-radius: 8px; 
  padding: 16px; 
  color: #dc2626; 
}
.filters {
  margin-bottom: 20px; 
  display: flex;
  gap: 8px;
}
.filters button { 
  color: #FFE5D4; 
  font-weight: 600; 
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 80px;
  text-align: center;
  transition: all 0.2s ease;
  font-size: 13px;
  
}
.filters button:hover {
  background: #f0fdf4;
}
.filters button.active { 
  background: #42B883; 
  color: white; 
}
.todo-list { 
  list-style: none; 
  padding: 0; 
  margin: 0 auto;
  max-width: 100%;
}
.todo-list li { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  padding: 12px; 
  background: white; 
  border-radius: 8px; 
  margin-bottom: 8px;
  border: 5px solid #3a832f;
  font-size: 14px;
  cursor: pointer;
}
.todo-list li:hover { 
  border-color: #42B883;
}
.todo-list li.done-item { 
  opacity: 0.6; 
}
.todo-list li span { 
  flex: 1; 
}
.completed-text { 
  text-decoration: line-through; 
  color: #9ca3af; 
}
.count { 
  font-size: 13px; 
  color: #9ca3af; 
  margin-top: 12px; 
  text-align: right; 
}
</style>

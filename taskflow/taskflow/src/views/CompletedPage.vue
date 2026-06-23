<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed Tasks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Completed</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-padding">
        <h1>✅ Completed Tasks</h1>
        <ion-chip color="success">
          <ion-label>Total: {{ completedTasks.length }}</ion-label>
        </ion-chip>
        <ion-list v-if="completedTasks.length > 0">
          <ion-item v-for="task in completedTasks" :key="task.id" @click="goToTaskDetail(task.id)">
            <ion-checkbox slot="start" :checked="true" disabled />
            <ion-label class="task-done">{{ task.name }}</ion-label>
          </ion-item>
        </ion-list>
        <div v-else class="ion-text-center empty-state">
          <p>No completed tasks yet! 🎯</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonCheckbox, IonChip
} from '@ionic/vue';
const router = useRouter();
const taskStore = useTaskStore();
const completedTasks = computed(() => 
  taskStore.tasks.filter(task => task.done === true)
);
function goToTaskDetail(taskId) {
  router.push(`/tabs/tasks/${taskId}`);
}
</script>
<style scoped>
.task-done {
  text-decoration: line-through;
  color: gray;
}
.empty-state {
  padding: 32px 16px;
  color: #666;
}
</style>
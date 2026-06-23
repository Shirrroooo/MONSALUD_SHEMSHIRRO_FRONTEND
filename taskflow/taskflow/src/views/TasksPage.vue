<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class ="ion-padding">
        <h1>📝 Task Manager</h1>
        <!-- Login -->
         <ion-card v-if="!isLoggedIn">
          <ion-card-content>
            <ion-item>
              <ion-input
                v-model="loginName"
                placeholder="Kindly enter your name to login"
                @keyup.enter="handleLogin"
              />
            </ion-item>
            <ion-button expand="block" @click="handleLogin" class="ion-margin-top">
              Login
            </ion-button>
          </ion-card-content>
         </ion-card>
        <ion-card v-else>
          <ion-card-content class="user-info">
            <p>Welcome, {{ currentUser }}!</p>
            <ion-button expand="block" color="danger" @click="handleLogout">
              Logout
            </ion-button>
          </ion-card-content>
        </ion-card>
        <!-- Stats -->
        <div class="stats-container">
          <ion-chip color="primary">
            <ion-label>Total: {{ totalCount }}</ion-label>
          </ion-chip>
          <ion-chip color="success">
            <ion-label>Completed: {{ doneCount }}</ion-label>
          </ion-chip>
          <ion-chip color="warning">
            <ion-label>Pending: {{ pendingCount }}</ion-label>
          </ion-chip>
        </div>
        <!-- Add Task -->
        <ion-card>
          <ion-card-content>
            <ion-item>
              <ion-input
                v-model="newTaskName"
                placeholder="Enter a new task"
              />
            </ion-item>
            <ion-button  @click="handleAdd" class="ion-margin-top">
              Add Task
          </ion-button>
          </ion-card-content>
        </ion-card>
        <!-- Task List -->
        <ion-list v-if ="totalCount > 0">
          <ion-item v-for="task in tasks" :key="task.id" @click="goToTaskDetail(task.id)">
            <ion-checkbox
            slot="start"
            :checked="task.done"
            @ionChange="toggleTask(task.id)"
            @click.stop
            />
            <ion-label :class="{ 'task-done': task.done }">{{ task.name }}</ion-label>
            <ion-button
              slot="end"
              fill="clear"
              color="danger"
             @click.stop="removeTask(task.id)"
            >
              <ion-icon :icon="trashOutline" />
            </ion-button>
          </ion-item>
        </ion-list>
          <div v-else class="ion-text-center empty-state">
            <p>Tulugan time!</p>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonItem, IonInput,
  IonChip, IonLabel, IonList, IonCheckbox, IonButton, IonIcon
} from '@ionic/vue';
import { trashOutline } from 'ionicons/icons'
// import ExploreContainer from '@/components/ExploreContainer.vue';
const taskStore = useTaskStore();
const userStore = useUserStore();
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(taskStore);
const { addTask, toggleTask, removeTask } = taskStore;
const newTaskName = ref('');
const loginName = ref('');
const { isLoggedIn, currentUser } = storeToRefs(userStore);
const router = useRouter();
const goToTaskDetail = (taskId) => {
  router.push(`/tabs/tasks/${taskId}`);
};

function handleAdd(){
  addTask(newTaskName.value);
  newTaskName.value = '';
}
function handleLogin() {
  if (loginName.value.trim() !== '') {
    userStore.login(loginName.value);
    loginName.value = '';
  }
}
function handleLogout() {
  userStore.logout();
}
</script>

<style scoped>
.stats-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.task-done {
  text-decoration: line-through;
  color: gray;
}
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.empty-state {
  padding: 32px 16px;
  color: #666;
}
</style>

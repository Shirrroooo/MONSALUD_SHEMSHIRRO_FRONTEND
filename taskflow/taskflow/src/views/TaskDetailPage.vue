<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/tabs/tasks"></ion-back-button>
                </ion-buttons>
                <ion-title>Task Details</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen="true">
            <div class="ion-padding">
                <p>ID: {{ route.params.id }}</p>
                <ion-card v-if="task">
                    <ion-card-header>
                        <ion-card-title>{{ task.name }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item>
                                <ion-label>
                                    <h3>Task Name</h3>
                                    <p>{{ task.name }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h3>Task ID</h3>
                                    <p>{{ task.id }}</p>
                                </ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>
                                    <h3>Task Status</h3>
                                    <p>{{ task.done ? '✅ Completed' : '⏳ Pending' }}</p>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                        <div v-if="task.photo" class="photo-container">
                            <h3>Task Photo</h3>
                            <ion-img :src="task.photo" alt="Task Photo" />
                        </div>
                        <ion-button expand="block" @click="takePhoto" class="ion-margin-top">
                            <ion-icon slot="start" :icon="cameraOutline" />
                            Add Photo
                        </ion-button>
                    </ion-card-content>
                </ion-card>
                <div v-else class="ion-text-center empty-state">
                    <p>Task not found</p>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { trashOutline, cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonLabel, IonList, IonItem, IonButton, IonIcon
} from '@ionic/vue';

const route = useRoute();
const taskStore = useTaskStore();
const task = computed(() =>
    taskStore.tasks.find(t => t.id === Number(route.params.id))
);

const takePhoto = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    console.log('Photo captured:', photo.webPath);
    if (photo.webPath && task.value) {
      taskStore.addPhotoToTask(task.value.id, photo.webPath);
      console.log('Photo added to task:', task.value.id, photo.webPath);
    }
  } catch (error) {
    console.log('Photo cancelled or error:', error);
  }
}
</script>
<style scoped>
.empty-state {
    padding: 32px 16px;
    color: #666;
}
ion-img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 8px;
}
</style>
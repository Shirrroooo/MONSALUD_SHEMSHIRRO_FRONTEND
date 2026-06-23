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
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonChip, IonLabel
} from '@ionic/vue';

const route = useRoute();
const taskStore = useTaskStore();
const task = computed(() =>
    taskStore.tasks.find(t => t.id === Number(route.params.id))
);
</script>
<style>

</style>
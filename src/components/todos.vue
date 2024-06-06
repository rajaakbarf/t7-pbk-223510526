<template>
  <div class="todo-app">
    <slot name="header">
      <h1>Daftar Kegiatan</h1>
    </slot>

    <!-- Form untuk menambahkan kegiatan baru -->
    <form @submit.prevent="addActivity(newActivity)">
      <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan baru">
      <button type="submit">Tambah</button>
    </form>

    <!-- Daftar kegiatan -->
    <ul class="activities-list">
      <li v-for="activity in filteredActivities" :key="activity.id">
        <input type="checkbox" v-model="activity.completed">
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <button @click="removeActivity(activity.id)">Hapus</button>
      </li>
    </ul>
    
    <!-- Filter kegiatan yang belum selesai -->
    <label>
      <input type="checkbox" v-model="showIncompleteOnly">
      Tampilkan yang belum selesai saja
    </label>

    <!-- Menampilkan jumlah kegiatan yang belum selesai -->
    <p>Jumlah kegiatan yang belum selesai: {{ incompleteCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const store = useTodoStore();
const newActivity = ref('');
const showIncompleteOnly = ref(false);

const addActivity = (name) => {
  if (name.trim() !== '') {
    store.addActivity(name);
    newActivity.value = '';
  }
};

const removeActivity = (id) => {
  store.removeActivity(id);
};

const filteredActivities = computed(() => {
  if (showIncompleteOnly.value) {
    return store.activities.filter(activity => !activity.completed);
  } else {
    return store.activities;
  }
});

const incompleteCount = computed(() => store.incompleteCount);
</script>

<style scoped>
/* CSS untuk komponen TodoApp */
.todo-app {
  max-width: 400px;
  margin: 20px auto; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; 
}

/* CSS untuk teks kegiatan yang selesai */
.activities-list li .completed {
  text-decoration: line-through;
  color: #888;
}

/* Gaya CSS untuk form */
form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  outline: none;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #66bb6a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #4caf50;
}

/* CSS untuk daftar kegiatan */
.activities-list {
  list-style-type: none;
  padding: 0;
}

.activities-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.activities-list li:last-child {
  border-bottom: none;
}

.activities-list li input[type="checkbox"] {
  margin-right: 10px;
}

.activities-list li .activity-name {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.activities-list li button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #ff6666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activities-list li button:hover {
  background-color: #cc0000;
}
</style>

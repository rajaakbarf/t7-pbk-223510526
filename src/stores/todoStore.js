import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
  const activities = ref([
    { id: 1, name: 'Makan siang', completed: false },
    { id: 2, name: 'Belajar VueJS', completed: false }
  ]);

  const addActivity = (name) => {
    activities.value.push({ id: Date.now(), name, completed: false });
  };

  const removeActivity = (id) => {
    activities.value = activities.value.filter(activity => activity.id !== id);
  };

  const incompleteCount = computed(() => {
    return activities.value.filter(activity => !activity.completed).length;
  });

  return { activities, addActivity, removeActivity, incompleteCount };
});

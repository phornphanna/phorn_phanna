import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';


export const useTaskStore = defineStore('task', {
  state: () => ({
    vueValidation: null,
    modalAdd: null,
    modalEdit: null,
    modalConfirmDelete: null,
    search: ref(''),
    id: ref(),
    loading: ref(false),
    tasks: ref([]),
    isNetworkError: false,
    taskDetail: {
      title: '',
      completed: false,
      due_date: ''
    }

  }),
  actions: {

    async fetchTask() {
      this.isLoading = true
      try {
        const res = await axios.get(
          `/api/tasks?search=${this.search}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.data.result) {
          this.tasks = res.data.data;
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          alert('internet error')
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isLoading = false;
      }
    },

    async createTask(data) {
      this.isLoading = true;
      try {
        const res = await axios.post(
          '/api/tasks',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.data.result) {
          toast.success('Task Create successful!');
          this.fetchTask();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          this.isNetworkError = true;
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isNetworkError = false;
        this.isLoading = false;
      }
    },

    async  fetchTaskDetail() {

      this.isLoading = true;
      try {
        const res = await axios.get(`/api/tasks/${this.id}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.data.result) {
          this.taskDetail.id = res.data.data.id;
          this.taskDetail.title = res.data.data.title;
          this.taskDetail.completed = res.data.data.completed == 0 ? false : true;
          this.taskDetail.due_date = res.data.data.due_date;

        } else {
          throw new Error('Task not found');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          this.isNetworkError = true;
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isNetworkError = false;
        this.isLoading = false;
      }
    },

    async updateTask(data) {
      console.log(data);
      this.isLoading = true;
      try {
        const res = await axios.put(
          `/api/tasks/${data.id}`,
          {
            title: data.title,
            completed:data.completed,
            due_date:data.due_date 
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.data.result) {
          toast.success('Task Update successful!');
          this.fetchTask();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          this.isNetworkError = true;
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isNetworkError = false;
        this.isLoading = false;
      }
    },


    async updateTaskStatus(data) {
      this.isLoading = true;
      try {
        const res = await axios.put(
          `/api/tasks/status/${data.id}`,
          {
            completed: data.completed,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.data.result) {
          toast.success('Complete  Task successful!');
          this.fetchTask();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          this.isNetworkError = true;
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isNetworkError = false;
        this.isLoading = false;
      }
      },

    async deleteTask(id) {

      this.isLoading = true;
      try {
        const res = await axios.delete(`/api/tasks/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (res.data.result) {
          toast.success('Delete Task successful!');
          this.fetchTask();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          this.isNetworkError = true;
          throw new Error('Network error: Unable to reach the server');
        } else {
          throw error;
        }
      } finally {
        this.isNetworkError = false;
        this.isLoading = false;
      }
    },

  }

})
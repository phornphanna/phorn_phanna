<template>

<div class="modal fade" id="modalEdit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="" id="editForm"
        @submit.prevent="onHandleEditTask()"
        >
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" 
                        :class="{ 'is-invalid': taskStore.vueValidation.title.$error }"

             v-model="taskStore.taskDetail.title"
            >
             <div class="invalid-feedback message-error" v-if="taskStore.vueValidation.title.$error">
                                    {{ taskStore.vueValidation.title.$errors[0]?.$message }}
                                </div>
          </div>
         
          <div class="mb-3">
            <label for="due_date" class="form-label">Due Date</label>
            <input type="datetime-local" class="form-control" id="due_date" name="due_date"
             :class="{ 'is-invalid': taskStore.vueValidation.due_date.$error }"
              v-model="formattedDueDate"
            >
             <div class="invalid-feedback message-error" v-if="taskStore.vueValidation.due_date.$error">
                                    {{ taskStore.vueValidation.due_date.$errors[0]?.$message }}
                                </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary"  form="editForm"    >Update</button>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>

import { onMounted  , ref  ,  computed , reactive} from "vue";
import {Modal} from "bootstrap";
import {useTaskStore} from "@/stores/task";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength,  maxLength , helpers } from '@vuelidate/validators';
import moment from 'moment';
const taskStore = useTaskStore();
const isBtn = ref(true);



onMounted(() => {
    taskStore.modalEdit  = Modal.getOrCreateInstance(document.getElementById('modalEdit'));  
});

const formattedDueDate = computed({
  get: () => {
    if (!taskStore.taskDetail?.due_date) return '';
    return moment(taskStore.taskDetail.due_date).format('YYYY-MM-DDTHH:mm');
  },
  set: (value) => {
    // Just store the plain value back — don't format here
    taskStore.taskDetail.due_date = value;
  }
});



  



const rules = computed(() => ({
  title: {
        required: helpers.withMessage("title required", required),
        maxLength: helpers.withMessage("title limited 255 char", maxLength(255)),
    },
    due_date: {
        required: helpers.withMessage("date  required", required),
    }
}));
taskStore.vueValidation = useVuelidate(rules, taskStore.taskDetail);

const onHandleEditTask = async () => {
  const isValid = await taskStore.vueValidation.$validate();
  if (!isValid) return;

  try {
    await taskStore.updateTask({
      id: taskStore.taskDetail.id,
      title: taskStore.taskDetail.title,
      completed: taskStore.taskDetail.completed,
 due_date: moment(taskStore.taskDetail.due_date).format("YYYY-MM-DD HH:mm:ss")});

    // Reset form
    taskStore.taskDetail.title = '';
    taskStore.taskDetail.due_date = '';
    taskStore.taskDetail.completed = false;
    taskStore.vueValidation.$reset();
    taskStore.modalEdit.hide();

  } catch (error) {
    console.log(error.message);
  }
};

  


</script>
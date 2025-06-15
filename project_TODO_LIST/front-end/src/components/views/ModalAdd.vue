<template>

<div class="modal fade" id="modalAdd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add New Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="" id="addForm" 
        @submit.prevent="onHandleAddTask"
        >
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" 
            :class="{ 'is-invalid': taskStore.vueValidation.title.$error }"
            v-model="data.title"
            >
             <div class="invalid-feedback message-error" v-if="taskStore.vueValidation.title.$error">
                                    {{ taskStore.vueValidation.title.$errors[0]?.$message }}
                                </div>
          </div>
        
          <div class="mb-3">
            <label for="due_date" class="form-label">Due Date</label>
            <input type="datetime-local" class="form-control" id="due_date" name="due_date" 
            :class="{ 'is-invalid': taskStore.vueValidation.due_date.$error }"
             v-model="data.due_date"
            >
             <div class="invalid-feedback message-error" v-if="taskStore.vueValidation.due_date.$error">
                                    {{ taskStore.vueValidation.due_date.$errors[0]?.$message }}
                                </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" form="addForm" >Add</button>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>

import { onMounted , reactive , computed } from "vue";
import {Modal} from "bootstrap";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength,  maxLength , helpers } from '@vuelidate/validators';
import {useTaskStore} from "@/stores/task";
const taskStore = useTaskStore();
const data = reactive({
    title: '',
    completed: false,
    due_date: ''
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
taskStore.vueValidation = useVuelidate(rules, data);

onMounted(() => {
    taskStore.modalAdd = Modal.getOrCreateInstance(document.getElementById('modalAdd'));  
});




const onHandleAddTask =  async () => {
      const isValid = await taskStore.vueValidation.$validate();
    if (!isValid) {
        return;
    }

    
    try{
    await taskStore.createTask(data);
     data.title ='';
     data.due_date ='';
     taskStore.vueValidation.$reset();
    taskStore.modalAdd.hide();
    }catch(error){
      console.log(error.message);
    }
}
  


</script>
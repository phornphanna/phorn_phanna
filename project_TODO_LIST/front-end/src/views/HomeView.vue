<script setup></script>

<template>
  <div class="container-fluid px-0">
    <div class="row mx-0">
      <div class="col-12 px-0">
        <div class="hero-banner">
          <div class="card-form card p-0 bg-transparent border-0 row ">
            <div class="card-body p-0 col-12 col-md-9 col-lg-8 col-xl-6 mx-auto d-flex flex-column gap-4">
              <h1>MY TASKS</h1>

              <form action="">
                <div class="input-group mb-3">
                  <input type="text" class="form-control py-3" placeholder="Search..." v-model="taskStore.search"
                    @input="onSearch" />
                  <span class="input-group-text bg-primary text-white  cursor-pointer" @click="onOpenModalAdd">New
                    Task</span>
                </div>
              </form>

              <!-- <div>
                   <ul class="list-filter list-unstyled d-flex gap-3">
                     <li class="bg-primary">
                        All
                    </li>
                    <li class="bg-success">
                      Completed
                    </li>
                     <li class="bg-warning">
                      Uncompelete
                    </li>
                    <li class="bg-danger">
                      Close
                    </li>
                   </ul>
                </div> -->

              <div class="card border-0 shadow">
                <div class="card-body">

                  <ul class="list-unstyled">
                    <li class="d-flex justify-content-between mb-3">
                      <span class="text-primary"> {{ taskStore.tasks?.length }} task</span>
                    </li>

                    <li v-if="taskStore.tasks?.length > 0 && taskStore.isLoading == false"
                      class="d-flex justify-content-between  py-3 border-bottom" v-for="task in taskStore.tasks">
                   
                       <div class="d-flex flex-column gap-2">
                         <span class="text-muted fs-9">Date-line : {{ formatDate(task.due_date) }}</span>

                      <div class="form-check ">
                        <input class="form-check-input" type="checkbox" value="" :checked="task.completed"
                         @change="onHandleCheck(task.id, $event.target.checked)"
                        >

                        <label for="" class="fw-semibold">
                          {{ task.title }}
                        </label>
                      </div>
                       </div>
                      
                        <div class="d-flex align-items-center">
                          <span class="cursor-pointer" @click="onOpenModalEdit(task.id)"><i
                              class="bi bi-pencil-square fs-5 me-3 text-warning"></i></span>
                          <span class="cursor-pointer" @click="onOpenModalConfirm(task.id)"><i
                              class="bi bi-trash fs-5 text-danger"></i></span>
                      </div>
                    </li>

                    <li v-if="taskStore.tasks?.length == 0 && taskStore.isLoading == false" class="list-unstyle">
                      <h5 class="text-center text-muted">No Task Found</h5>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Loading v-if="taskStore.isLoading && taskStore.tasks?.length > 20"  />

  <NetworkError v-if="taskStore.isNetworkError" />

  <ModalAdd />
  <ModalEdit />
  <ModalConfirm />

</template>



<script setup>

import ModalAdd from '@/components/views/ModalAdd.vue';
import ModalEdit from '@/components/views/ModalEdit.vue';
import ModalConfirm from '@/components/views/ModalConfirm.vue';
import Loading from '@/components/Layouts/Loading.vue';
import NetworkError from '@/components/Layouts/NetworkError.vue';
import {useTaskStore } from '@/stores/task';
import {ref , onMounted , computed} from 'vue';
import moment from 'moment'; 
const taskStore = useTaskStore();


const formatDate = (date) => {
  if (!date) return 'No date set';
  return moment(date).format('MMM D, YYYY, h:mm A');
};
onMounted(() => {
    taskStore.fetchTask();
});

const onSearch = () => {
    taskStore.fetchTask();
}

const onOpenModalAdd = () => {
 taskStore.modalAdd.show();
}

const onOpenModalEdit = async (id) => {
 taskStore.id = id;
 await taskStore.fetchTaskDetail();
 taskStore.modalEdit.show();
}

const onHandleCheck = (id, completed) => {
  taskStore.updateTaskStatus({ id, completed });
}

const onOpenModalConfirm = (id) => {
 taskStore.id = id;
 taskStore.modalConfirm.show();
}


  
</script>
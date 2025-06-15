<template>

    <div class="modal fade" id="modalConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content p-2">

                <div class="modal-header fs-5">
                     <h3 class="">Are you sure ? </h3>
                </div>

                <div class="modal-body d-flex flex-column gap-3">
                
                       <p>This action cannot be undone. this will permanently delete the task and remove from your account
                        and remove your data from our server.</p>

                    <div class="d-flex justify-content-end gap-3">
                        <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">No ,
                            Cancle</button>
                        <button type="button" class="btn btn-danger"
                        @click="onHandleDelete()"
                        >Yes, Delete</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>

import { onMounted } from "vue";
import { Modal } from "bootstrap";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.modalConfirm = Modal.getOrCreateInstance(document.getElementById('modalConfirm'));
});

const onHandleDelete = () => {
    taskStore.deleteTask(taskStore.id);
    taskStore.id = null;
    taskStore.modalConfirm.hide();
}


</script>
<script setup>
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

const dragging = ref(false);

function dragEnterHandler(){
  //console.log("Dragging over!");
  dragging.value = true;
 }

// Define vue emit event
const emit = defineEmits(['files-dropped']);

// handle dropping a single file abd emit to parent
function dropHandler(e) {

  //if(allowedFiletypes.value.includes(e.dataTransfer.files[0].type) || e.dataTransfer.files[0].name.split(".")[1] === "nc"){
  emit('files-dropped', e.dataTransfer.files);
  //}else{
  //  throw console.error("Not an allowed filetype");
  //}
  dragging.value = false;
    
}

// prevent default prowser behaviour
function preventDefaults(e) {
    e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']


onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})


//--------------------

function dragLeaveHandler(){
  //console.log("leaving");
  dragging.value = false;
}

</script>

<template>
  <div id="drop_zone" class="container" :class="{ drag: dragging }" @drop.prevent="dropHandler" @dragenter.prevent="dragEnterHandler" @dragleave.prevent="dragLeaveHandler">
    Drag and drop files here
  </div>
</template>

<style scoped>
    .container {
        max-width: 600px;
        margin: 30px auto;
        overflow: auto;
        min-height: 300px;
        border: 1px solid var(--color-text);
        padding: 30px;
        border-radius: 5px;
        text-align:center;
        opacity: 0.8;
        opacity: 0.8;
        padding: 7em 0;
        font-size: 1.5em;
    }

    .container.drag {
      background-color: var(--hover-bg-color);
      box-shadow: inset 0px 0px 0px 2px rgb(133, 133, 133);
    }

</style>
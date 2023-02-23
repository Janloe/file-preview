<script setup>

import { parse } from "@vue/compiler-dom";
import { NetCDFReader }  from "netcdfjs";
import { watchEffect, ref, onMounted, onUnmounted } from "vue";
  const props = defineProps({
    fileToDisplay: File
  })

  const emit = defineEmits(['file-deleted'])

  const filecontent = ref("");

  const filetype = ref("");

  const parser = ref(null);

  const reader = new FileReader();
  reader.onload = function(e) {
    const type = props.fileToDisplay.type;
    switch (type) {
      case 'image/bmp':
        break;
      case 'image/gif':

        break;
      case 'image/jpeg':
        break;
      case 'image/png':
        break;
      case 'image/svg+xml':
        break;
      case 'image/tiff':
        break;
      case 'image/webp':
        break;
      case 'text/css':
        break;
      case 'text/xml':
        //parser.value = new DOMParser()
        //var tempFileContent = e.target.result;
        //filecontent.value = parser.value.parseFromString(tempFileContent, "text/xml");
        filecontent.value = e.target.result;
        filetype.value = type;
        break;
      case 'application/vnd.ms-excel':
        filecontent.value = e.target.result.split("\n");
        filetype.value = type;
        break;
      case 'text/csv':
        filecontent.value = e.target.result.split("\n");
        filetype.value = type;
        break;
      case 'text/html':
        parser.value = new DOMParser()
        var tempFileContent = e.target.result;
        //filecontent.value = parser.value.parseFromString(tempFileContent, "text/html").textContent;
        filecontent.value = tempFileContent;
        filetype.value = type;
        break;
      case 'text/plain':
        filecontent.value = e.target.result;
        filetype.value = type;
        break;    
      case 'application/json':
        filecontent.value = e.target.result;
        filetype.value = type;
        break;
      case 'application/ld+json':
        filecontent.value = e.target.result;
        filetype.value = type;
        break;
      case 'application/xml':
        parser.value = new DOMParser()
        var tempFileContent = e.target.result;
        filecontent.value = parser.value.parseFromString(tempFileContent, "text/xml");
        filetype.value = type;
        break;
    }
 
  }
  reader.readAsText(props.fileToDisplay);

  function deleteItem(e){
    emit('file-deleted', props.fileToDisplay);
  }

  // prevent default prowser behaviour
function preventDefaults(e) {
    e.preventDefault()
}

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

const events = ['click']

</script>

<template>
  
  <div class="fileview">
    <h2>{{fileToDisplay.name}} <button class="x-button" @click="deleteItem">X</button> </h2>  
                                                     
    <div  id="file_content_zone" class="container">
   
    <div class="text-in-container">
      <p v-if="filetype === 'application/vnd.ms-excel' || filetype === 'text/csv'" v-for="(l,i) in filecontent">{{ i }} : {{ l }} </p>
<pre :class="{ code : filetype === 'application/json' }" v-else>
{{ filecontent }}
</pre>
  </div>
  </div>
  </div>
  
</template>

<style scoped>
    .container {
        border: 1px solid var(--color-text);
        border-radius: 5px;
        opacity: 0.8;
        opacity: 0.8;
        padding: 2em 2em;
        font-size: 1.5em;
        display: flex;
        flex: 0 0 0 100%;overflow: break-word;
      }

    .text-in-container {
      font-size: 0.8em;
      overflow-wrap: break-word;
      overflow: scroll;
    }

    .fileview{
      flex-direction: column;
      align-content: center;
      grid-column: span 2;
      
    }
    pre > p {
      padding: 0.5em;
      
    }

    .code{
      color: rgb(245, 86, 86);
    }

    .x-button {
      background-color: rgba(255, 3, 3, 0.459);
      color: var(--color-text);
      border-radius: 6px;
      text-align: center;
      font-weight: bold;
    }
</style>
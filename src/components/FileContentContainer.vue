<script setup>

import { ref, onMounted, onUnmounted } from "vue";
  
const props = defineProps({
    fileToDisplay: Object
  })

  const emit = defineEmits(['file-deleted'])

  const filecontent = ref("");

  const filetype = ref("");

  const imageFileURL = ref(null);

  const parser = ref(null);

  const reader = new FileReader();
  reader.onload = function(e) {
    const type = props.fileToDisplay.file.type;
    switch (type) {
      case 'image/bmp':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/gif':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/jpeg':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/png': 
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/svg+xml':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/tiff':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'image/webp':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;  
      case 'text/css':
        filecontent.value = e.target.result;
        filetype.value = type;
        break;
      case 'text/xml':
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
      case 'application/pdf':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'application/ld+json':
        filecontent.value = e.target.result;
        filetype.value = type;
        break;
      case 'application/xml':
        parser.value = new DOMParser()
        var tempFileContent = e.target.result;
        filecontent.value = tempFileContent;
        filetype.value = type;
        break;
      case 'video/x-matroska':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
      case 'video/mp4':
        imageFileURL.value = generateURL(props.fileToDisplay.file);
        filetype.value = type;
        break;
    }
 
  }
  props.fileToDisplay.file.type.split("/")[0] === 'image' ? reader.readAsDataURL(props.fileToDisplay.file) : reader.readAsText(props.fileToDisplay.file);

  function generateURL(file){
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000)
    return fileSrc;
  }

  function deleteItem(e){
    emit('file-deleted', e);
  }

  // prevent default prowser behaviour
function preventDefaults(e) {
    e.preventDefault()
  }

const events = ['click']
  
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

</script>

<template>
  
  <div class="fileview">
    <h2>{{fileToDisplay.file.name}} <button class="x-button" @click="deleteItem(fileToDisplay.id)">X</button> </h2>                                                     
    <div  id="file_content_zone" class="container">
      <div v-if="filetype === 'application/vnd.ms-excel' || filetype === 'text/csv'" class="text-in-container">
        <p  v-for="(l, i) in filecontent" :key="fileToDisplay.id">{{ i }} : {{ l }} </p>
      </div>
      <div v-else-if="filetype === 'image/png' || filetype === 'image/jpeg'  || filetype === 'image/webp' || filetype === 'image/gif'" class="image-container">
        <img :src="generateURL(fileToDisplay.file)"/>
      </div>
      <div v-else-if="filetype === 'image/svg+xml'" class="image-container">
        <img :src="generateURL(fileToDisplay.file)" width="250" height="250"/>
      </div>
      <div v-else-if="filetype === 'application/pdf'" class="image-container">
        <embed :src="generateURL(fileToDisplay.file)" width="100%" height="1000"/>
      </div>
      <div v-else-if="filetype === 'video/x-matroska' || filetype === 'video/mp4'" class="image-container">
        <video width="320" height="240" controls class="image-container">
        <source :src="generateURL(fileToDisplay.file)" type="video/mp4" controls>
        <source :src="generateURL(fileToDisplay.file)" type="video/webm" controls>
        Your browser does not support the video tag.
      </video> 
      </div>
      <div v-else class="text-in-container">
<pre :class="{ code : filetype === 'application/json' }">
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
        flex: 0 0 0 100%;
        overflow: break-word;
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
      /* color: rgb(245, 86, 86); */
      color: var(--color-text);
    }

    .x-button {
      background-color: rgba(255, 3, 3, 0.459);
      color: var(--color-text);
      border-radius: 6px;
      text-align: center;
      font-weight: bold;
    }

    .image-container{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
    
    img{
      width: 75%;
    }
</style>
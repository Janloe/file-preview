<script setup>
import FileContainer from "../components/FileContainer.vue";
import FileContentContainer from "../components/FileContentContainer.vue";
import { ref } from "vue";

const files = ref([]);

async function onDropped(droppedFile) {
  files.value = [...files.value, ...Array.from(droppedFile)];
  //console.log("From parent", files.value);

  console.log(files.value);
}

function deleteFile(file){
  files.value.map((e, i) => {
    if(e === file){
      files.value.splice(i, 1);
    }
      
  })
  
}

</script>

<template>
  <main>
    <FileContainer @files-dropped="onDropped"/>
  </main>
  <FileContentContainer @file-deleted="deleteFile" v-for="file in files" :fileToDisplay="file"/>
</template>

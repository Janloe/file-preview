<script setup>
import FileContainer from "../components/FileContainer.vue";
import FileContentContainer from "../components/FileContentContainer.vue";
import { ref } from "vue";

const files = ref([]);

const fileIDCounter = ref(0)

async function onDropped(droppedFile) {
  //files.value = [...files.value, ...Array.from(droppedFile)];

  Array.from(droppedFile).map((f) =>{
    fileIDCounter.value++;
    files.value.push({'file': f, 'id': fileIDCounter.value})
  })
}

function deleteFile(id){
/*   files.value.map((e, i) => {
    if(e.id === id){
      files.value.splice(i, 1);
    }
  })
  */
  files.value = files.value.filter((v,i) => {
    return v.id != id;
  })
}

</script>

<template>
  <main>
    <FileContainer @files-dropped="onDropped"/>
  </main>
  <FileContentContainer  @file-deleted="deleteFile" v-for="file in files" :fileToDisplay="file" :key="file.id"/>
</template>

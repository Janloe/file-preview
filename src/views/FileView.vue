<script setup>
import FileContainer from "../components/FileContainer.vue";
import FileContentContainer from "../components/FileContentContainer.vue";
import { ref } from "vue";

const files = ref(null);

async function onDropped(droppedFile) {
  files.value = droppedFile;
  //console.log("From parent", files.value);
}

</script>

<template>
  <main>
    <FileContainer @files-dropped="onDropped"/>
  </main>
  <FileContentContainer v-for="file in files" :fileToDisplay="file"/>
</template>

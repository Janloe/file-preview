<script setup>
import FileContainer from "../components/FileContainer.vue";
import FileContentContainer from "../components/FileContentContainer.vue";
import EncodingsDropDown from "../components/EncodingsDropDown.vue";
import ButtonComponent from '@/components/ButtonComponent.vue';
import { EncodingService } from "../../services/encodingService.js";

import { ref, onUpdated } from "vue";


const ncChoise = ref("")
const files = ref([]);
const fileIDCounter = ref(0)
const prosessedFile = ref("");
const choiseSet = ref(false);

onUpdated(() => {
  // text content should be the same as current `count.value`
  console.log("Result:", prosessedFile)
})

async function onDropped(droppedFile) {
  Array.from(droppedFile).map((f) =>{
    fileIDCounter.value++;
    files.value.push({'file': f, 'id': fileIDCounter.value})
  })
}

function deleteFile(id){
  files.value = files.value.filter((v,i) => {
    return v.id != id;
  })
}
//TODO: Fix object sent from encodingsdropdown
function setEncodingInfo(choise){
    ncChoise.value = choise;
    choiseSet.value = true;
}

async function sendFileForProcessing(file, choise){
  console.log(choise)
  var data = new FormData();
  data.append('file',file[0]["file"]);
  data.append('choise', choise);
  //console.log("Frontend file:", file[0]["file"])
  //console.log("Frontend encoding:", enc.value)
  prosessedFile.value = await EncodingService.checkEncoding(data);
}

</script>

<template>
  <main>
    <FileContainer @files-dropped="onDropped"/>
    {{ "Filenames: " }}<span v-for="file in files">{{ file["file"].name}}</span>
    <EncodingsDropDown @encoding-chosen="setEncodingInfo"/>
    <ButtonComponent @submit="sendFileForProcessing(files, ncChoise)" label="Process file" color="#04d9ffff" v-if="(choiseSet && files[0] )"/>
    <pre>{{ prosessedFile }}</pre>
  </main>
</template>

<style scoped>
  span{
    padding: 20px 20px 20px 20px;
  }
</style>
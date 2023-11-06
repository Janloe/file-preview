<script setup>
import FileContainer from "../components/FileContainer.vue";
import FileContentContainer from "../components/FileContentContainer.vue";
import EncodingsDropDown from "../components/EncodingsDropDown.vue";

import { ref } from "vue";



const files = ref([]);
const aliases = ref('')
const languages = ref('')
const fileIDCounter = ref(0)

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

function setEncodingInfo(chosenEncoding){
    aliases.value = chosenEncoding['aliases'].length == 0 ? 'None' : chosenEncoding['aliases'].join(", ");
    languages.value = chosenEncoding['languages'] == 0 ? 'None' : chosenEncoding['languages'].join(", ");
}

</script>

<template>
  <main>
    <FileContainer @files-dropped="onDropped"/>
    <EncodingsDropDown @encoding-chosen="setEncodingInfo"/>
    <p>Aliases: {{ aliases }}</p>
    <p>Languages: {{ languages }}</p>
  </main>
</template>


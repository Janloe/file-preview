<script setup>
import json from '../json/data.json';
import { ref } from "vue";

const emit = defineEmits(['encoding-chosen'])

const encodings =  ref(json);

function setEncodingInfo(e){

    emit('encoding-chosen', e)
}

</script>

<template>
    <form action=''>
        <label for='encodings'>Encoding: </label>
            <select name='encodings' id='encodings'>
                <option @click="setEncodingInfo(encodings[encoding])" v-for='encoding in Object.keys(encodings)'>{{ encoding }}</option>
            </select>
    </form>
</template>

<style scoped>

</style>
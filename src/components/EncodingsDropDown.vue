<script setup>
import json from '../json/data.json';
import { ref } from "vue";

const emit = defineEmits(['encoding-chosen'])

const ncChoice =  ref(["dimensions", "attributes", "variables", "complete"]);

function setEncodingInfo(choice){
    //console.log("c", codec);
    //console.log("e", encoding);
    emit('encoding-chosen', choice)
}

</script>

<template>
    <form action=''>
        <label for='displayChoice'>NetCDF-data: </label>
            <select name='dicplayChoice' id='displayChoice'>
                <option value="" selected disabled hidden>Choose what to display</option>
                <option @click="setEncodingInfo(choice)" v-for='choice in ncChoice'>{{ choice }}</option>
            </select>
    </form>
</template>

<style scoped>

</style>
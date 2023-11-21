<template>
    <button class="btn" :style="{ background: color}" @click="onClick">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    label: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: "blue"
    }
  },
  methods: {
    onClick(e: Event){
      this.$emit('submit', (e.target as HTMLButtonElement));
    }
  },
  
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn{
        border-radius: 10%;
        
    }
</style>
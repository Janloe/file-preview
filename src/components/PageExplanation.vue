<script setup>
import ExplanationItem from "./ExplanationItem.vue";
import IconFile from './icons/IconFile.vue'
import IconFileDrag from './icons/IconFileDrag.vue';
import IconFileEye from './icons/IconFileEye.vue';
</script>

<template>
  <ExplanationItem>
    <template #icon>
      <IconFile />
    </template>
    <template #heading>File Preview</template>
      This is a page for previewing different content files. 
      The alternative files supported as of now are 
      <a href="https://fileinfo.com/extension/txt">plain text</a>,
      <a href="https://en.wikipedia.org/wiki/Comma-separated_values">CSV</a>,
      <a href="https://www.w3.org/standards/xml/core">XML</a>and
      <a href="https://html.com/">HTML</a>.
      
  </ExplanationItem>
  <ExplanationItem>
    <template #icon>
      <IconFileDrag />
    </template>
    <template #heading>How to</template>
      Go to "File View" in the menu to the left, and drop a file in the indicated box. 
  </ExplanationItem>
  <ExplanationItem>
    <template #icon>
      <IconFileEye />
    </template>
    <template #heading>View</template>
      The resulting file content will be displayed in the bottom container in "File View". 
  </ExplanationItem>
</template>

<script setup>
import ExplanationItem from "./ExplanationItem.vue";
import IconFile from './icons/IconFile.vue'
import IconFileDrag from './icons/IconFileDrag.vue';
import IconFileEye from './icons/IconFileEye.vue';
import IconBulbQuestion from './icons/IconBulbQuestion.vue'
import EmailPopup from "../components/EmailPopup.vue";
import { ref } from 'vue';

const showModal = ref(false)

function sendEmail(email){
  if(email.email !== '' && email.content != ''){
    console.log("Email sent", email)
  }else{
    console.log("Need to write email and content");
  }
}

</script>

<template>
  <div class="container">
  <ExplanationItem>
    <template #icon>
      <IconFile />
    </template>
    <template #heading>File Preview</template>
      This is a page for previewing different content files. 
      The alternative files that are tested to work, as of now, are:
      <a href="https://fileinfo.com/extension/txt">txt</a>,
      <a href="https://en.wikipedia.org/wiki/Comma-separated_values">csv</a>,
      <a href="https://www.w3.org/standards/xml/core">XML</a>,
      <a href="https://html.com/">HTML</a>,
      <a href="https://en.wikipedia.org/wiki/BMP_file_format">bmp</a>,
      <a href="https://www.adobe.com/creativecloud/file-types/image/raster/gif-file.html">gif</a>,
      <a href="https://jpeg.org/about.html">jpeg</a>,
      <a href="https://en.wikipedia.org/wiki/PNG">png</a>,
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG">svg</a>,
      <a href="https://www.adobe.com/creativecloud/file-types/image/raster/tiff-file.html#tiff">tiff</a>,
      <a href="https://developers.google.com/speed/webp">webp</a>,
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">css</a>,
      <a href="https://mimeapplication.net/vnd-ms-excel">vnd.ms-excel</a>,
      <a href="https://www.json.org/json-en.html">json</a> and
      <a href="https://en.wikipedia.org/wiki/MP4_file_format">mp4</a>.
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
  <ExplanationItem>     
    <template #icon>
      <IconBulbQuestion />
    </template>
    <template #heading>Questions or feedback?</template>
      Click <a id="show-modal" @click="showModal = true">here</a> and send an email.
      <Teleport to="body">
      <EmailPopup :show="showModal" @close="showModal = false" @send-email="sendEmail"/>
    </Teleport>
      
  </ExplanationItem>
  </div>
</template>

<style scoped>

  .container {
    min-height: 300px;
  }

</style>

<script setup>
import { defineEmits, ref } from 'vue';
const emits = defineEmits(['send-email', 'close'])

const props = defineProps({
  show: Boolean
})

const email = ref({'email': "", 'content': ""})

/*Need intermittent value currentEmail, because emptying email-ref clears email before emitting*/
function sendNewEmail(newEmail){
  let currentEmail = {'email': newEmail.email, 'content': newEmail.content}
  emits('send-email', currentEmail);
  email.value.email = '';
  email.value.content = '';
}

function closeModal(){
  emits('close');
  email.value.email = '';
  email.value.content = '';
}

</script>

<template>
  <Transition name="email-popup">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <h1>Questions/feedback</h1>
        <textarea  id="feedback" name="feedback" class="textarea" v-model="email.content"></textarea>
        
            <p><label for="email">Enter email here:</label></p>
            <input type="email" id="email" name="email" class="emailinput" v-model="email.email"/>
            <div class="buttons">
              <button class="modal-default-button" @click="sendNewEmail(email)"> Send </button>
              <button class="modal-default-button close" @click="closeModal"> Close </button></div>
            </div>
    </div>
  </Transition>
</template>

<style scoped>

.textarea{
  display: flex;
  width: 100%;
  height: 60%;
  margin: 0;
  background-color: var( --color-background);
  border-radius: 4px;
  color: var(--color-text);
  font-size: 1.2em;
}

.emailinput{
  width: 25%;
  height: 10%;
  margin: 0 0 2em 0;
  background-color: var( --color-background);
  border-radius: 4px;
  color: var(--color-text);
  padding: 0.5em;
  margin: 0;
  font-size: 1.2em;
}

label {
  font-weight: bold;
  color: var( --color-text);
  margin: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  min-height: 600px;
  min-width: 300px;
  width: 60vw;
  height: 50vh;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--color-background);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  color: black;
}

.modal-container h1 {
  margin: 0;
  color: var( --color-text);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: flex;
  flex-direction: column;
  background: rgb(32, 87, 35);
  border-radius: 4px;
  height: 30px;
  width: 50px;
  color: var(--color-text);
  justify-content: center;
  align-content: center;
  margin-top: 1em;
  margin-right: 0.5em;
}

.buttons {
  display: flex;

}

.close {
  display: flex;
  flex-direction: column;
  background: rgb(141, 20, 20);
  margin-left: 0.5em;
}


@media screen and (max-width: 900px) {
  .emailinput{
  width: 100%;
  height: 10%;
  margin: 0 0 2em 0;
  background-color: var( --color-background);
  border-radius: 4px;
  color: var(--color-text);
  padding: 0.5em;
  margin: 0;
  font-size: 1.2em;
}
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
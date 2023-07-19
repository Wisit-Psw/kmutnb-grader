<script setup lang="ts">
import LoadingIcon from "../components/LoadingIcon.vue"
import FooterBar from "../components/FooterBar.vue"
import NavigationBar from '../components/NavigationBar.vue'
import ComplieRequest from "../module/requestcomplie"
import { Codemirror } from 'vue-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, reactive, computed } from 'vue';

const state = reactive<{ awaitsubmit: boolean }>({
  awaitsubmit: false
})

const data = reactive<{ code: string, output: string, input:string, status:string }>({
  code:"",
  input:"",
  output:"",
  status:""
});
const view = ref()
const extensions = [cpp(), oneDark]


const lines = computed(() => data.output.split(/\r?\n/) );

const handleReady = (payload : {
        view: import("@codemirror/view").EditorView;
        state: import("@codemirror/state").EditorState;
        container: HTMLDivElement;
    }) => {
  view.value = payload.view
}

const onRunClick = async () => {
  if(state.awaitsubmit) return;
  data.output = "";

  state.awaitsubmit = true;
  const response = await ComplieRequest(data.code, data.input, "c++");
  if(response?.status && response?.output){
    data.output = response.output;
    data.status = response.status;
  }
  state.awaitsubmit = false;
}

</script>

<template>
  <NavigationBar/>
  <div class="content">
    <codemirror
      v-model="data.code"
      placeholder="C++ Code here..."
      class="codewrapper"
      :style="{ height: '90vh', width: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @focus="console.log('focus', $event)"
      @blur="console.log('blur', $event)"
    />
    <div class="controller-container">
      <div class="controller-buttonwrapper">
        <button @click="onRunClick" :class="`controller-button ${state.awaitsubmit ? 'submiting' : ''}`" >Run</button>
      </div>
    </div>
    <div class="result-container">
      <div class="stdin-inputwrap">
        <h4>Stdin : </h4>
        <textarea class="stdin" v-model="data.input"></textarea>
      </div>
      <div class="output-wrap">
        <div class="loadingwrap" v-if="state.awaitsubmit">
          <LoadingIcon/>
        </div>
        <div v-for="line in lines" :key="line" :class="`output ${data.status !== 'success' ? 'error' : ''}`">{{ line }}</div>
      </div>
    </div>
  </div>
  <FooterBar/>
</template>

<style scoped>
.content{
  display: grid;
  grid-template-columns: 1fr 10rem 1fr;
}
.controller-container{
  padding: 1rem;
  background: #1d2125;
  display: flex;
  flex-direction: column;
  align-items: center;

}
.controller-button{
  padding: 1rem 2rem;
  border: none;
  background: rgb(16, 16, 16);
  color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 0.25rem 0.1rem #000000ab;
  transition: all .25s ease-in-out;
  cursor: pointer;
  font-weight: bold;
}
.controller-button.submiting{
  cursor: not-allowed;
}
.controller-button:hover {
  background: #fff;
  color: rgb(16, 16, 16);
  box-shadow: 0 0 0.25rem 0.1rem #ffffffab;
}
.result-container

{ 
  padding: 1rem;
  color: #fff;
  font-weight: bold;
  background: #282c34
}
.output-wrap{
  position: relative;
  width: 100%;
  height: 80%;
}
.output{
  margin-bottom: 1rem;
}
.output.error{
  color: red;
}
.stdin-inputwrap{
  height: 20%;
  display: flex;
  flex-direction: column;
}
.stdin{
  width: 100%;
  resize: none;
  color: #fff;
  font-size: 1.25rem;
  background: #1d2125;
  flex-grow: 1;
  margin-bottom: 1rem;
}
.loadingwrap{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

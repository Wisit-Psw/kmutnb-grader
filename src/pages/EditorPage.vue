<script setup lang="ts">
import LoadingIcon from "../components/LoadingIcon.vue"
import FooterBar from "../components/FooterBar.vue"
import NavigationBar from '../components/NavigationBar.vue'
import PropositBar from '../components/PropositBar.vue'
import ComplieRequest from "../module/requestcompile"
import PassPopup from "../components/PassPopup.vue"
import NonepassPopup from "../components/NonepassPopup.vue"
import { Codemirror } from 'vue-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, reactive, computed } from 'vue';
import useUserStore from "../module/userstore"
const userdata = useUserStore();
const inputRef = ref();

const state = reactive<{ awaitsubmit: boolean }>({
  awaitsubmit: false
})

const PasspopupState = reactive<{ IsShow: boolean }>({
  IsShow: false
})
const NonepasspopupState = reactive<{ IsShow: boolean ,output:string,expected:string}>({
  IsShow: false,
  output:"",
  expected:"",
})
const ProbSelected = reactive<{ Name: string, Id: string }>({
  Name: "Main",
  Id: ""
})
const MenuTabIsShow = reactive<{ IsShow: boolean }>({
  IsShow: false
})

const data = reactive<{ code: string, output: string, input: string, status: string }>({
  code: "",
  input: "",
  output: "",
  status: ""
});
const view = ref()
const extensions = [cpp(), oneDark]


const lines = computed(() => data.output.split(/\r?\n/));

const onSelectedChange = (Name: string, Id: string) => {
  ProbSelected.Name = Name;
  ProbSelected.Id = Id;
}

const handleReady = (payload: {
  view: import("@codemirror/view").EditorView;
  state: import("@codemirror/state").EditorState;
  container: HTMLDivElement;
}) => {
  view.value = payload.view
}

const onRunClick = async () => {
  if (state.awaitsubmit) return;
  data.output = "";

  state.awaitsubmit = true;
  const response = await ComplieRequest(data.code, data.input, "c++", false);
  state.awaitsubmit = false;
  if (response?.status && response?.output) {
    data.output = response.output;
    data.status = response.status;
  }
}

const onGraderSubmit = async () => {
  if (state.awaitsubmit) return;
  data.output = "";
  state.awaitsubmit = true;
  const response = await ComplieRequest(data.code, data.input, "c++", true, ProbSelected.Id);
  state.awaitsubmit = false;
  if (response?.status && response?.output) {
    data.output = response.output;
    data.status = response.status;
  }

  if (response && response?.result === "pass") {
    state.awaitsubmit = false;
    PasspopupState.IsShow = true;
    setTimeout(() => {
      PasspopupState.IsShow = false;
    }, 2500);
  }else if (response && response?.result === "mismatch"){
    NonepasspopupState.expected = String(response.expected);
    NonepasspopupState.output = response.output;
    state.awaitsubmit = false;
    NonepasspopupState.IsShow = true;
  }
}

const CloseClick=()=>{
  NonepasspopupState.IsShow = false;
}

const onFileChange = (event: any) => {
  const file = event.target?.files[0];
  if (file) ReadFile(file);
}

const ReadFile = (file: any) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    data.code = typeof fileReader.result === "string" ? fileReader.result : "";
  }
  fileReader.readAsText(file);
}

const MenuTabClick = () => {
  MenuTabIsShow.IsShow = !MenuTabIsShow.IsShow;
}

const onSubmitClick = () => {
  if (inputRef.value && inputRef.value.click)
    inputRef.value.click();
}

</script>

<template>
  <PassPopup v-if="PasspopupState.IsShow" />
  <NonepassPopup :output="NonepasspopupState.output" :expected="NonepasspopupState.expected" v-if="NonepasspopupState.IsShow" @CloseClick="CloseClick"/>
  <NavigationBar />
  <PropositBar :style="`width: ${MenuTabIsShow.IsShow ? '10rem' : '0px'}`" @SelectedChange="onSelectedChange" />
  <div class="Menu">
    <div class="MenuIcon" onclick="myFunction(this)" @click="MenuTabClick" v-if="userdata.info">
      <div class="MenuBar"></div>
      <div class="MenuBar"></div>
      <div class="MenuBar"></div>
      <div class="MenuBar"></div>
    </div>
    <div class="PropoHead">{{ ProbSelected.Name }}</div>
    <!-- <div class="controller-buttonwrapper"> -->
    <button @click="onRunClick()" :class="`controller-button ${state.awaitsubmit ? 'submiting' : ''}`">Run</button>
    <input ref="inputRef" type="file" class="FileInput" id="FileInput" style="display:none;" accept=".cpp"
      @change="onFileChange">
    <div class="inputfileButton" @click="onSubmitClick" v-if="userdata.info">
      <svg viewBox="0 0 494.554 494.554">
        <g>
          <path
            d="M464.962 16.626C464.962 7.441 457.507 0 448.337 0H114.845c-9.171 0-16.626 7.441-16.626 16.626v141.807h33.252V33.252H431.71v351.659h-59.795c-9.176 0-16.625 7.436-16.625 16.627v59.766H131.471V337.159H98.219v140.769c0 9.186 7.455 16.626 16.626 16.626h257.07c4.593 0 8.749-1.87 11.752-4.873l.016-.016 76.391-76.359.016-.016a16.56 16.56 0 0 0 4.873-11.752V16.626z"
            fill="#fff" data-original="#fff" class=""></path>
          <path
            d="M172.989 327.305a14.522 14.522 0 0 0 8.977 13.428 14.565 14.565 0 0 0 5.569 1.104c3.798 0 7.519-1.474 10.292-4.255l79.492-79.508a14.549 14.549 0 0 0 4.272-10.277c0-3.865-1.544-7.563-4.272-10.291l-79.492-79.492a14.524 14.524 0 0 0-10.292-4.27c-1.881 0-3.767.359-5.569 1.101a14.564 14.564 0 0 0-8.977 13.445v23.396H44.139c-8.022 0-14.548 6.508-14.548 14.547v83.129c0 8.037 6.525 14.549 14.548 14.549h128.85v23.394z"
            fill="#fff" data-original="#fff" class=""></path>
        </g>
      </svg>
    </div>

    <button @click="onGraderSubmit" :class="`controller-submit-button ${state.awaitsubmit ? 'submiting' : ''}`"
      v-if="userdata.info">Submit
      Code</button>
    <!-- </div> -->
  </div>
  <div class="content">
    <div class="MiddleBar"></div>
    <codemirror v-model="data.code" placeholder="C++ Code here..." class="codewrapper"
      :style="{ height: '80vh', width: '100%' }" :autofocus="true" :indent-with-tab="true" :tab-size="2"
      :extensions="extensions" @ready="handleReady" @focus="console.log('focus', $event)"
      @blur="console.log('blur', $event)" />
    <div class="MiddleBar"></div>
    <div class="result-container">
      <div class="stdin-inputwrap">
        <h4>Stdin : </h4>
        <textarea class="stdin" v-model="data.input"></textarea>
      </div>
      <div class="output-wrap">
        <div class="loadingwrap" v-if="state.awaitsubmit">
          <LoadingIcon />
        </div>
        <div v-for="line in lines" :key="line" :class="`output ${data.status !== 'success' ? 'error' : ''}`">{{ line }}
        </div>
      </div>
    </div>
    <div class="MiddleBar"></div>
  </div>
  <FooterBar />
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1rem 1fr 1rem 1fr 1rem;
}

.Menu {
  width: 100%;
  height: 3rem;
  background-color: #1d2125;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*padding: 1rem;*/
}

.PropoHead {
  color: #fff;
  margin-left: 1rem;
  width: 38vw;
}

.MenuIcon {
  border: 3px solid #fff;
  border-radius: 5px;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding: 0.2rem;
  margin-left: 1rem;
}

.MenuBar {
  background-color: #fff;
  margin: 0 auto;
  width: 90%;
  height: 0.15rem;
  border-radius: 3rem;
}

.controller-container {
  padding: 1rem;
  background: #1d2125;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.controller-submit-button {
  margin: 0 1rem 0 auto;
  padding: 0.5rem 2rem;
  border: none;
  background: rgb(16, 16, 16);
  color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 0.25rem 0.1rem #000000ab;
  transition: all .25s ease-in-out;
  cursor: pointer;
  font-weight: bold;
}

.controller-button {
  padding: 0.5rem 2rem;
  border: none;
  background: rgb(16, 16, 16);
  color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 0.25rem 0.1rem #000000ab;
  transition: all .25s ease-in-out;
  cursor: pointer;
  font-weight: bold;
}

.controller-button.submiting {
  cursor: not-allowed;
}

.controller-button:hover {
  background: #fff;
  color: rgb(16, 16, 16);
  box-shadow: 0 0 0.25rem 0.1rem #ffffffab;
}

.MiddleBar {
  background-color: #1d2125;
}

.result-container {
  padding: 1rem;
  color: #fff;
  font-weight: bold;
  background: #282c34
}

.output-wrap {
  position: relative;
  width: 100%;
  height: 80%;
}

.output {
  margin-bottom: 1rem;
}

.output.error {
  color: red;
}

.stdin-inputwrap {
  height: 20%;
  display: flex;
  flex-direction: column;
}

.stdin {
  width: 100%;
  resize: none;
  color: #fff;
  font-size: 1.25rem;
  background: #1d2125;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.loadingwrap {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputfileButton {
  width: 2rem;
  display: flex;
  align-items: center;
  aspect-ratio: 1/1;
}

.inputfileButton svg {
  width: 100%;
  height: 100%;
}</style>

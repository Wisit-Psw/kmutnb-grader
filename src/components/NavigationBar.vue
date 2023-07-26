<script setup lang="ts">
import useUserStore from "../module/userstore"
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
const DropDownRef = ref()
const ButtonRef = ref()

const Dropdown = reactive<{ IsShow: boolean }>({
  IsShow: false
})
const DropdownShow = () =>{
  Dropdown.IsShow = true;
  window.addEventListener("click", outSideDetected)
}
const userdata = useUserStore();
const router = useRouter();

const EnterAdmin = () => {
  router.push("/admin");
}

const Logout =() => {
  localStorage.removeItem("token");
  router.push("/login");
}

const outSideDetected = (e:Event) => {
  if(!DropDownRef.value) {
    Dropdown.IsShow = false;
    window.removeEventListener("click", outSideDetected)
  }
  if(!DropDownRef.value.contains(e.target) && !ButtonRef.value.contains(e.target)){
    Dropdown.IsShow = false;
    window.removeEventListener("click", outSideDetected)
  } 
}
</script>

<template>
  <div class="navigation">
    <div class="imgwrapper" >
      <img :src="'./assets/logo.png'" alt="logo" />
    </div>
    
    <div class="accoute-manage-wrap" v-if="userdata.info">
      <button ref="ButtonRef" class="account-manage" @click="DropdownShow">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0" fill="#000000" data-original="#000000" class=""></path>
          </g>
        </svg>
      </button>
    </div>
    <ul ref="DropDownRef" class="DropdownContainer" v-if="Dropdown.IsShow">
      <li class="DropdownMenu" v-if="userdata.info?.isadmin" @click="EnterAdmin">admin</li>
      <li class="DropdownMenu" @click="Logout">logout</li>
    </ul>
  </div>
</template>

<style scoped>
.navigation{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height:5rem;
  max-height: 5rem;
  background: #18191e;
  position: relative;
  transition: max-height 0.15s ease-out;
  overflow: hidden;
}

.imgwrapper{
  height: 100%;
  aspect-ratio: 1/1;
}
.imgwrapper img{
  width: 100%;
  height: 100%;
}
.account-manage{
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: transparent;
  border: none;
}
.account-manage path{
  fill: #fff;
}
.account-manage:hover path{
  fill: gold;
}
.accoute-manage-wrap{
  right: 1%;
  position: absolute;
  height: 60%;
  aspect-ratio: 1/1;
}
.DropdownContainer{
  width: 10rem;
  height: fit-content;
  background-color:white;
  position: fixed;
  top:5rem;
  right:0;
  list-style: none;
  z-index: 10;
}
.DropdownMenu{
  padding:1rem;
  font-size: 1rem;
  cursor: pointer;
}
.DropdownMenu:hover{
  background-color: rgb(202, 202, 202);
  color:white;
}
</style>

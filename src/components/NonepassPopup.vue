<script setup lang="ts" >
import { computed } from "vue"
const props = defineProps({ output: String, expected: String })
defineEmits(["CloseClick"])

const gethighlight = computed(() => {
    if(typeof props.expected !== "string" || typeof props.output !== "string") return [];
    const { output, expected } = props;
    return output.split('').map((char, i) => char != expected.charAt(i) ? { highlight:true, char } : { char });
})

</script>

<template>
    <div class="Container">
        <div class="icon-wrap">
            <div class="exit-button" @click="$emit('CloseClick')">
                <svg viewBox="0 0 455.111 455.111" class="ColseIcon">
                    <g>
                        <circle cx="227.556" cy="227.556" r="227.556" style="" fill="#cbcbcb" data-original="#e24c4b" class="" opacity="1"></circle>
                        <path d="M455.111 227.556c0 125.156-102.4 227.556-227.556 227.556-72.533 0-136.533-32.711-177.778-85.333 38.4 31.289 88.178 49.778 142.222 49.778 125.156 0 227.556-102.4 227.556-227.556 0-54.044-18.489-103.822-49.778-142.222 52.623 41.243 85.334 105.243 85.334 177.777z" style="" fill="#838383" data-original="#d1403f" class="" opacity="1"></path>
                        <path d="M331.378 331.378c-8.533 8.533-22.756 8.533-31.289 0l-72.533-72.533-72.533 72.533c-8.533 8.533-22.756 8.533-31.289 0-8.533-8.533-8.533-22.756 0-31.289l72.533-72.533-72.533-72.533c-8.533-8.533-8.533-22.756 0-31.289 8.533-8.533 22.756-8.533 31.289 0l72.533 72.533 72.533-72.533c8.533-8.533 22.756-8.533 31.289 0 8.533 8.533 8.533 22.756 0 31.289l-72.533 72.533 72.533 72.533c8.533 8.533 8.533 22.755 0 31.289z" style="" fill="#ffffff" data-original="#ffffff" class=""></path>
                    </g>
                </svg>
            </div>
            <svg class="cross" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <rect class="lineA" height="2" x="11" y="25" rx="1"></rect>
                <rect class="lineB" height="2" x="12" y="24" rx="1"></rect>
            </svg>
            <div class="ShowResult">
                <div class="Expect">
                    <div>ผลลัพธ์ที่ต้องการ</div>
                    {{ expected }}
                </div >
                <div class="Output">
                    <div>ผลลัพธ์ของคุณ</div>
                    {{ output }} 
                </div>
            </div>
            <div class="ShowDifferance">
                <span v-for="(data,index) in gethighlight" :class="`${data.highlight ? 'highlight' : ''}`" :key="index">
                    {{data.char}}
                </span>
            </div>
            <div class="Reject">
                Rejected
            </div>
        </div>
    </div>
</template>

<style scoped>
.Container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    backdrop-filter: blur(0.5rem);
}
.ColseIcon{
    width: 2.5rem;
    position: absolute;

}
.highlight{
    background-color: yellow;
    text-decoration: underline;
    display: inline;
}
.ShowResult{
    width: 20rem;
    margin-top: 2rem;
    display: flex;
    font-size: 1rem;
}
.ShowDifferance{
    width: 20rem;
    padding: 1rem;
    text-align: initial;
    font-size: 1rem;
    height: 8rem;
    background-color: rgba(165, 165, 165, 0.2);
    color: gray;
}
.Expect{
    width: 50%;
    height: 8rem;
    padding: 1rem;
    text-align: left;
    background-color: rgba(62, 255, 72, 0.2);
    color: green;
    overflow:auto ;
}
.Reject{
    margin-top: 2rem;
}
.Output{
    height: 8rem;
    text-align: left;
    padding: 1rem;
    width: 50%;
    background-color: rgba(255, 62, 62, 0.2);
    color: red;
    overflow:auto ;
}
.icon-wrap{
    padding: 3rem;
    background-color: white;
    border-radius: 2rem;
    text-align: center;
    font-size: 2rem;
    position: relative;
}
.exit-button{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.cross {
  rotate: 90deg;
}
.cross{
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
    border-radius: 50%;
    display: block;
    box-shadow: inset 0px 0px 0px rgb(255,97,89);
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    overflow: visible;
    z-index: 101;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: rgb(255,97,89);
  fill: none;
  animation: stroke .6s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards;
}

.lineA{
    rotate: 45deg;
}
.lineB{
    rotate: -45deg;
}
.lineA, .lineB{
    transform-origin: center;
    width: 0;
    animation: cross .4s ease-in-out .8s forwards;
    fill: #fff;
}
@keyframes cross{
    100% {
        width: 30px;
    }
}
@keyframes scale{
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill{
  100% {
    box-shadow: inset 0px 0px 0px 8rem rgb(255,97,89);
  }
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
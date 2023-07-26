<script setup lang="ts">
import { reactive, onMounted } from 'vue';
defineEmits(["SelectedChange"])
const data = reactive<{
    response: Array<{
        Id:String,
        Name:String,
        Info:String,
        Link:String,
        Pass:String,
    }>,
    status: string,
}>({
    "response": [{
        Id:"prob1",
        Name:"อาเรย์2มิติ",
        Info:"",
        Link:"",
        Pass:"0",
    }],
    "status": "success"
})


const GetAssigned = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token?.length) throw new Error('Token empty or undefined');

        const response = await fetch(import.meta.env.VITE_api + "/api/getassignment", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const json = await response.json();
        if (json.status === "success" && json.response) {
            data.response = json.response;
            data.status = json.status;
            return
        } else {
            data.status = json.status;
        }
    } catch (error) {
        data.status = "error";
    }
}

onMounted(() => {
    GetAssigned();
})
</script>
    
<template>
    <div class="Container">
        <div class="PropositionMenu" v-for="(Propo) in data.response">
            <div class="PropositionName" @click="$emit('SelectedChange', Propo.Name, Propo.Id )">{{ Propo.Name}}</div>
        </div>
    </div>
</template>

<style scoped>
.Container {
    z-index: 5;
    position: absolute;
    top: 10;
    left: 0;
    margin-top: 3rem;
    height: 82vh;
    overflow-x: hidden;
    transition: width 0.5s ease-out;
    background: #1d2125;
}

.PropositionMenu {
    width: 10rem;
    padding: 0.3rem 1rem;
    position: relative;
    text-align: left;
    word-wrap: break-word;
}

.PropositionName {
    color: #fff;
    font-size: 1rem;
    /*font-weight:1;
    margin-left:-1rem ;*/
}
</style>
<!-- 38444d -->
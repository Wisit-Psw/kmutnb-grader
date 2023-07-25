<script setup lang="ts">
import TableComponent from '../components/TableComponent.vue'
import { reactive, onMounted } from 'vue';
const data = reactive<TableData>({} as TableData)


const getProgressStyle = (p: Assignment) => {
    const keyof = Object.keys(data.response.Structure)
    if (!p || !keyof.length) return;
    let count = 0;
    keyof.forEach((data) => {
        if (p[data] && p[data].pass) {
            count++;
        }
    })
    const width = (count / keyof.length) * 100;
    return `width:${width}%; height:1rem; background-color: rgb(35, 197, 35); z-index:-1`;
}

const GetUsertable = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token?.length) throw new Error('Token empty or undefined');

        const response = await fetch(import.meta.env.VITE_api + "/api/sentry/getusertable", {
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

const UserMapping = (UserData: any): string => {
    if (!UserData) return "unknown";

    return UserData.pass ? 'checked' : 'cross';
}

onMounted(() => {
    GetUsertable()
})
</script>

<template>
    <table class="Table" v-if="data.status === 'success'">
        <thead>
            <tr>
                <th style="z-index:10" class="UserHeader">นักเรียน</th>
                <th>{{ Object.keys(data.response.Structure).length }} ข้อ </th>
                <th class="UserHeader" v-for="(Propo, index) in data.response.Structure" :key="index">
                    <span>{{ Propo.Name }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(UserData, index) in data?.response?.Assigned" :key="index">
                <td class="UserHeader" style="z-index:10">{{ UserData.Username }}</td>
                <th>
                    <div style="width:7rem;height:1rem;background-color: rgb(177, 177, 177);z-index:-1">
                        <div :style="getProgressStyle(UserData.Data)">

                        </div>
                    </div>
                </th>
                <!-- แก้เป็น ชื้อ-นามสกุล -->
                <td v-for="(assignment, _index2) in data?.response?.Structure"
                    :key="assignment.Id + UserData.Username">
                    <TableComponent :type="UserMapping(UserData.Data[assignment.Id])">ยังไม่ส่ง
                    </TableComponent>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>


</style>
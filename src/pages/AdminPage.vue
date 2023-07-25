<script setup lang="ts">
// import LoadingIcon from "../components/LoadingIcon.vue"
// import FooterBar from "../components/FooterBar.vue"
import { useUserStore } from "../module/userstore"
import NavigationBar from '../components/NavigationBar.vue'
import TableComponent from '../components/TableComponent.vue'
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const userdata = useUserStore();
const router = useRouter();

type status = "success" | "error" | string
type Page = { 
    selected: boolean
}
type TableHeader = {
    Id: string
    Name: string,
    Info: string
}
type TableCell = {
    Username: string,
    Data: {[key:string]:{
        id: string,
        pass: boolean
    }}
}
type TableData = {
    response: {
        Structure:Array<TableHeader>
        Assigned:Array<TableCell>
    }
    status: status,
}
const Page = reactive<Page>({
    selected: false,
})
const data = reactive<TableData>({
    response: {
        Structure: [],
        Assigned: []
    },
    status: ""
})
const GetUsertable = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token?.length) throw new Error('Token empty or undefined');

        const response = await fetch(import.meta.env.VITE_api + "/api/getusertable", {
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
        }else{
            data.status = json.status;
        }
    } catch (error) {
        data.status = "error";
    }
}

const onMenuButtonClick = (bool: boolean) => {
    Page.selected = bool;
}

const UserMapping = (UserData: any) : string => {
    if(!UserData) return "unknown";


    return UserData.pass ? 'checked' : 'cross';
}

onMounted(() => {
    if(userdata.info?.isadmin){
        GetUsertable()
    }else{
        router.push("/editor");
    }
})

</script>

<template >
    <!-- <div style="width:100vw;height:100vh;overflow: hidden"> -->
    <div class="MenuContainer">
        <button type="button" class="MenuButton" @click="onMenuButtonClick(false)"
            :style="` ${Page.selected ? 'background-color:#1d2125;color: gray;' : 'background-color:#282c34;color: white;'}`">User</button>
        <button type="button" class="MenuButton" @click="onMenuButtonClick(true)"
            :style="` ${Page.selected ? 'background-color:#282c34;color: white;' : 'background-color:#1d2125;color: gray;'}`">Assignment</button>
    </div>
    <NavigationBar />
    <div style="" class="MainContainer">
        <div class="container1" :style="`margin-left: ${Page.selected ? '-100vw' : '0'}`">
            <div class="TableContainer">
                <table class="Table" v-if="data.status === 'success'">
                    <thead>
                        <tr>
                            <th style="width:20vw;z-index:10" class="UserHeader">นักเรียน</th>
                            <th class="TableHeader" v-for="(Propo,_index) in data.response.Structure" :key="Propo.Id">
                                <span>{{ Propo.Name }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(UserData,index) in data?.response?.Assigned" :key="index">
                            <td class="UserHeader">{{ UserData.Username }}</td>
                            <td v-for="(assignment, _index2) in data?.response?.Structure" :key="assignment.Id+UserData.Username">
                                <TableComponent :type="UserMapping(UserData.Data[assignment.Id])">ยังไม่ส่ง</TableComponent>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <div class="container2">
            <div class="TableContainer">
                <!-- <table class="Table">
                    <tr>
                        <th style="width:20vw;z-index:10" class="UserHeader">User</th>
                        <th class="TableHeader" v-for="(Propo) in data.response.Structure">
                            {{ Propo.Name }}
                        </th>
                    </tr>
                    <tr v-for="(UserData) in data.response.Assigned">
                        <td class="UserHeader">{{ UserData.Username }}</td>
                        <td v-for="(i) in data.response.Structure">s</td>
                    </tr>
                </table> -->
            </div>

        </div>
    </div>
    <!-- </div> -->
</template>
<style scoped>
.MenuContainer {
    height: fit-content;
    z-index: 15;
    position: fixed;
    margin-top: 3rem;

}
.Icon-wrap{
    max-height: 2rem;
}
.MenuButton {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    border: none;
    margin: 0 0.2rem;
    background-color: #282c34;

}

.MainContainer {
    display: flex;
    width: 100vw;
    overflow: hidden;
    overflow-x: hidden;
}


.container1 {
    width: 100vw;
    height: 85vh;
    transition: margin-left 0.5s ease-out;
}

.container2 {
    width: 100vw;
    height: 85vh;
}

.TableContainer {
    width: 100%;
    height: 90vh;
    overflow: scroll;
    margin: 0 auto;
}

table {
    border-collapse: collapse;
    border: 2px solid #ddd;
    font-size: 1.2rem;
    table-layout: auto;
    /* ตั้งค่าให้ตารางมีขนาดคงที่ */
    width: 90vw;
    overflow-y: scroll;
    overflow-x: scroll;
    text-align: center;
}

th,
td {
    border: 2px solid #ddd;
    padding: 12px;
    min-width: fit-content;
    white-space: nowrap;
    /* ไม่ตัดข้อความในเซลล์ */
    word-wrap: break-word;
    z-index: 0;
    background-color: #fff;
}

th {
    background-color: #f2f2f2;
    position: sticky;
    /* ตั้งค่าให้ส่วนหัวตารางติดอยู่ด้านบนของตาราง */
    top: 0;
    /* ตั้งค่าให้ส่วนหัวตารางติดอยู่ที่ด้านบนของหน้าจอ */
    z-index: 5;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:nth-child(odd) {
    background-color: #fff;
}

tr:hover {
    background-color: #ddd;
}

.ContentContainer {
    width: 90vw;
    background-color: white;
}

.UserHeader {
    text-align: left;
    position: sticky;
    padding-left: 1.5rem;
    left: 0;
    z-index: 4;
    background-color: white;
}
</style>

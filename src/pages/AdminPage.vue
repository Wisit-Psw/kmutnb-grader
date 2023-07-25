<script setup lang="ts">
// import LoadingIcon from "../components/LoadingIcon.vue"
// import FooterBar from "../components/FooterBar.vue"
import { useUserStore } from "../module/userstore"
import NavigationBar from '../components/NavigationBar.vue'
import GroupTable from '../components/GroupTable.vue'
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import UserTable from '../components/UserTable.vue'
import AddGroupPopup from "../components/AddGroupPopup.vue"

const userdata = useUserStore();
const router = useRouter();

const Page = reactive<Page>({
    selected: 0,
})

const AddGroupState = reactive<{Isshow:boolean}>({
    Isshow: false,
})

const onMenuButtonClick = (pagenum: number) => {
    Page.selected = pagenum;
}


const onAddGroupBtnClick = () => {
    AddGroupState.Isshow = !AddGroupState.Isshow;
}

onMounted(async () => {
    if (!userdata.info?.isadmin) {
        router.push("/editor");
    }
})


</script>

<template >
    <!-- <div style="width:100vw;height:100vh;overflow: hidden"> -->
        <AddGroupPopup v-if="AddGroupState.Isshow" @onAddGroupBtnClick="onAddGroupBtnClick"/>
    <div class="MenuContainer">
        <button type="button" class="MenuButton" @click="onMenuButtonClick(0)"
            :style="` ${Page.selected === 0 ? 'background-color:#282c34;color: white;' : 'background-color:#1d2125;color: gray;'}`">User</button>
        <button type="button" class="MenuButton" @click="onMenuButtonClick(1)"
            :style="` ${Page.selected === 1 ? 'background-color:#282c34;color: white;' : 'background-color:#1d2125;color: gray;'}`">Assignment</button>
        <button type="button" class="MenuButton" @click="onMenuButtonClick(2)"
            :style="` ${Page.selected === 2 ? 'background-color:#282c34;color: white;' : 'background-color:#1d2125;color: gray;'}`">Group</button>
    </div>
    <NavigationBar />
    <div style="" class="MainContainer" :style="`--left:-${Page.selected * 100}vw;`">
        <div class="wraptable">
            <div class="container">
                <div class="TableContainer">
                    <UserTable/>
                </div>
            </div>
            <div class="container">
                <div class="TableContainer">
                    <UserTable/>
                </div>
            </div>
            <div class="container">
                <div class="TableContainer">
                    <GroupTable/>
                </div>
            </div>
            
        </div>
        <div class="AddGroupBtn" @click="onAddGroupBtnClick">
            <svg viewBox="0 0 469.333 469.333">
                <g>
                    <path
                        d="M437.332 192h-160V32c0-17.664-14.336-32-32-32H224c-17.664 0-32 14.336-32 32v160H32c-17.664 0-32 14.336-32 32v21.332c0 17.664 14.336 32 32 32h160v160c0 17.664 14.336 32 32 32h21.332c17.664 0 32-14.336 32-32v-160h160c17.664 0 32-14.336 32-32V224c0-17.664-14.336-32-32-32zm0 0"
                        fill="#ff8800" data-original="#ff8800" class=""></path>
                </g>
            </svg>
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

.Icon-wrap {
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
    width: 100vw;
    overflow: hidden;
}

.wraptable {
    width: 100%;
    display: flex;
    transform: translate(var(--left));
    transition: all 0.5s ease-out;
    ;
}

.container {
    width: 100%;
    height: 85vh;
}

.TableContainer {
    width: 100%;
    height: 85vh;
    overflow: scroll;
    margin: 0 auto;
}

.Table {
    border-collapse: collapse;
    /*border: 2px solid #ddd;*/
    font-size: 1.2rem;
    /*table-layout: auto;*/
    /* ตั้งค่าให้ตารางมีขนาดคงที่ */
    overflow-y: scroll;
    overflow-x: scroll;
    text-align: center;
}
.TableContainer{
    width: 100vw;
}
.TableContainer::-webkit-scrollbar{
    width: 0.35rem;
    height: 0.15rem;
}
.TableContainer::-webkit-scrollbar-thumb{
    background: #4e4e4e;
}
.TableContainer::-webkit-scrollbar-track{

}
.TableContainer::-webkit-scrollbar-corner {
    background: transparent;
    width: 0;
    height: 0;
}
.Table:deep() th,
.Table:deep() td {
    /*border: 2px solid #ddd;*/
    padding: 0.2rem 1rem;
    min-width: fit-content;
    white-space: nowrap;
    color: white;
    /* ไม่ตัดข้อความในเซลล์ */
    word-wrap: break-word;
    z-index: 0;
}

.Table:deep() th {
    background-color: none;
    position: sticky;
    /* ตั้งค่าให้ส่วนหัวตารางติดอยู่ด้านบนของตาราง */
    top: 0;
    /* ตั้งค่าให้ส่วนหัวตารางติดอยู่ที่ด้านบนของหน้าจอ */
    z-index: 5;
    background-color: #18191e;
}

/*tr:nth-child(even) {
    background-color: #f2f2f2;
}*/

.Table:deep() tr:nth-child(odd) {
    background-color: #222227;
}

.Table:deep() tr:hover {
    background-color: #18191e;
}

.ContentContainer {
    width: 90vw;
    background-color: white;
}
.Table:deep() .UserHeader{
    text-align: left;
    position: sticky;
    padding-left: 1.5rem;
    left: 0;
    z-index: 4;
    background-color: #18191e;
    width: 90vw;
}
.AddGroupBtn{
    position: fixed;
    top:94.5%;
    width:2.3rem;
    height: 2.3rem;
    right: 2rem;
    border: 3px solid #ff8800;
    padding: 0.3rem;
    border-radius: 50%;
    cursor: pointer;
}
</style>

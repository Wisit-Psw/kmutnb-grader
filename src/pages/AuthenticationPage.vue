<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const state = reactive({
    usernamefocus: false,
    passwordfocus: false
})

const data = reactive({
    username: "",
    password: ""
})

const route = useRouter();

const onSubmit = async (e: Event) => {
    e.preventDefault();
    try{
        const response = await fetch(import.meta.env.VITE_api+"/api/authenticate", {
            method: "POST",
            body: JSON.stringify({
                username : data.username,
                password : data.password
            })
        });
        const result = await response.json();
        if(result.response && result.status === "success"){
            localStorage.setItem("token", result.response)
            route.push("/editor")
        }
    }catch(error){
        console.error(error)
    }
}

</script>

<template>
    <div class="container">
        <div class="wrapper">
            <div class="imagelogo">
                <img :src="'./assets/logo.png'" alt="logo" />
            </div>
            <div class="controller">
                <form class="formWrap" @submit="onSubmit">
                    <div class="header">Login</div>
                    <div :class="`inputWrapper ${state.usernamefocus || (data.username !== '') ? 'focus' : ''}`">
                        <label class="placeholder">Username</label>
                        <input v-model="data.username" type="text" class="inputbox"
                            @focus="() => state.usernamefocus = true" @blur="() => state.usernamefocus = false" />
                    </div>
                    <div :class="`inputWrapper ${state.passwordfocus || (data.password !== '') ? 'focus' : ''}`">
                        <label class="placeholder">Password</label>
                        <input v-model="data.password" type="password" class="inputbox"
                            @focus="() => state.passwordfocus = true" @blur="() => state.passwordfocus = false" />
                    </div>
                    <div class="loginwrap">
                        <button type="submit" class="loginbtn">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </form>
                <div class="signupwrap">
                    <router-link to="/editor">
                        <button type="button" class="signupbtn">
                            Go to editor
                        </button>
                    </router-link>
                </div>
                <!-- <div v-if="fallback.length" class="fallbackerr">
                        {fallback}
                    </div> -->
            </div>
        </div>

    </div>
</template>

<style scoped>
.container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}


.header {
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 1.5rem;
}

.wrapper {
    display: flex;
    min-width: 15rem;
    padding: 0.5rem;
    background: #1d2125;;
    border-radius: 0.5rem;
    color: white;
    align-items: center;
}
.imagelogo{
    width: 17rem;
    aspect-ratio: 1/1;
}
.imagelogo img{
    width: 100%;
    height: 100%;
}

.controller {
    padding: 1rem;
    background: #1d2125;
    border-radius: inherit;
}

.formWrap {}

.inputWrapper {
    position: relative;
    margin-bottom: 1.5rem;
}

.inputbox {
    all: unset;
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1.75px solid;
    width: 100%;
}

.placeholder {
    position: absolute;
    pointer-events: none;
    transition: all .2s;
    left: 0;
}

.focus .placeholder {
    transform: translateY(-100%) scale(0.9);
    font-size: 14px;
    left: -1%;
}

.inputbox:focus {
    border-bottom: 2px solid #0066ff;
}

.loginbtn,
.signupbtn {
    all: unset;
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transition: background .2s;

}

.loginbtn {
    background: rgb(76, 204, 95);
}

.loginbtn:hover {
    background: rgb(52, 142, 66);
}

.signupbtn {
    background: rgb(204, 136, 76);
}

.signupbtn:hover {
    background: rgb(157, 104, 58);
}

.loginwrap {}

.signupwrap {
    margin-top: 1rem;
}

.signupwrap a {
    text-decoration: none;
}

.forgetpwd {
    margin-top: 0.5rem;
}

.forgetpwd a {
    text-decoration: underline;
    color: white;
}

.fallbackerr {
    margin-top: 0.5rem;
    text-align: center;
    color: red;

}
@media screen and (min-width:768px) {
    .inputWrapper {
        width: 17rem;
    }
}
@media screen and (max-width:768px) {
    .imagelogo{
        width: 10rem;
    }
    .wrapper {
        flex-direction: column;
    }
}
</style>

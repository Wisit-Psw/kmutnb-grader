import { defineStore } from "pinia"

type info = {
    exp: number
    username: string
    isadmin: boolean
}

export const useUserStore = defineStore('userdata', {
  state: () => ({ info: null as info | null }),
  actions: {
    setInfo(info : info | null){
      this.info = info
    }
  }
})

export default useUserStore;
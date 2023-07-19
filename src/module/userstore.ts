import { defineStore } from "pinia"

export const useUserStore = defineStore('userdata', {
  state: () => ({ info: null }),
  actions: {
    setInfo(info : any){
      this.info = info
    }
  }
})

export default useUserStore;
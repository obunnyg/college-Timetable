<template>
  <div
    class="overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 flex h-screen justify-center items-center font-Comic"
  >
  <transition name="component-fade" mode="out-in">
  <router-view @selectedGroup="showTimetable" :selectedGroup="selectedGroup" :key="$route.path"/>
  </transition>
  </div>
</template>
<script>
import timeTableView from "./components/timeTableView.vue";
import helloScreenView from "./components/helloScreenView.vue";
export default {
  data(){
    return {
      selectedGroup: '',
      database: null,
      errors: [],
    }
  },
  methods: {
    showTimetable(data){
      this.selectedGroup = data.selectedGroup
    },
    async fetchDatabase(){
      try {
        const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${"1CNyHQdbbkIerQRXicA1FaYnUsYhroe_l"}?alt=media&key=${"AIzaSyAKsTsHJNrogKzIUV2uV3mFICb4GgRMv5I"}`)
        this.database = response.data
      }
      catch (e) {
        alert('Ошибка загрузки базы данных');
      }
    }
  },
  components: {
    timeTableView,
    helloScreenView,
  },
};
</script>
<style src="./style.css" />

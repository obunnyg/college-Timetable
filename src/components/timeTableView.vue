<template>
  <div
    class="container bg-white/50 backdrop-brightness-125 backdrop-blur-sm p-5 px-3 lg:px-10 lg:py-10 md:px-10 lg:p-20 md:p-10 shadow-xl rounded-3xl"
  >
    <div
      class="flex flex-col lg:flex-row md:flex-row sm:flex-col justify-center items-center lg:justify-between md:justify-between sm:justify-center"
    >
      <div class="flex items-center gap-3">
        <button
          @click="router.push({ name: 'helloScreen' })"
          class="transition-all ease-linear hover:scale-110 active:scale-100"
        >
          <ArrowLeftCircle color="teal" :size="30" />
        </button>
        <p class="text-xl">Расписание занятий:</p>
        <p v-if="selectedGroup" class="text-xl font-bold text-teal-600">
          {{ selectedGroup }}
        </p>
      </div>
      <div class="flex items-center">
        <button
          :changeDate="changeDate"
          @click="previousDay()"
          class="transition-all ease-linear hover:scale-110 active:scale-100"
        >
          <ChevronsLeft color="teal" />
        </button>
        <button
          :selectedDate="selectedDate"
          :nowDate="nowDate"
          @click="selectToday()"
        >
          <p class="text-xl">{{ selectedDate }}</p>
        </button>
        <button
          :changeDate="changeDate"
          @click="nextDay()"
          class="transition-all ease-linear hover:scale-110 active:scale-100"
        >
          <ChevronsRight color="teal" />
        </button>
      </div>
    </div>
    <div class="flex mt-5">
      <ul class="rounded-2xl w-full overflow-hidden flex flex-col items-center">
        <!-- Элемент списка -->
        <transition-group name="component-fade" mode="out-in">
          <LessonComponent
          v-if="isTimetable === true"
            class="w-full"
            v-bind:lesson="lesson"
            :key="index"
            v-bind:index="index"
            v-for="(lesson, index) in selectedTimetable"
          />
          <div class="mt-5 w-1/2 text-xl text-center" v-else>Расписание на этот день украли при неизвестных обстоятельствах... <span class="text-black text-opacity-25">или еще не сделали)</span></div>
          <!-- Элемент списка -->
        </transition-group>
      </ul>
    </div>
  </div>
</template>
<script>
import { ArrowLeftCircle } from "lucide-vue-next";
import { ChevronsLeft } from "lucide-vue-next";
import { ChevronsRight } from "lucide-vue-next";
import axios from "axios";
import localJSON from "../JSON/database.json";
import { useRouter, useRoute } from "vue-router";
import lessonComponent from "./lessonComponent.vue";
import LessonComponent from "./lessonComponent.vue";

export default {
  components: { ArrowLeftCircle, ChevronsLeft, ChevronsRight, lessonComponent },
  name: "Timetable",
  props: ["selectedGroup"],
  data() {
    return {
      changeDate: 0,
      selectedDate: null,
      selectedTimetable: [],
      isTimetable: true,
      globalDate: null,
      nowDate: null,
      errors: [],
      database: null,
      localDatabase: localJSON,
    };
  },
  methods: {
    async fetchDatabase() {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/drive/v3/files/${"1CNyHQdbbkIerQRXicA1FaYnUsYhroe_l"}?alt=media&key=${"AIzaSyAKsTsHJNrogKzIUV2uV3mFICb4GgRMv5I"}`
        );
        this.database = response.data;
        this.selectedTimetable =
          this.database[this.selectedDate][this.selectedGroup];
      } catch (e) {
        alert("Ошибка загрузки базы данных");
        this.database = this.localDatabase;
      }
    },
    nextDay() {
      this.selectedDate = this.nowDate.setDate(this.nowDate.getDate() + 1);
      const date = new Date(this.selectedDate);
      this.selectedDate = `${date.getDate()<10?`0${date.getDate()}`:date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      this.isDatabase()
    },
    previousDay() {
      this.selectedDate = this.nowDate.setDate(this.nowDate.getDate() - 1);
      const date = new Date(this.selectedDate);
      this.selectedDate = `${date.getDate()<10?`0${date.getDate()}`:date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      this.isDatabase()
    },
    isDatabase() {
      if (this.database.hasOwnProperty(this.selectedDate)) {
        if (
          this.database[this.selectedDate].hasOwnProperty(this.selectedGroup)
        ) {
          this.selectedTimetable =
            this.database[this.selectedDate][this.selectedGroup];
            this.isTimetable = true
          console.log("База данных загружена");
        } else {
          this.isTimetable = false;
          console.log("База данных в отпуске");
        }
      } else {
        this.isTimetable = false;
        console.log("База данных в отпуске");
      }
    },
  },
  beforeMount() {
    this.database = this.localDatabase;

    const responseDate = new Date();
    this.nowDate = responseDate;
    this.globalDate = responseDate;

    this.selectedDate = `${responseDate.getDate()}.${responseDate.getMonth()+1}.${responseDate.getFullYear()}`;
  },
  mounted() {
    this.isDatabase();

    //this.fetchDatabase();
  },
  beforeUpdate() {},
  watch: {},
};
</script>

<script setup>
const router = useRouter();
const route = useRoute();
</script>

<style src="../style.css" />

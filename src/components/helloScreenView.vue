<template>
  <div class="container flex flex-col justify-center items-center gap-4">
    <button @click="showDialog()">
      <div
        class="text-3xl font-bold text-white drop-shadow-md underline decoration-double decoration-1 underline-offset-2 select-none transition-all ease-out hover:decoration-teal-500"
      >
        расписание
      </div>
    </button>
    <modalDialog v-model:show="dialogVisible">
      <div class="">
        Привет, любопытный студент! Это приложение создано в целях упростить твое взаимодействие с одним из главных навигационных инструментов в нашем замечательном колледже.
      </div>
      <span>Если при взаимодействии с этим приложением у тебя возникли какие либо трудности или ошибки, напиши мне на почту →
        <span><a class="break-normal text-xl font-bold text-teal-600" href="mailto:kib-24@mail.ru">kib-24@mail.ru</a></span>
      </span>
    </modalDialog>
    <div
      class="flex flex-col gap-4 pt-4 items-center bg-white/50 backdrop-brightness-125 backdrop-blur-sm shadow-xl rounded-2xl w-max overflow-hidden"
    >
      <div
        class="w-5/6 transition-all ease-out hover:scale-105 active:scale-100"
      >
        <form action="">
          <select
            v-model="selectedFirst"
            class="p-3 px-10 rounded-full shadow-xl w-full"
            name="courseNumber"
            required="required"
            id="courseNumber"
          >
            <option value="0" disabled hidden>Выберите курс</option>
            <option value="1">1-й Курс</option>
            <option value="2">2-й Курс</option>
            <option value="3">3-й Курс</option>
            <option value="4">4-й Курс</option>
          </select>
        </form>
      </div>
      <div
        :class="{ 'hover:scale-105': selectedFirst != 0 }"
        class="w-5/6 transition-all ease-out active:scale-100"
      >
        <form action="">
          <select
            v-model="selectedGroup"
            :disabled="selectedFirst === 0"
            class="p-3 px-10 rounded-full shadow-xl w-full"
            name="courseNumber"
            required="required"
            id="courseNumber"
          >
            <option value="0" disabled hidden>Выберите группу</option>
            <option v-for="group in filteredGroups()" :value="group">
              {{ group }}
            </option>
          </select>
        </form>
      </div>
      <button
        :disabled="selectedGroup === 0"
        @click="
          router.push({ name: 'timeTable' });
          showTimetable(selectedGroup);
        "
        class="transition-all ease-out text-xl disabled:bg-teal-100 disabled:text-gray-400 disabled:hover:bg-teal-100 hover:bg-teal-700 active:bg-teal-800 bg-teal-500 backdrop-brightness-125 backdrop-blur-sm flex p-5 px-10 items-center justify-center"
      >
        <div>Показать расписание</div>
      </button>
    </div>
    <div class="justify-self-end text-xs opacity-50 select-none">
      powered by
      <i><strong>Konstantin Ivanov</strong></i>
    </div>
  </div>
</template>
<script>
import groupsData from "../JSON/groups.json";

export default {
  data() {
    return {
      selectedFirst: 0,
      selectedGroup: 0,
      groups: [...groupsData],
      dialogVisible: false,
    };
  },
  methods: {
    showTimetable(selectedGroup) {
      this.$emit("selectedGroup", {
        selectedGroup: this.selectedGroup,
      });
    },
    filteredGroups() {
      return this.groups.filter((char) => {
        return char[0] === this.selectedFirst;
      });
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  watch: {
    selectedFirst() {
      this.selectedGroup = 0;
    },
  },
};
</script>
<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const groupsArray = [...groupsData];
</script>
<style src="../style.css" />

<template>
  <transition-group name="component-fade" mode="out-in">
    <li :key="lesson"
    class="bg-white/50 w-full backdrop-brightness-50 backdrop-opacity-10 backdrop-blur-sm gap-3 p-3 px-3 lg:px-7 md:px-3 flex items-center justify-start"
  >
    <p
      class="text-xl flex-shrink-0 text-center p-1 lg:px-4 md:px-1 sm:px-1 rounded-lg bg-white/50 backdrop-brightness-50 backdrop-opacity-10 backdrop-blur-sm"
    >
      {{index+1}}-я пара
    </p>
    <p v-if="lesson!=''" class="text-lg text-start max-w-2xl">
      {{ lesson }}
    </p>
    <p v-else class="text-md text-opacity-50 text-slate-800 text-start max-w-2xl">
      Идём домой!
    </p>
  </li>
</transition-group>
</template>
<script>
export default {
  props: ['lesson', 'index'],
  computed: {
  },
  watch: {
    lesson(){
    }
  }
};

</script>
<style src="../style.css" />

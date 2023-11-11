<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 fixed z-10"
    v-if="show === true"
    @click.stop="hideDialog()"
  >
    <div @click.stop class="lg:p-20 md:p-10 sm:p-10 p-10 bg-white rounded-3xl sm:w-full md:w-10/12 lg:w-1/2 text-xl">
      <slot class="flex flex-col"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "modalDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style src="../../style.css" />

import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import timeTableView from "./components/timeTableView.vue";
import helloScreenView from "./components/helloScreenView.vue";
import "./style.css";
import components from "@/components/UI";

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  base: "/college-Timetable/",

  routes: [
    {
      path: "/",
      name: "helloScreen",
      component: helloScreenView,
    },
    {
      path: "/timetable",
      name: "timeTable",
      component: timeTableView,
    },
  ],
});

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);
app.mount("#app");

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <PageForm></PageForm>
  <!-- <button @click="updateButtonClick()">Click Me</button> -->
</template>

<script>
import PageForm from "./components/PageForm.vue";

export default {
  name: "App",
  components: {
    PageForm,
  },
  data: function () {
    return {
      clickCount: 0,
    };
  },
  methods: {
    // async updateButtonClick() {
    //   this.clickCount += 1;
    //   try {
    //     const response = await fetch("http://localhost:8383/counter", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ counter: this.clickCount }),
    //     });
    //     console.log(response.status);
    //   } catch (e) {
    //     console.error("problem sending counter", e);
    //   }
    // },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

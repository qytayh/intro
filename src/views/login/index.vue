<template>
  <div class="main">
    <login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "./components/login.vue";

export default defineComponent({
  components: { Login },
});
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: rgb(1, 135, 145);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="layout">
    <header-top :show="show" @foldTypeChange="foldTypeChange" />
    <div class="contain">
      <menu-list :show="show" />
      <div class="views">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import MenuList from "./MenuList/index.vue";
import HeaderTop from "./Header/index.vue";

export default defineComponent({
  components: { MenuList, HeaderTop },
  setup() {
    const foldTypeChange = ()=>{
      dataMap.show = ! dataMap.show
    }
    const dataMap = reactive({
      router: useRouter(),
      route: useRoute(),
      show: true,
    });
    return {
      ...toRefs(dataMap),
      foldTypeChange
    }
  },
});
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  .contain {
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    .views{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

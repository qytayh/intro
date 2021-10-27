<template>
  <div class="menuList" v-show="show">
    <el-menu :default-active="0" class="el-menu-vertical-demo">
      <template v-for="(v, i) in menuList" :key="i">
        <el-menu-item
          :index="i"
          v-if="!v.children || v.children.length == 0"
          @click="routeTo(v.path)"
        >
          <span>{{ v.meta.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="i" v-else>
          <template #title>
            <span>{{ v.meta.title }}</span>
          </template>
          <el-menu-item
            :index="`${i}-${k}`"
            v-for="(j, k) in v.children"
            :key="k"
            @click="routeTo(j.path)"
            >{{ j.meta.title }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  setup() {
    const router = useRouter();
    const menuList = computed(() => {
      return router.getRoutes().filter((v) => v.meta?.menu === true);
    });
    const routeTo = (path: string): void => {
      router.push(path);
    };
    return {
      menuList,
      routeTo,
    };
  },
});
</script>

<style lang="less" scoped>
.menuList {
  width: 180px;
  height: calc(100vh - 50px);
  background: #297ba1;
   .el-menu {
     width: 180px;
    --el-menu-active-color: #fff;
    --el-menu-text-color: #fff;
    --el-menu-hover-text-color: #216280;
    --el-menu-background-color: #297ba1;
    --el-menu-hover-background-color: #216280;
    --el-menu-border-color: #297ba1;
    background: rgb(41, 123, 161);
    .el-sub-menu {
      /deep/ .el-menu {
        --el-menu-background-color: #1a729b;
        --el-menu-hover-background-color: #216280;
        --el-menu-item-hover-fill: var(--el-color-primary-light-9);
      }
      .el-menu-item {
        min-width: 100%;
        color: #fff;
      }
    }
  }
}
</style>

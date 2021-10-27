<template>
  <div class="header">
    <div class="container">
      <div class="logo">{{ systemName }}</div>
      <el-icon @click="clickMenuBtn">
        <expand v-show="show" />
        <more-filled v-show="!show" />
      </el-icon>
    </div>
    <div class="container">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
         {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="mine">
              我的
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Expand, MoreFilled } from "@element-plus/icons";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Expand,
    MoreFilled,
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  emits: ["foldTypeChange"],
  setup(props, context) {
    const router = useRouter()
    const clickMenuBtn = (): void => {
      context.emit("foldTypeChange");
    };
    const store = useStore();
    const systemName = computed(() => {
      console.log(store);
      return store.getters["config/getSystemName"];
    });
    const userInfo = computed(() => {
      return store.getters["user/getInfo"];
    });

    const logout = ():void=>{
       ElMessageBox.confirm(
        '请确定是否要退出登录?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '退出成功!',
          })
          router.push("/login")
        })
    }
    const mine = ():void =>{
      router.push('/mine')
    }
    return {
      clickMenuBtn,
      systemName,
      userInfo,
      logout,
      mine
    };
  },
});
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.4);
  padding: 0 20px 0 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 180px;
    }
  }
}
</style>

<template>
  <el-card class="login">
    <template #header>
      <div class="card-header">
        <span>登录</span>
      </div>
    </template>
    <el-form
      ref="loginRef"
      :model="form"
      label-width="80px"
      label-position="left"
      class="form"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="Please input phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="Please input password"
          show-password
        ></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" :loading="loading"  @click="login">登录</el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loginForm } from "@/api/user";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const loginRef = ref(null);
    const login = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (loginRef.value as any).validate((valid: boolean) => {
        if (valid) {
          dataMap.loading = true
          loginForm(dataMap.form).then(async (res) => {
            if (res.code === 200) {
              store.commit("user/updateToken", res.data.token);
              if (dataMap.route.query.redirect) {
                const redirect = dataMap.route.query.redirect as string;
                dataMap.router.replace(redirect);
                return;
              }
              dataMap.router.replace("/");
              return;
            }
            dataMap.loading = false
            ElMessage.error(res.data.msg);
          });
        }
      });
    };
    const dataMap = reactive({
      loading:false,
      router: useRouter(),
      route: useRoute(),
      form: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [
          { required: true, message: "Please input phone", trigger: "blur" },
          {
            pattern: /^1\d{10}$/,
            message: "phone number error",
          },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "Length should be 6 to 18",
            trigger: "blur",
          },
        ],
      },
    });
    return {
      ...toRefs(dataMap),
      login,
      loginRef,
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  width: 500px;
  height: 300px;
  .card-header {
    text-align: center;
  }
  .form {
    padding: 10px 30px;
    .btn {
      width: 80%;
      margin: 0 auto;
      display: block;
    }
  }
}
</style>

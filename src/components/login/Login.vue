<template>
  <div class="login">
    <el-row
      class="login"
      type="flex"
      justify="center"
      align="middle"
    >
      <el-col
        :xs="14"
        :sm="12"
        :md="10"
        :lg="8"
        :xl="6"
      >
        <el-form
          label-position="top"
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-form"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              type="password"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "用户名长度为3到12个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6到12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录事件：
    submitForm(formName) {
      // validate 方法用来实现表单校验
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return false;
        }

        // 校验成功
        // 发送请求到登录接口，完成登录
        axios
          .post("http://localhost:8888/api/private/v1/login", this.loginForm)
          .then(res => {
            // console.log('登录结果：', res)
            if (res.data.meta.status === 200) {
              // 1 登录成功，跳转到后台首页
              // 2 将 token 存储到localStorage中
              localStorage.setItem("token", res.data.data.token);
              // 通过编程式导航实现路由跳转
              // push 方法的参数为：要跳转到的页面路径，与 路由规则 中的path匹配
              this.$router.push("/home");
              this.$message({
                message: res.data.meta.msg,
                type: "success",
                duration: 800
              });
            } else {
              // 登录失败
              this.$message({
                message: res.data.meta.msg,
                type: "error",
                duration: 1000
              });
            }
          });
      });
    },
    // 表单重置：
    resetForm(formName) {
      // resetFields 方法用来重置表单
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}

.login-form {
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
}
</style>

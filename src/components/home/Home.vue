<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-row
        type="flex"
        class="row-bg"
        justify="space-between"
      >
        <el-col :span="6">
          <img
            src="@/assets/images/logo.png"
            alt="黑马程序员"
          >
        </el-col>
        <el-col
          :span="6"
          class="title"
        >电商后台管理系统</el-col>
        <el-col
          :span="4"
          class="desc"
        >
          欢迎上海前端27期星曜会员
          <a
            href="javascript:;"
            class="logout"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :router="true"
          default-active="1-1"
          class="home-header-menu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 第一个菜单： -->
          <el-submenu index="1">
            <!-- 一级菜单标题： -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <!-- 二级菜单： -->
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第二个菜单： -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第三个菜单： -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第四个菜单： -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 第五个菜单： -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 子路由出口： -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",

  methods: {
    // 退出功能
    logout() {
      // 1 弹出确认提示框
      // 2 点击确定按钮时，执行退出操作
      // 3 退出要做什么事情？？？
      //  3.1 清除 token
      //  3.2 返回 login 页面

      // $confirm 是 ElementUI 中的  MessageBox 弹窗
      this.$confirm("您是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定按钮
          this.$message({
            type: "success",
            message: "退出成功"
          });
          // 清除 token
          localStorage.removeItem("token");
          // 返回 login 页面
          this.$router.push("/login");
        })
        .catch(() => {
          // 点击取消按钮
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.el-header {
  padding: 0;
}

.home {
  height: 100%;
  background-color: #eaeef1;

  &-header {
    line-height: 60px;
    background-color: #b3c1cd;
    img {
      width: 200px;
    }

    .title {
      font-size: 30px;
      color: #fff;
      font-weight: bolder;
    }

    .desc {
      min-width: 234px;
      font-weight: bolder;

      .logout {
        color: #daa520;
      }
    }

    &-menu {
      height: 100%;
    }
  }
}
</style>

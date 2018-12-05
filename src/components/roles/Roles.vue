<template>
  <div class="rights">
    <!-- 面包屑导航 -->
    <el-breadcrumb
    class="bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="rolesList"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 遍历权限的树形结构 -->
          <span v-if="scope.row.children.length === 0">
            暂无权限
          </span>
          <!-- 1 先遍历一级权限 -->
          <el-row v-else class="level1" v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="4">
              <el-tag @close="removeUserRight(level1.id, scope.row.id)" closable type="">
                {{ level1.authName }}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">

              <!-- 2 遍历二级权限 -->
              <el-row v-for="level2 in level1.children" :key="level2.id" class="level2">
                <el-col :span="4">
                  <el-tag @close="removeUserRight(level2.id, scope.row.id)" closable type="success">
                    {{ level2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">

                  <!-- 3 遍历三级权限 -->
                  <el-tag @close="removeUserRight(level3.id, scope.row.id)" class="level3" closable type="warning" v-for="level3 in level2.children" :key="level3.id">
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- type="index" 表示该列为索引列 -->
      <el-table-column
        type="index"
        :index="getIndex"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="层级">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" size="mini" plain icon="el-icon-edit"></el-button>
          <!-- 删除 -->
          <el-button type="danger" size="mini" plain icon="el-icon-delete"></el-button>
          <!-- 分配角色 -->
          <el-button type="success" size="mini" plain icon="el-icon-check">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: []
    }
  },

  created () {
    this.getRolesList()
  },

  methods: {
    // 获取角色列表
    async getRolesList () {
      const res = await this.$http.get('/roles')
      this.rolesList = res.data.data
    },

    // 自定义列索引
    getIndex (index) {
      // 此处的index，表示：从 0 开始的索引号
      return index
    },

    // 删除角色的权限
    // 第一个参数：表示 权限id
    // 第二个参数：角色id
    async removeUserRight (rightId, roleId) {
      // console.log(rightId, roleId)
      const res = await this.$http.delete(`/roles/${roleId}/rights/${rightId}`)

      // 刷新列表数据
      this.getRolesList()
      // 提示用户删除结果
      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
    }
  }
}
</script>

<style scoped>
.bread {
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  background-color: #D4DAE0;
  font-size: 16px;
}

.level1 {
  margin-top: 10px;
  border-bottom: 1px dotted #ccc;
}
.level1:last-child {
  border-bottom: 0;
}

.level2 {
  margin-bottom: 10px;
}
.level3 {
  margin: 3px 5px 0 0;
}
</style>

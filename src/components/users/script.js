// 导入axios
import axios from 'axios'

// 邮箱正则
const EMAIL_REG = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
// 手机号码正则
const MOBILE_GER = /^1(3|4|5|7|8)\d{9}$/

export default {
  created () {
    this.getUserList()
  },

  data () {
    return {
      // 用户列表数据
      usersList: [],
      // 总条数
      total: 0,
      // 每页大小
      pagesize: 3,
      // 展示第几页数据
      pagenum: 1,
      // 搜索数据
      searchText: '',

      // 添加用户对话框和表单数据
      dialogFormVisible: false,
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户时的表单验证
      userAddRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名长度为3到12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6到12个字符', trigger: 'blur' }
        ],
        email: [
          // pattern 表示使用正则表达式对数据进行校验
          { pattern: EMAIL_REG, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: MOBILE_GER, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      },

      // 编辑用户数据：
      userEditForm: {
        id: -1,
        username: '',
        email: '',
        mobile: ''
      },
      userEditDailog: false
    }
  },

  methods: {
    // 获取用户列表数据
    async getUserList (pagenum = 1, query = '') {
      // 发送请求，获取用户列表数据
      const config = {
        // GET请求参数
        params: {
        // 每页大小
          pagesize: this.pagesize,
          // 第几页
          pagenum,
          // 查询条件
          query
        },
        // 设置请求头
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }

      // axios.get() 方法返回值就是一个 Promise 对象
      const res = await axios.get('http://localhost:8888/api/private/v1/users', config)

      console.log('用户列表数据为：', res)
      const { meta, data } = res.data
      // pagenum: curPage 表示：从 对象data 中解构出 pagenum 属性，并且起个新的名称叫： curPage
      const { users, total, pagenum: curPage } = data
      // const meta = res.data.meta
      // const data = res.data.data

      if (meta.status === 200) {
      // 成功获取数据
        this.usersList = users
        // 总条数
        this.total = total
        // 设置当前页
        this.pagenum = curPage
      } else {
      // 获取数据失败，跳转到登录页
        this.$router.push('/login')
        // 清空token
        localStorage.removeItem('token')
      }
    },

    // 分页功能
    // 参数 curPage 就表示，当前点击的页数
    changePage (curPage) {
      // console.log('点击分页了', curPage)
      // this.pagenum = curPage

      // 根据 curPage 来获取当前页数据
      this.getUserList(curPage, this.searchText)
    },

    // 搜索功能
    // 每次搜索数据的时候，都应该返回第一页
    search () {
      // console.log('搜索内容为：', this.searchText)
      this.getUserList(1, this.searchText)
    },

    // 修改用户状态
    async changeUserState (curUser) {
      // console.log('changeUserState', curUser.mg_state, curUser.id)

      // 注意：put方法的第三个参数，才是配置对象
      // 第二个参数：表示要传递个接口的数据
      // 第一个参数：请求地址
      // const res = await axios.put(`http://localhost:8888/api/private/v1/users/${curUser.id}/state/${curUser.mg_state}`, null, {
      //   // 设置请求头
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })
      // const res = await this.$http.put(`/users/${curUser.id}/state/${curUser.mg_state}`, null, {
      //   // 设置请求头
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // })

      const url = `/users/${curUser.id}/state/${curUser.mg_state}`
      const res = await this.$http.put(url)

      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      } else {
        // 失败：
        this.$message({
          type: 'error',
          message: res.data.meta.msg
        })
      }
    },

    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('您确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // 发送请求，删除
        const res = await this.$http.delete(`/users/${id}`)
        // const { meta } = res.data
        // if (meta.status === 200) {

        const { meta: { status } } = res.data
        if (status === 200) {
          // 重新获取列表数据
          this.getUserList(1, this.searchText)
        }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      }
    },

    // 展示添加用户对话框
    showUserAddDialog () {
      this.dialogFormVisible = true
    },

    // 添加用户
    async addUser () {
      try {
        await this.$refs.userAddForm.validate()

        // console.log('验证成功')
        const res = await this.$http.post('/users', this.userAddForm)

        const { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          })

          // 关闭添加用户对话框
          this.dialogFormVisible = false
          // 刷新表格数据
          this.getUserList(1, this.searchText)
        }
      } catch (e) { }
    },

    // 对话框关闭
    closeUserAddDialog () {
      // 重置表单
      this.$refs.userAddForm.resetFields()
    },

    // 展示编辑用户对话框
    showEditUserDialog (user) {
      // 展示对话框
      this.userEditDailog = true
      // console.log('当前编辑用户数据：', user)
      // this.userEditForm.username = user.username
      // this.userEditForm.email = user.email
      // this.userEditForm.mobile = user.mobile
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },

    // 编辑用户
    async editUser () {
      // 发送请求，修改数据
      const { id, email, mobile } = this.userEditForm
      const res = await this.$http.put(`/users/${id}`, {
        email,
        mobile
      })

      // console.log(res)
      const { meta } = res.data

      if (meta.status === 200) {
        // 编辑用户成功：
        this.$message({
          type: 'success',
          message: meta.msg
        })

        // 关闭编辑用户对话框
        this.userEditDailog = false
        // 刷新表格数据
        this.getUserList(1, this.searchText)
      } else {
        this.$message({
          type: 'error',
          message: meta.msg
        })
      }

      // const res = await this.$http.put(`users/${this.userEditForm.id}`, {
      //   email: this.userEditForm.email,
      //   mobile: this.userAddForm.mobile
      // })
    }
  }
}

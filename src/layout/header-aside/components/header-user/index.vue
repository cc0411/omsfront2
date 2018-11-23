<template>
  <!--<el-dropdown size="small" class="d2-mr"   trigger="click"  @command="handleCommand">-->
    <!--<span class="btn-text">{{userInfo.name}}</span>-->
    <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-dropdown-item divided command="showInfoList">个人中心</el-dropdown-item>-->
      <!--<el-dropdown-item divided command="logout">注销</el-dropdown-item>-->
      <!--&lt;!&ndash;<el-dropdown-item @click.native="logOff"><d2-icon name="power-off" class="d2-mr-5"/>注销</el-dropdown-item>&ndash;&gt;-->
    <!--</el-dropdown-menu>-->
  <!--</el-dropdown>-->

  <div class="header-user-con">
    <!-- 用户头像 -->
    <div class="user-avator">
      <img :src="userInfo.image">
    </div>
    <!-- 用户名下拉菜单 -->
    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                       {{userInfo.name}}<i class="el-icon-caret-bottom"></i>
                    </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided  command="showInfoList">个人中心</el-dropdown-item>
        <el-dropdown-item divided  command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  // computed: {
  //   ...mapState('d2admin/user', [
  //     'info'
  //   ])
  // },
 props:{
     userInfo:{
         required:true,
         type:Object
     }
 },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),

      handleCommand(cmditem) {
          if (!cmditem) {
              this.$message("菜单选项缺少command属性");
              return;
          }
          switch (cmditem) {
              case "info":
                  this.showInfoList();
                  break;
              case "logout":
                  this.logOff();
                  break;
          }
      },
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true
      })
    },
      showInfoList() {
          // 个人信息
          // this.$router.push("/infoshow");
          console.log('11111')
      },

  }
}
</script>

<style scoped>
  .header-user-con{
    display: flex;
    height: 70px;
    align-items: center;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-name span{
    color:black;
    font-weight: bold;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;

  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }


</style>

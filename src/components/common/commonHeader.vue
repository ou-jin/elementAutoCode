<template>
  <div class="common-header-wrapper row-space-between">
    <div
      class="info-banner-left row-flex-start"
    >
      <img src="static/image/vuejs.png" class="sys-icon">
      <span   style="margin-left: 10px;" class="row-center">
        {{title}}
        <span style="font-size:10px;font-weight:normal;margin-left:5px">{{version}}</span>
      </span>
      <!-- <img src="/static/image/list.png" class="expand_icon" :style="{left:$store.state.sideBarShow?'80px':'170px'}" @click="showSideBar"> -->
    </div>
    <div class="rignt-nav" v-if="needUserBanner">
      <div class="user">
        <span class="title" @click.stop="showUserDropDown()">
          你好，{{ userInfo ? userInfo.userName : '未登录'}}
          <i
            class="el-icon-arrow-down el-icon-caret-bottom"
          ></i>
        </span>
        <div class="user-list" v-if="isShowDropDown">
          <span class="h-arrow-up user-arrow"></span>
          <ul>
            <li  >用户设置</li>
            <li >帮助</li>
            <li  >退出</li>
          </ul>
        </div>
      </div>
    </div>

    <UserSet v-if="$store.state.userSetVisible"></UserSet>
  </div>
</template>

<script>
export default {
  name: "commonHeader",
  created() {
    // this.version = Home_version;
    // this.title = Title
    // this.needUserBanner =
    //   localStorage.getItem("needServuceConfig") === "true" ? false : true;
    // if (this.needUserBanner) this.getUser();
  },
  mounted() {
    this.$nextTick(() => {
      this.$bus.$on("updataUserName", x => {
        this.updataUserName(x);
      });
    });
  },
  beforeDestroy() {
         this.$bus.$off('updataUserName');
  },
  data() {
    return {
      isShowDropDown: false,
      eventList: [
        { label: "用户设置", fcn: "userSet" },
        { label: "帮助", fcn: "userHelp" },
        { label: "退出", fcn: "logout" }
      ],
      userRole: "",
      userInfo: "",
      version: "",
      needUserBanner: true,
      title:'通用脚手架'
    };
  },
  methods: {
    async getUser() {
      const d = await this.db.pd.get("user");
      if (d && d.user) {
        this.userInfo = d.user;
      }
      //  console.log(this.userInfo)
    },
    updataUserName(x) {
      // console.log("updataUserName");
      this.userInfo.userName = x.name;
    },
    showUserDropDown() {
      this.isShowDropDown = !this.isShowDropDown;
    },
    loadHelpDoc(){
      // this.$router.push({ path: "/helpDoc" });
             const {href} = this.$router.resolve({
                    name: "helpDoc"
                });
                window.open(href, '_blank');
    },
    openUserSet() {
      console.log("open");
      this.$store.state.userSetVisible = true;
    },
    logout() {
      localStorage.clear();
      // 清空indexedDb页面数据表
      this.db.pd.clear().then(s => {
        this.db.doc.clear().then(x => {
          this.$router.push({ path: "/login" });
        });
      });
      // this.$router.push({path: '/login'})
    },
    showSideBar() {
      this.$store.dispatch("updateSideBarShow", !this.$store.state.sideBarShow);
    },
    userSet() {},
    distributeEvent(s) {
      console.log("distributeEvent");
      console.log(s);
      switch (s) {
        case "logout":
          this.logout();
          break;
        case "userHelp":
          this.userHelp();
          break;
        default:
          break;
      }
    },
    roleChange(s) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang='less'>
.rignt-nav {
  margin-right: 20px;
}
.h-arrow-up {
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  border-width: 6px;
}
.user {
  line-height: 50px;
  font-size: 12px;
  position: relative;
  .title {
    color: #00c1de !important;
    cursor: pointer;
  }
  .user-list {
    background: #252a2f;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 11;
    width: 110px;
    color: #fff;
    text-align: center;
    .user-arrow {
      position: absolute;
      top: -12px;
      left: 45%;
      border-style: solid dashed dashed dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
      border-color: transparent transparent #252a2f transparent;
    }
    li {
      line-height: 34px;
    }
    li:hover {
      color: #00c1de;
      cursor: pointer;
    }
  }
}

.common-header-wrapper {
  width: 100%;
  height: 50px;
  background: rgb(65, 69, 73);
  //  background: #fff;
  box-shadow: 0px 1px 10px 1px #eaeaea;
}
.common-header-wrapper .logo {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  padding: 10px;
}
.common-header-wrapper .title {
  display: inline-block;
  vertical-align: middle;
  color: #666;
  line-height: 60px;
}
.common-header-wrapper .logout {
  font-size: 16px;
  color: #666666;
  line-height: 60px;
  margin-right: 20px;
}
.common-header-wrapper .logout-icon {
  width: 20px;
  height: 20px;
  background: url("/static/image/logout.svg") no-repeat center center;
  -webkit-background-size: contain;
  background-size: contain;
}
.user_icon {
  height: 40px;
  width: 40px;
  margin-right: 15px;
}
.info-banner {
  width: 200px;
  height: 100%;
}
.info-banner-left {
  // padding-left:20px;
  width: 300px;
  height: 100%;
  // border-right: 1px solid #eaeaea;
  background: #414549;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.sys-icon {
  width: 31px;
  height: 29px;
  margin-right: 10px;
  margin-left: 12px;
}
.expand_icon {
  width: 16px;
  height: 14px;
  left: 240px;
  position: absolute;
  cursor: pointer;
}
.l-icon {
  position: absolute;
  width: 25px;
  height: 35px;
  right: 15px;
  top: 25px;
}
</style>
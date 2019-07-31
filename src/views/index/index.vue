<template>
  <el-container class="index-wrapper" >
    <el-header style="height:50px" >
      <commonHeader ref='commomHeader'></commonHeader>
    </el-header>
    <el-container class="main-container">
      <sideBar></sideBar>
      <el-main >
        <router-view  :key="key"></router-view>
      </el-main>
    </el-container>
       <div class="loading" v-if="$store.state.loading">
            <i class="el-icon-loading"></i> 请稍等……
        </div>
  </el-container>
</template>

<script>

export default {
    name: "index",
    created(){
        // if(localStorage.getItem("OrganizationID")!==''){
        //     localStorage.setItem("OrganizationID","hzlckqyy")
        // }
    },
    computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
        }
     }
}
</script>

<style >
.index-wrapper {
  height: 100%;
   min-width: 1850px;
  overflow-x: auto;
  background: #EAEDF2;
}
.index-view {
  height: 100%;
 
}
.index-wrapper .el-main {
   padding: 10px !important;
}
.index-wrapper .el-header {
   padding: 0;
  height: 50px !important;
}
.index-wrapper .main-container {
  height: 100%;
  padding-left:64px;
  position: relative;
}
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 1000;
  font-size: 16px;
  background: #fff;
  padding: 10px 20px;
  border: 2px solid #f5f5f5;
  color: #00c1de;
}

</style>
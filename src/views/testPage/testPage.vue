<template>
  <div class="content column-start-center">
    <div class="oprate_banner row-flex-start">
      <div class="ordinary_but" @click="status='form'">表单</div>
      <div class="ordinary_but" @click="status='table'">表格</div>
    </div>
    <div class="main_banner column-start-center">
      <basicForm :opt="formOpt" v-if="status==='form'"></basicForm>
      <basicTable :opt="tableOpt" v-if="status==='table'" @click1="click1"></basicTable>
    </div>
  </div>
</template>
<script>
//   let vdocument =document.open()
// console.log(vdocument)
export default {
  created() {},

  computed: {},
  data() {
    return {
      status: "form",
      formOpt: {},
      tableOpt: {}
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
.index-wrapper {
  height: 100%;
}
.tem_input {
  height: 300px;
  width: 380px;
  border: #efefef 1px solid;
}
.oprate_banner {
  padding: 20px;
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
  background: #ffffff;
}
.main_banner {
  width: 100%;
  overflow-y: auto;
  flex: 1;
  background: #ffffff;
}
.form_box {
  width: 600px;
  height: 100%;
  overflow: auto;
  padding: 50px;
  font-size: 16px;
  color: #474646;
}
.left_banner {
  height: 100%;
  width: 45%;
  padding: 20px;
  border: 1px solid #efefef;
}
.middle_banner {
  height: 100%;
  width: 10%;
  padding: 20px;
  border: 1px solid #efefef;
}
.right_banner {
  height: 100%;
  width: 45%;
  border: 1px solid #efefef;
}
.index-wrapper .el-header {
  padding: 0;
}
.index-wrapper .main-container {
  height: 100%;
}
</style>
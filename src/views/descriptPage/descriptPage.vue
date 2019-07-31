<template>
  <div class="content column-start-center">
    <div class="main_banner column-start-center">
      <div class="descript_banner">
          <h1 id="h1-u754Cu9762u5FEBu901Fu6210u578B">
            <a name="界面快速成型" class="reference-link"></a>
            <span class="header-link octicon octicon-link"></span>界面快速成型脚手架
          </h1>
          <p>
            <strong>说明</strong> 基于快速响应开发背景下为节约开发成本，以vue和element为底层支持下开发的一款用于快速生成表单和表格页面的项目脚手架
          </p>
          <p>
            <strong>使用说明</strong> 在成功启动项目后前往表格与表单生成页根据实际需求完成页面与事件的配置，可将配置信息拷贝至测试页面的配置信息中查看效果，（由代码拷贝造成的格式问题可由IDE自动格式化）
          </p>
          <p>
            <strong>其他配置说明</strong>
          </p>
          <p>
            <strong>页面配置</strong> 在
            <strong>view</strong>文件夹下创建页面文件夹对相同名称的页面文件，然后前往
            <strong>configFile/pageConfig.js</strong>下声明页面即可，如侧边栏需要图标在<strong>static/icon</strong>下放入同名svg文件即可
          </p>
          <p>
            <strong>api交互</strong> 支持proto与json两种通讯格式，已将对应的axios实例挂载到vue原型上，选择对应的实例进行调用即可
          </p>
      </div>
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
  methods: {}
};
</script>
<style lang="scss">
.main_banner {
  width: 100%;
  overflow-y: auto;
  flex: 1;
  background: #ffffff;
}
.descript_banner {
  width: 800px;
  height: 100%;
  line-height: 30px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
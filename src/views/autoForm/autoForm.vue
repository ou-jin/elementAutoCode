<template>
  <div class="content column-start-center">
    <!-- <div class="oprate_banner row-flex-start">
      <el-popover placement="right" width="400" trigger="click" @hide="temHide" @show="temJson=''">
        <textarea type="textarea" class="tem_input" v-model="temJson"></textarea>
        <div class="ordinary_but" @click="showStatus='produce'" slot="reference">输入模板</div>
      </el-popover>

      <div class="ordinary_but" @click="showStatus='produce'">dom生成页面</div>
      <div class="ordinary_but" @click="resetDom">重置dom</div>
      <div class="ordinary_but" @click="tableToForm">预览表单</div>
      <div class="ordinary_but" @click="tableToJson">获取表单json</div>
      <div class="ordinary_but" @click="showStatus='verify'">验证表单json</div>
    </div>-->
    <div class="main_banner row-flex-start">
      <div class="left_table_banner">
        <domProduceTable
          :opt="domEditTable"
          height="92.5vh"
          :expandAll="expandAll"
          @addSonDom="addSonDom"
          @addBrotherDom="addBrotherDom"
          @delDom="delDom"
          @addDomSelect="addDomSelect"
          @addLabel="addLabel"
          @updataNode="updataNode"
          @labelShow="labelShow"
        ></domProduceTable>
      </div>
      <div class="middle_oprate_banner column-center">
        <!-- <i class="el-icon-d-caret transform_icon"></i> -->
        <div class="ordinary_but oprate_but" @click="showStatus='param'">参数说明</div>
        <div class="ordinary_but oprate_but" @click="showStatus='explain'">使用说明</div>
        <div class="ordinary_but oprate_but" @click="instanceShow">示例展示</div>
        <div class="ordinary_but oprate_but" @click="getFormConfig">获取配置</div>
      </div>
      <div class="right_temple_input">
        <!-- 示例展示 -->
        <basicForm :opt="domShowForm" v-if="showStatus==='form'"></basicForm>
        <!-- 获取配置 -->
        <div class="content" v-if="showStatus==='json'">
          <pre class="content" v-highlightjs><code class="javascript">
            {{this.domShowForm}}
        </code></pre>
        </div>
        <!-- 使用说明 -->
        <div v-if="showStatus==='explain'" class="explain_banner">
          <b style='font-size:20px;'>该工具用于生成基于element的表单组件的配置项</b>
          <br /><span style='font-size:15px;line-height:30px;font-weight:bold'>参数配置说明</span>
          <br /><b>1,</b> 按照具体的参数说明在左侧配置表格填写所需参数
          <br /><b>2,</b> 配置完成后点击获取配置即可获取对应的配置参数
          <br /><b>3,</b> 在生成参数后可手动对参数进行调整已达到目标效果
          <br /><b>4,</b> 在目标页面使用组件<span style="color:#409EFF">{{explainSentence}}</span>
          在当前页面实例<span style="color:#409EFF">data</span>中定义组件的参数对象<span style="color:#409EFF">formOpt</span>,将之前生成的参数集合赋给formOpt即可
          <br /><b>5,</b> 关于表单赋值展示数据与提交数据:生成的配置对象中将包含data对象,为表单数据的实时绑定对象,其值为表单当前所展示数据的实时值,更新该值即可更新表单的页面展示

          <br /><span style='font-size:15px;line-height:30px;font-weight:bold'>绑定事件说明</span>
          <br /><b>1,</b>在配置项中传入<span style="color:#409EFF">fcn</span>字段,例如：<span style="color:#409EFF">fcn:'inputChangeEvent'</span>
          则会在<span style="color:#409EFF">basicForm组件内</span>自动分发函数名为<span style="color:#409EFF">inputChangeEvent</span>
          的事件
          <br /><b>2,</b>于此同时在<span style="color:#409EFF">basicForm组件内</span>对传入的事件进行监听则可在父组件内对事件进行处理
          <br /><b>例如</b><span style="color:#409EFF">{{explainSentence1}}</span>
          <br /><b>3,</b> 左侧配置项只对基础事件做绑定处理,例如控件的change事件,如需绑定额外事件可在配置项生成后自行手动修改配置项

          <br /><span style='font-size:15px;line-height:30px;font-weight:bold'>多层表单配置说明</span>
          <br /><b>1,</b> 父项类型选择link,点击新增下级即可新增子项
          <br /><b>2,</b> 子项的关联字段为父项选择项内某个选项所对应的参数值值
          <br /><b>3,</b> 在父项选择该选择项后即可展示该选择项所对应的子项
        </div>

         <!-- 参数说明 -->
        <div v-if="showStatus==='param'" class="explain_banner">
          <b style='font-size:20px;'>该工具用于生成基于element的表单组件的配置项</b>
          <br /><span style='font-size:15px;line-height:30px;font-weight:bold'>参数说明</span>
          
          <br /><b>label</b> 标签文本宽度
          <br /><b>pd</b> 用于渲染表单样式集合
          <p style='color:#909399;font-size:14px;margin-left:20px'>type:控件类型</p>
          <p style='color:#909399;font-size:14px;margin-left:20px'>width:控件宽度</p>
          <p style='color:#909399;font-size:14px;margin-left:20px'>prop:控件所绑定字段</p>
          <p style='color:#909399;font-size:14px;margin-left:20px'>label:控件标签</p>
          <p style='color:#909399;font-size:14px;margin-left:20px'>opt:控件选择项，用于select,radio等控件</p>
          <p style='color:#909399;font-size:14px;margin-left:30px'>label:选择项标签</p>
          <p style='color:#909399;font-size:14px;margin-left:30px'>prop:选择项绑定值</p>
          <br /><b>data</b> 表单绑定对象
          <br /><b>formRule</b> 表单验证规则
          <p style='color:#C0C4CC;font-size:14px'>除了上述值以外,可按照element原生表单参数规则对组件进行传参,在生成参数后可进行手动调整</p>
       
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//   let vdocument =document.open()
// console.log(vdocument)
export default {
  created() {
    this.vdocument = document.createDocumentFragment();
    let documentNode = this.createDomNode("ancestor");
    documentNode.appendChild(this.createDomNode("ancestor_0"));
    this.vdocument.appendChild(documentNode);
    this.render();
  },

  computed: {
    tableData() {
      return this.domEditTable.data;
    }
  },
  data() {
    return {
      temJson: "",
      explainSentence:" <basicForm :opt='formOpt'></basicForm>",
      explainSentence1:" <basicForm :opt='formOpt' @inputChangeEvent='(s)=>{dealEvent(s)}'></basicForm>",
      expandAll: true,
      showStatus: "form",
      formJson: "",
      domDefaultData: {
        width: "350px",
        type: "input",
        mustFill: "是",
        label: "测试"
      },
      domShowForm: {
        label: "80px",
        pd: [],
        data: {}
      },
      verifyJson: "",
      domVerifyForm: {
        label: "200px",
        pd: [],
        data: {}
      },
      domJson: "",
      domRuleJson: "",
      domEditTable: {
        data: [],
        pd: [
          {
            label: "类型",
            prop: "type",
            type: "select",
            width: "200px",
            opt: [
              { label: "input", prop: "input" },
              { label: "select", prop: "select" },
              { label: "link", prop: "link" },
              { label: "radio", prop: "radio" }
            ],
            fcn: "updataNode"
          },
          { label: "标签", prop: "label", type: "input", fcn: "updataNode" },
          { label: "宽度", prop: "width", type: "input", fcn: "updataNode" },
          {
            label: "监听字段",
            prop: "prop",
            type: "input",
            fcn: "updataNode"
          },
          {
            label: "关联字段",
            prop: "linkProp",
            type: "input",
            fcn: "updataNode"
          },

          {
            label: "方法",
            prop: "fcn",
            type: "input",
            fcn: "updataNode"
          },
          {
            label: "是否必填",
            prop: "mustFill",
            type: "select",
            opt: [{ label: "是", prop: true }, { label: "否", prop: false }],
            fcn: "updataNode"
          },
          {
            label: "操作",
            type: "butGroup",
            fix: "right",
            width: "350",
            butList: [
              { text: "新增下级", fcn: "addSonDom" },
              { text: "新增平级", fcn: "addBrotherDom" },
              { text: "选择项", fcn: "addDomSelect" },
              { text: "删除", fcn: "delDom" }
            ]
          }
        ]
      },
      domTree: {},
      vdocument: {}
    };
  },
  methods: {
    // 获取配置
    getFormConfig() {
      this.showStatus = "";
      this.$nextTick(()=>{
      this.showStatus = 'json'
      })
      this.fcn.copyToClipboard(JSON.stringify(this.domShowForm))
      this.$message('已为您复制配置到黏贴板')
    },
    // 示例展示
    instanceShow() {
      this.showStatus = "form";
      // this.render();
    },
    temHide() {
      // this.domVerifyForm.pd = JSON.parse(this.verifyJson);
      if (this.showStatus !== "produce") return;
      this.jsonToDom();
    },
    veifyJson(jsonStr) {
      this.domVerifyForm.pd = JSON.parse(this.verifyJson);
    },
    resetDom() {
      let ancestorNode = this.vdocument.getElementById("ancestor");
      ancestorNode.innerHTML = "";
      ancestorNode.appendChild(this.createDomNode("ancestor_0"));
      this.render();
    },
    tableToForm() {
      this.showStatus = "show";
      this.render();
    },
    updataNode(x) {
      let data = Object.assign({}, x.row);
      delete data.children;
      delete data.parent;
      this.vdocument
        .getElementById(x.row.id)
        .setAttribute("class", JSON.stringify(data));
      this.tableToForm();
    },
    tableToJson() {
      this.showStatus = "json";
      this.domJson = JSON.stringify(this.domShowForm.pd);
      this.domRuleJson = JSON.stringify(this.domShowForm.formRule);
    },
    createDomNode(id, data) {
      let classData = Object.assign({}, data);
      delete classData.children;
      delete classData.parent;
      let classStr = data
        ? JSON.stringify(classData)
        : JSON.stringify(this.domDefaultData);
      let element = document.createElement("div");
      element.id = id;
      // element.setAttribute("class", classStr);
      return element;
    },
    getNodeData(id, node) {
      // let nodeData = Array.prototype.slice.call(this.domEditTable.data);
      console.log(node);
      let result = {};
      node.forEach((x, index) => {
        if (x.id === id) {
          result = Object.assign({}, x);
          return false;
        }
        if (x.children) {
          this.getNodeData(id, x.children);
        }
      });
      return result;
    },
    jsonToDom() {
      if (this.temJson === "") return;
      // 清空dom树
      let ancestorNode = this.vdocument.getElementById("ancestor");
      ancestorNode.innerHTML = "";
      ancestorNode.appendChild(this.createDomNode("ancestor_0"));
      console.log(ancestorNode);
      // 重写渲染
      this.render();
      // 生成新的dom树
      let list = JSON.parse(this.temJson);
      console.log("list");
      console.log(list);
      let _self = this;
      function rendertoDom(node) {
        list.forEach((x, index) => {
          let data = Object.assign({}, x);
          data.id = x.prop;
          // delete data.children;
          _self.addBrotherDom({ row: data });
          if (x.children) {
            redertoDom(x.children);
          }
        });
      }
      rendertoDom(list);
      // 再次渲染
      this.render();
    },
    render() {
      let ancestorNode = this.vdocument.getElementById("ancestor");
      let tablePd = [];
      let formData = {};
      let formRule = {};
      let _self = this;
      function domToTable(node, pd) {
        if (node.childNodes.length > 0) {
          let children = [];
          node.childNodes.forEach((x, index) => {
            let nodeClass = x.getAttribute("class");
            let defaultData = {
              width: "350px",
              type: "input",
              mustFill: "是",
              prop: "test",
              label: "测试",
            };
            let pdData = nodeClass ? JSON.parse(nodeClass) : defaultData;
            if (pdData.prop) {
              formData[pdData.prop] = pdData.dataDefault
                ? pdData.dataDefault
                : "";
            }
            if (pdData.mustFill && pdData.prop) {
              formRule[pdData.prop] = [
                {
                  required: true,
                  message: pdData.label + "为空",
                  trigger: "blur"
                }
              ];
            }
            pd.push(Object.assign(pdData, { id: x.id }));
            if (x.childNodes.length > 0) {
              pd[index].children = [];
              domToTable(x, pd[index].children);
            }
          });
        }
      }
      try {
        domToTable(ancestorNode, tablePd);
        this.domEditTable.data = Array.prototype.slice.call(tablePd);
        this.domShowForm.pd = this.pdConfigToFormConfig(tablePd)
        this.domShowForm.data = Object.assign({}, formData);
        this.domShowForm.formRule = Object.assign({}, formRule);
      } catch (e) {
        console.log(e);
        this.$message("配置错误,请检查");
      }
    },
    pdConfigToFormConfig(pd){
      let res = []
      pd.forEach(x=>{
        let itemOpt = Object.assign({},x)
        delete itemOpt._expanded
        delete itemOpt._level
        delete itemOpt._show
        res.push(itemOpt)
      })
      return res
    },
    addSonDom(s) {
      console.log(s);
      let parentNode = this.vdocument.getElementById(s.row.id);
      parentNode.appendChild(
        this.createDomNode(
          parentNode.id +
            "_" +
            (parentNode.childNodes.length === 0
              ? "0"
              : parentNode.childNodes.length),
          s.row
        )
      );
      this.render();
    },
    addBrotherDom(s) {
      let parentNode = this.vdocument.getElementById(s.row.id).parentNode;
      console.log(parentNode);
      // console.log(parentNode.childNodes);
      parentNode.appendChild(
        this.createDomNode(
          parentNode.id +
            "_" +
            (parentNode.childNodes.length === 0
              ? "0"
              : parentNode.childNodes.length),
          s.row
        )
      );
      this.render();
    },
    addLabel(s, labelData) {
      s.row.opt = labelData;
      this.updataNode(s);
      // this.domEditTable.data[s.$index].opt = labelData;
    },
    labelShow(s, labelData) {
      // console.log(s)
      // console.log(labelData)
    },
    delDom(s) {
      console.log(s);
      if (s.row.id === "ancestor_0") return;
      let parentNode = this.vdocument.getElementById(s.row.id).parentNode;
      let node = this.vdocument.getElementById(s.row.id);
      parentNode.removeChild(node);
      this.render();
    },
    addDomSelect(s) {}
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
.explain_banner {
  color: #303133;
  font-size: 15px;
  line-height: 35px;
  height: 100%;
}
.oprate_banner {
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
  background: #ffffff;
}
.transform_icon {
  color: #21c0db;
  font-size: 40px;
  transform: rotate(90deg);
  cursor: pointer;
}
.temple_input {
  border: dashed 1px #a8a1a1;
  border-radius: 5px;
}
.main_banner {
  width: 100%;
  flex: 1;
  background: #ffffff;
  .left_table_banner {
    width: 1100px;
    height: 100%;
  }
  .middle_oprate_banner {
    width: 100px;
    height: 100%;
    background: #eaedf2;
    .oprate_but {
      margin-bottom: 10px;
    }
  }
  .right_temple_input {
    flex: 1;
    height: 100%;
    padding: 30px;
    border-radius: 5px;
    overflow-y: auto;
  }
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
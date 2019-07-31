<template>
  <el-form
    v-on="$listeners"
    v-bind="$attrs"
    :model="obj.data"
    :rules="obj.formRule"
    :label-width="obj.label "
    class="basic_form"
    ref="basicForm"
  >
    <el-form-item
      :prop="item.prop"
      :label="item.label"
      id="form-item"
      class="form-item"
      v-for="(item,i) in obj.pd"
      :key="i"
      :class="item.isActive?'active_banner':''+';'+item.noLable?'noLable':''"
    >
      <!-- <el-dropdown v-if="item.alternative" class="title">
        <span class="el-dropdown-link">
          {{item.label}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="it in item.alternative"
            :key="it.label"
            @click.native="dropDownClick({index:i,oldVal:item,val:it})"
          >{{it.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- <span
        class="title nowrap"
        v-if="!item.alternative"
        :title="item.label"
        :style="{width:obj.label}"
      >{{item.label}}</span>-->

      <div class="modelSelect row-flex-start" v-if="item.type==='modelSelect'">
        <div class="descrit_text">{{item.modelLabel}}</div>
        <div class="separate_line"></div>
        <div
          class="expand_plugin_icon"
          :class="obj.data[item.prop]==='collapse'?'r_expand':'b_expand'"
          @click="
         obj.data[item.prop]= obj.data[item.prop]==='collapse'?'expansion':'collapse'
         linkChange(item,obj.data[item.prop],i)"
        ></div>
      </div>
      <el-input
        id="passwordInput"
        clearable
        v-model="obj.data[item.prop]"
        v-if="item.type==='password'"
        :type="item.inputType"
        :disabled="item.disabled"
        @change="item.fcn?$emit(item.fcn,scope):defuthed()"
        :style="{width:item.width}"
      ></el-input>
      <div
        class="password_icon row-center"
        @mousedown="()=>{item.inputType='text'}"
        @mouseup="()=>{item.inputType='password'}"
        v-if="item.type==='password'&&obj.data[item.prop]"
      >
        <i class="el-icon-view"></i>
      </div>
      <el-input
        clearable
        v-model="obj.data[item.prop]"
        v-if="item.type==='input'||item.type==='string'"
        :disabled="item.disabled"
        @change="item.fcn?$emit(item.fcn,scope):defuthed()"
        :style="{width:item.width}"
      ></el-input>
      <el-input
        clearable
        v-model="obj.data[item.prop]"
        @change="item.fcn?$emit(item.fcn,scope):defuthed()"
        v-if="item.type==='textarea'"
        type="textarea"
        :style="{width:item.width}"
        :disabled="item.disabled"
      ></el-input>
      <el-select
        v-model="obj.data[item.prop]"
        placeholder="请选择"
        @visible-change="loadSelectOpt(item)"
        v-if="item.type==='link'"
        :style="{width:item.width}"
        @change="s=>linkChange(item,s,i)"
        clearable
      >
        <el-option v-for="(it,i) in item.opt" :key="i" :label="it.label" :value="it.prop"></el-option>
      </el-select>
      <el-select
        v-model="obj.data[item.prop]"
        placeholder="请选择"
        v-if="item.type==='select'"
        @visible-change="loadSelectOpt(item)"
        :style="{width:item.width}"
        @change="s=>item.fcn?$emit(item.fcn,s):defuthed()"
        clearable
      >
        <el-option v-for="(it,i) in item.opt" :key="i" :label="it.label" :value="it.prop"></el-option>
      </el-select>
      <el-checkbox-group
        v-model="obj.data[item.prop]"
        v-if="item.type==='checkbox'"
        :style="{width:item.width}"
      >
        <el-checkbox v-for="(check,i) in item.opt" :label="check.label" :key="i">{{check.label}}</el-checkbox>
      </el-checkbox-group>

      <!-- <el-radio-group
        v-model="obj.data[item.prop]"
        v-if="item.type==='radio'"
        :style="{width:item.width}"
      >
        <el-radio v-for="(check,i) in item.opt" :label="check.prop" :key="i">{{check.label}}</el-radio>
      </el-radio-group> -->

      <el-radio-group
        v-model="obj.data[item.prop]"
        v-if="item.type==='radio'"
        :style="{width:item.width}"
      >
        <el-radio v-for="(check,i) in item.opt" :key="i" :label="check.prop">{{check.label}}</el-radio>
      </el-radio-group>
      <el-date-picker
        v-model="obj.data[item.prop]"
        type="date"
        placeholder="选择日期"
        v-if="item.type==='date'"
        value-format="yyyy-MM-dd"
        :style="{width:item.width}"
        @change="item.fcn?$emit(item.fcn,scope):defuthed()"
      ></el-date-picker>
      <el-time-picker
        :style="{width:item.width}"
        v-model="obj.data[item.prop]"
        :default-time="['00:00:00', '23:59:59']"
        value-format="HH:mm:ss"
        placeholder="选择时间"
        v-if="item.type==='time'"
        @change="item.fcn?$emit(item.fcn,scope):defuthed()"
      ></el-time-picker>
      <div v-if="item.type==='butGroup'">
        <div
          v-for="(it,i) in item.butList"
          :class="i===0?'ordinary_but':'transparent_but'"
          :type="it.type?it.type:'primary'"
          :key="i"
          style="margin-top:2px"
          @click="it.fcn?$emit(it.fcn,obj.data):defuthed()"
        >{{it.text}}</div>
      </div>
      <div v-if="item.type==='number'">
        <el-input-number
          :style="{width:item.width}"
          v-model="obj.data[item.prop]"
          @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          :min="item.min"
          :max="item.max"
        ></el-input-number>
      </div>
      <div v-if="item.type==='double'" class="row-flex-start">
        <div v-for="(it,i) in item.pdList" :key="i">
          <el-input-number
            v-if="it.type==='number'"
            :style="{width:it.width}"
            v-model="obj.data[it.prop]"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
            :min="it.min"
            :max="it.max"
          ></el-input-number>
          <el-select
            v-model="obj.data[it.prop]"
            placeholder="请选择"
            v-if="it.type==='select'"
            :multiple="it.multiple "
            :style="{width:it.width}"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
            @visible-change="item.visiblefcn?$emit(item.visiblefcn,scope):defuthed()"
            clearable
          >
            <el-option v-for="(sit,i) in it.opt" :key="i" :label="sit.label" :value="sit.prop"></el-option>
          </el-select>
        </div>
      </div>
      <el-tooltip
        :content="item.fieldDescription"
        placement="top"
        v-if="item.fieldDescription&&item.itemType"
      >
        <i v-if="item.fieldDescription&&item.itemType" class="plug_icon" :class="item.itemType"></i>
      </el-tooltip>
      <!-- <i v-if="item.fieldDescription" :title="item.fieldDescription" class="question_icon"></i> -->
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  inheritAttrs: false,
  created() {
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // obj() {
    //   console.log("new  data come");
    //   // 将父组件的数据过渡到子组件
    //   console.log(this.opt);
    //   return Object.assign({}, this.opt);
    // }
    obj() {
      return this.opt;
    }
  },
  data() {
    return {
      pdlist: []
    };
  },
  methods: {
    defuthed() {},
    submitEvent(fcn) {
      if (this.fcn.checkNull(fcn)) this.$emit(fcn);
    },

    /* 
    功能：
      删除opt内非选中项对应的dom，添加选中项所对应的dom
    字段：
      linkProp:children内与opt内对应选项的prop一一对应
      linkFlag:用于表述多层展开的层级关系,子级的linkFlag===父级的prop
    参数：
      item:该选项组描述信息
      flag:所选择的数据
      index:选中组对应的位置
    */
    linkChange(item, flag, index) {
      let pdList = Array.prototype.slice.call(this.obj.pd);
      function deleteOtherItem(pd) {
        pd.forEach(x => {
          let itemIndex = pdList.findIndex(y => {
            return x.prop === y.prop;
          });
          if (itemIndex !== -1) pdList.splice(itemIndex, 1);
          if (x.children) deleteOtherItem(x.children);
        });
      }
      deleteOtherItem(item.children);
      this.obj.pd = pdList;
      this.obj.pd.map(x => {
        if (x.isActive) x.isActive = false;
      });
      // let children = Array.prototype.slice.call(item.children);
      // let addpd = children.filter(x => {
      //   return x.linkProp === flag;
      // });

      // addpd.forEach((e, i) => {
      //   this.obj.pd = this.fcn.insertArray(
      //     index+i, // 注意：插入位置要跟随变化
      //     Array.prototype.slice.call(this.obj.pd),
      //     [e]
      //   );
      //   console.log(this.obj.pd)

      //   e.isActive = true;
      //   if (e.type === "link")this.linkChange(e, this.obj.data[e.prop], index - i + 1);
      // });
      function addOtherItem(item, flag, obj) {
        let children = Array.prototype.slice.call(item.children);
        let insertArr = [];
        let addpd = children.filter(x => {
          return x.linkProp === flag;
        });
        console.log(addpd)
        addpd.forEach((e, i) => {
          insertArr.push(e);
          if (e.type === "link") {
            insertArr.push(...addOtherItem(e, obj[e.prop], obj));
          }
        });
        return insertArr;
      }
      this.obj.pd = this.fcn.insertArray(
        index,
        Array.prototype.slice.call(this.obj.pd),
        addOtherItem(item, flag, this.obj.data)
      );
    },
    //获取下拉列表
    async loadSelectOpt(s) {
      if (s.typeCode && s.opt.length === 0) {
        let d = await this.api.getdicmsg({ data: { typeCode: s.typeCode } });
        if (d.data.length === 0) return;
        s.opt = d.data.map(x => {
          return {
            label: x.itemName,
            prop: x.itemCode
          };
        });
      }
    },
    dropDownClick(s) {
      this.obj.pd[s.index].label = s.val.label;
      this.obj.pd[s.index].prop = s.val.prop;
    }
  }
};
</script>
 <style lang="scss">
.basic_form {
  .el-form-item {
    .el-form-item__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-form-item__content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      // margin-left: 0px !important;
      .title {
        //  width: 20%;
        font-size: 12px;
        margin-right: 15px;
      }
      .el-input {
        .el-input__inner {
          border: 1px solid rgba(192, 192, 192, 1);
          border-radius: 0px;
        }
      }
    }
  }
}
.basic_form {
  .noLable {
    margin-left: 0px;
    .el-form-item__content {
      margin-left: 0px !important;
    }
  }
}
.moderLine {
  position: relative;
}
.moderLine::before {
  contain: "";
  position: absolute;
  top: -9px;
  width: 100%;
  border: 1px dashed #21c0db;
}
.modelSelect {
  width: 100%;
  .descrit_text {
    font-size: 14px;
    color: #21c0db;
    margin-right: 10px;
  }
  .separate_line {
    border: 1px dashed #21c0db;
    flex: 1;
  }
  .expand_plugin_icon {
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
    width: 15px;
    // background: url("/static/image/plugConf/plugin_expand.png") no-repeat center
    //   center;
    // -webkit-background-size: contain;
    // background-size: contain;
  }
  .r_expand {
    background: url("/static/image/plugConf/r_expand.png") no-repeat center
      center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .b_expand {
    background: url("/static/image/plugConf/b_expand.png") no-repeat center
      center;
    -webkit-background-size: contain;
    background-size: contain;
  }
}
.descrit_banner {
  height: 100%;
  width: 100px;
}
.question_icon {
  height: 15px;
  margin-top: 8px;
  margin-left: 10px;
  cursor: pointer;
  width: 15px;
  background: url("/static/image/checkInfo/question_mark.png") no-repeat center
    center;
  -webkit-background-size: contain;
  background-size: contain;
}
.plug_icon {
  height: 15px;
  margin-top: 8px;
  margin-left: 10px;
  cursor: pointer;
  width: 15px;
}
.db {
  background: url("/static/image/plugConf/task_db.png") no-repeat center center;
  -webkit-background-size: contain;
  background-size: contain;
}
.business {
  background: url("/static/image/plugConf/plug_buss.png") no-repeat center
    center;
  -webkit-background-size: contain;
  background-size: contain;
}
.other {
  background: url("/static/image/plugConf/task_other.png") no-repeat center
    center;
  -webkit-background-size: contain;
  background-size: contain;
}
.plug {
  background: url("/static/image/plugConf/plug.png") no-repeat center center;
  -webkit-background-size: contain;
  background-size: contain;
}
.inline {
  margin-top: 10px;
}
.password_icon {
  position: absolute;
  color: #cac8c8;
  width: 32px;
  height: 32px;
  right: 30px;
  cursor: pointer;
}
.active_banner {
  // border: 1px solid #dddddd
  // background: #edf3f7;
  .el-input__inner {
    background: #f8fafa;
  }
}
</style>
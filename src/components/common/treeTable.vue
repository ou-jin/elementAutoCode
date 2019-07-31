<template>
  <div>
    <el-table
      v-on="$listeners"
      v-bind="$attrs"
      :data="formatData"
      :header-cell-class-name="headerClass"
      :row-style="showRow"
      
    >
      <el-table-column v-if="obj.indexAble" type="index" width="50"></el-table-column>
      <el-table-column type="selection" v-if="obj.checkAble" width="55"></el-table-column>
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        header-align="center"
        :fixed="item.fix"
        :align="item.align?item.align:'center'"
        :width="`${item.width}px`"
        :sortable="item.sort"
      >
        <template slot-scope="scope">
          <span v-if="index === 0">
            <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
          </span>
          <span
            v-if="iconShow(index,scope.row)"
            class="tree-ctrl"
            @click="toggleExpanded(scope.$index)"
          >
            <i v-if="!scope.row._expanded" class="el-icon-plus"/>
            <i v-else class="el-icon-minus"/>
          </span>
         <template v-if="item.type===undefined"> {{ scope.row[item.prop]}}</template>
           <el-input
            class="edit_input"
            v-if="item.type==='input'"
            size="small"
            v-model="scope.row[item.prop]"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          ></el-input>
           <el-select
            class="edit_input"
            v-if="item.type==='select'"
            size="small"
            v-model="scope.row[item.prop]"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          >
           <el-option v-for="(it,i) in item.opt" :key="i" :label="it.label" :value="it.prop"></el-option>
          </el-select>

          <!-- <div v-if="item.type===undefined">{{ scope.row[item.prop]}}</div> -->
          <div v-if="item.type==='butGroup'">
            <div
              v-for="(it,i) in item.butList"
              :class="i===0?'ordinary_but':'transparent_but'"
              :type="it.type?it.type:'primary'"
              :key="i"
              @click.stop="it.fcn?$emit(it.fcn,scope):defuthed()"
            >{{it.text}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogTableVisible" fullscreen></el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {
    this.dropCol = [].splice.call(this.obj.pd);
  },
  mounted() {},
  props: {
    opt: {
      type: Object,
      default: () => ({})
    },
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      startEdit: "",
      aIndex: "",
      bIndex: "",
      headerClass: "",
      dialogTableVisible: false,
      dropCol: []
    };
  },
  mounted() {},
  methods: {
      defuthed() {
          console.log('defuthed')
      },
    // 树形表 格式化数据
    treeToArray(data, expandAll, parent = null, level = null) {
      let tmp = [];
      let _this = this;
      Array.from(data).forEach(function(record) {
        if (record._expanded === undefined) {
          Vue.set(record, "_expanded", expandAll);
        }
        let _level = 1;
        if (level !== undefined && level !== null) {
          _level = level + 1;
        }
        Vue.set(record, "_level", _level);
        // 如果有父元素
        if (parent) {
          Vue.set(record, "parent", parent);
        }
        tmp.push(record);
        if (record.children && record.children.length > 0) {
          const children = _this.treeToArray(
            record.children,
            expandAll,
            record,
            _level
          );
          tmp = tmp.concat(children);
        }
      });
      return tmp;
    },
    // 树形表 子表隐藏，如果父节点为展示状态则展示
    showRow: function(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 树形表 切换下级是否展开
    toggleExpanded(trIndex) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 树形表 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    }
  },

  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return Object.assign({}, this.opt);
    },
    // 格式化数据源
    formatData: function() {
      let tmp;
      if (!Array.isArray(this.obj.data)) {
        tmp = [this.obj.data];
      } else {
        tmp = this.obj.data;
      }
      const func = this.treeToArray;
      const args = [tmp, this.expandAll];
      return func.apply(null, args);
    }
  }
};
</script>

<style rel="stylesheet/css" scoped>
/* 重写cell属性，解决表头内容过多不换行的问题 */
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>


<style lang="scss" rel="stylesheet/scss">
$color-blue: #2196f3;
$space-width: 17px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;

  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
  .el-icon-minus {
    font-size: 12px !important;
    font-weight: bolder;
  }
  .el-icon-plus {
    font-size: 12px !important;
    font-weight: bolder;
  }
}
.el-table .el-table__body tr.current-row > td {
  background: #79dff1 !important;
  color: #fff;
  .el-checkbox__inner {
    background: #fff;
  }
  .el-checkbox__inner::after {
    border-color: #79dff1;
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #e9f9fb;
  // cursor:pointer !important;
}
.row-fixed {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.input {
  border: none;
  outline: none;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #1682c02c !important;
}
.fixed {
  opacity: 0.3 !important;
}
.unfixed {
  opacity: 1 !important;
}
/* 重写cell属性，解决表头内容过多不换行的问题 */
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.edit_input .el-input__inner {
    width: 100px;
  border: 0 none;
  border-radius: 0px;
  background-color: transparent;
}
</style>

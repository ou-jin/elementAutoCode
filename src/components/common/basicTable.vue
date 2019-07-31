<template>
  <div style="width:100%">
    <el-table
      ref="basicTable"
      v-on="$listeners"
      v-bind="$attrs"
      :data="obj.data"
      :row-style="()=>{return 'height:50px'}"
      :header-cell-class-name="()=>{return 'nowrap'}"
    >
      <el-table-column v-if="obj.indexAble" type="index" width="50"></el-table-column>
      <el-table-column type="selection" v-if="obj.checkAble" width="55" align="center" fixed></el-table-column>
      <el-table-column
        v-for="(item,index) in obj.pd"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
        :fixed="item.fix"
        :width="`${item.width}px`"
        :sortable="item.sort"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row[item.prop]"
            v-if="item.type==='checkbox'"
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
          ></el-checkbox>
          <el-button
            type="primary"
            v-if="item.type==='button'"
            @click="item.fcn?$emit(item.fcn,scope):defuthed()"
          >{{ scope.row[item.prop]}}</el-button>

          <!-- <div class="" v-if="item.type===undefined">{{ scope.row[item.prop]}}</div> -->
          <template v-if="item.type===undefined||item.type==='text'">{{ scope.row[item.prop]}}</template>
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
          <el-switch
            v-if="item.type==='switch'"
            :class="item.prop==='fix'&&scope.row[item.prop]?'fixed':'unfixed'"
            @click.native.stop
            @change="item.fcn?$emit(item.fcn,scope):defuthed()"
            :active-text="item.active"
            :inactive-text="item.inactive"
            v-model="scope.row[item.prop]"
          ></el-switch>
          <div v-if="item.type==='butGroup'">
            <template v-for="(it,i) in item.opt">
              <div
                v-if="!it.disabled"
                :class="i===0?'ordinary_but':'transparent_but'"
                :type="it.type?it.type:'primary'"
                :key="i"
                @click.stop="it.prop?$emit(it.prop,scope):defuthed()"
              >{{it.label}}</div>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination row-center" v-if="obj.paginationOpt">
      <el-pagination
        @size-change="(s)=>{$emit('pagination',Object.assign(obj.paginationOpt,{pageSize:s}))}"
        @current-change="(s)=>{$emit('pagination',Object.assign(obj.paginationOpt,{currentPage:s}))}"
        @prev-click="(s)=>$emit('pagination',Object.assign(obj.paginationOpt,{currentPage:s}))"
        @next-click="(s)=>$emit('pagination',Object.assign(obj.paginationOpt,{currentPage:s}))"
        :current-page="obj.paginationOpt.currentPage"
        :page-size="obj.paginationOpt.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="obj.paginationOpt.totalRecords"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  inheritAttrs: false,
  created() {
    console.log("123");
  },
  mounted() {},
  props: {
    opt: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      startEdit: "",
      aIndex: "",
      bIndex: "",
      headerClass: "",
      dialogTableVisible: false,
      dropCol: [],
      sortDisable: false,
      sortList: [],
      prevent: false,
      beforeVal: ""
    };
  },
  mounted() {
    // 支持拖拽
  },
  methods: {
    defuthed() {}
  },

  computed: {
    obj() {
      // 将父组件的数据过渡到子组件
      return Object.assign({}, this.opt);
    }
  }
};
</script>
<style scope lang='less'>
// .el-table--enable-row-hover .el-table__body tr:hover > td {
//   background-color: rgba(161, 228, 245, 0.678);
//   cursor: pointer;
// }
.el-table .el-table__body tr.current-row > td {
  background: #79dff1 !important;
  color: #fff;
  .el-checkbox__inner {
    background: #fff;
  }
  .el-checkbox__inner::after {
    border-color: #79dff1;
  }
  .edit_input .el-input__inner {
    background-color: transparent;
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

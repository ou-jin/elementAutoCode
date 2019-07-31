<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
      name: 'App'
    }
</script>
<style lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.el-card__body {
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.el-select .el-tag .el-select__tags-text {
  display: inline-block;
  vertical-align: middle;
  max-width: 60px;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .el-select-dropdown__item > span{
//   display: inline-block;
//   vertical-align: middle;
//   max-width: 150px;
//   overflow: hidden;
//   -ms-text-overflow: ellipsis;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
        position: static;
}
.el-tabs--border-card > .el-tabs__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.el-tree-node__label {
  font-size: 12px;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-tooltip__popper{
  max-width: 1500px;
}
.el-table .cell {
  padding: 0;
}
.el-table{
  width: 100% !important;
  .el-table__header{
    width: 100% !important;
  }
}
.primary-btn {
  background: #21c0db;
  color: #fff;
  border: 1px solid #21c0db;
}
.primary-btn:hover,
primary-btn:focus {
  background: #21c0db;
  color: #fff;
  border: 1px solid #21c0db;
}
.primary-btn:focus {
  background: #21c0db;
  color: #fff;
  border: 1px solid #21c0db;
}
.preset-dialog {
  .el-dialog__title {
    font-weight: bold;
  }
  .el-dialog {
    width: 480px;
    height: 228px;
  }
  .el-button {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0 !important;
  }
  .el-input {
    .el-input__inner {
      border: 1px solid rgba(192, 192, 192, 1);
      border-radius: 0px;
    }
  }
  .cancel {
    border: 1px solid #333;
    color: #333;
  }
  .confirm {
    border: 1px solid #21c0db;
    color: #fff;
  }
  .focus{
    border: 1px solid #21c0db;
    color: #fff;
  }
  .cancel:focus,
  .cancel:hover {
    background: transparent;
  }
  .confirm:focus,
  .confirm:hover {
    background: #21c0db;
  }
}
.el-form{
   .el-form-item__content {
      .el-input {
        .el-input__inner {
          border-radius: 0px;
        }
      }
    }
  .el-form-item.is-success .el-input__inner{
    border-color:#DCDFE6
  }
  .el-form-item.is-success .el-input__inner:focus{
    border-color:#21c0db
  }
  .el-form-item.is-error .el-input__inner:focus{
    border-color:#21c0db
  }
  .el-input__inner :focus{
    border: 1px solid #21c0db !important;
  }
  
}
</style>


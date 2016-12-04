<template>
    <el-card class="box-card" >
        <div slot="header" class="clearfix my_handle">
            <span style="line-height: 36px;">{{card.name}}</span>
            <el-dropdown style="float: right;">
            <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>设置负责人</el-dropdown-item>
                <el-dropdown-item>清空</el-dropdown-item>
                <el-dropdown-item divided>删除</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div v-for="task in tasks" class="text item">
            
            <task-box v-bind:task="task"></task-box>

        </div>

            <div class="diy_notification">
            <div class="el-notification__group">
                <span class="el-icon-plus" v-on:click="add_task" style="cursor: pointer;"> 新建任务</span>
            </div>
        </div>
    </el-card>
</template>

<script>
    import Vue from 'vue'
    var TaskBox = '<div class="diy_notification">\
            <div class="el-notification__group">\
                <span >任务{{task.name}}</span>\
                <p>1.修复登录BUG <br/>2.优化注册流程</p>\
                <el-button icon="arrow-left" size="mini"></el-button>\
                <el-button icon="arrow-right" size="mini" style="float:right;"></el-button>\
            </div>\
            </div>'
Vue.component('task-box', {
  // 声明 props
  props: ['task'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: TaskBox
})

export default {
    props: ['card'],
    data: function () {
        return {
            tasks:[{name:'任务1'}]
        }
    },
    methods: {
    add_task () {
      this.tasks.push({
        name:'测试'
      });
    }
  }
}
</script>

<style scoped>
 .diy_notification{
    width: 250px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 6px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
    transition: opacity .3s,transform .3s,right .3s,top .4s;
    overflow: hidden;
    margin:10px;
  }
  .box-card{
    background-color: #EEE
  }
</style>

<style>
 .el-card__header {
    padding: 10px !important;
  }
  .el-card__body{
    padding:0 !important;
  }
</style>

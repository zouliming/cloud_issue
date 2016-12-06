<template>
    <section>
        <el-card class="box-card">
            <div slot="header" class="clearfix my_handle">
                <span style="line-height: 36px;">{{card.name}}</span>
                <el-dropdown style="float: right;">
                    <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>编辑</el-dropdown-item>
                        <el-dropdown-item>设置负责人</el-dropdown-item>
                        <el-dropdown-item>清空</el-dropdown-item>
                        <el-dropdown-item divided>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-for="task in tasks" class="text item">
                <div class="diy_notification">
                    <div class="el-notification__group">
                        <span @click="update_task_box">{{task.name}}</span>
                        <i class="el-icon-close" style="float:right;cursor: pointer;font-size:10px;" @click="del_task(task)"></i>
                        <p>{{task.desc}}</p>
                        <el-button icon="arrow-left" size="mini"></el-button>
                        <el-button icon="arrow-right" size="mini" style="float:right;"></el-button>
                    </div>
                </div>
            </div>

            <div class="diy_notification">
                <div class="el-notification__group">
                    <span class="el-icon-plus" v-on:click="add_task_box" style="cursor: pointer;"> 新建任务</span>
                </div>
            </div>
        </el-card>

        <!--编辑窗-->
        <el-dialog :title="editFormTtile" v-model="editFormVisible" size="tiny">
            <span>
                <el-form :model="form" ref="form" label-width="70px" :rules="rules">
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="优先级">
                        <el-radio-group v-model="form.level">
                        <el-radio label="普通"></el-radio>
                        <el-radio label="紧急"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="任务描述">
                        <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add_task">立即创建</el-button>
                        <el-button v-on:click="close_task_box">取消</el-button>
                    </el-form-item>
                </el-form>
            </span>
        </el-dialog>
    </section>
</template>

<script>
import Vue from 'vue'

export default {
    props: ['card'],
    data: function () {
        return {
            tasks:[],
            editFormVisible:false,//编辑界面显是否显示
            editFormTtile:'编辑',//编辑界面标题
            form: {
                name: '',
                date: '',
                level: '普通',
                desc: ''
            },
             rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        add_task () {
             this.$refs.form.validate((valid) => {
                if (valid) {
                    this.tasks.push(JSON.parse(JSON.stringify(this.form)))
                    this.editFormVisible=false
                } else {
                    return false;
                }
            });
        },
        add_task_box(){
            this.editFormVisible=true
            this.editFormTtile='添加'
            this.$refs.form.resetFields();
        },
        update_task_box(){
            this.editFormVisible=true
            this.editFormTtile='编辑'
            this.$refs.form.resetFields();
        },
        close_task_box(){
            this.editFormVisible=false
        },
        del_task(task){
            this.$confirm('确认操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.tasks.splice(this.tasks.indexOf(task), 1)
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });

        }
    }
}
</script>

<style scoped>
    .diy_notification {
        width: 250px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 0 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        transition: opacity .3s, transform .3s, right .3s, top .4s;
        overflow: hidden;
        margin: 10px;
    }
    
    .box-card {
        background-color: #EEE
    }
</style>

<style>
    .el-card__header {
        padding: 10px !important;
    }
    
    .el-card__body {
        padding: 0 !important;
    }
</style>
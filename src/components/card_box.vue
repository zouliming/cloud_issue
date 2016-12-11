<template>
    <section class="my_body">
        <div class="board-scrum-view">
            <div class="board-scrum-stages">
                <div v-for="(card,index) in cards" class="scrum-stage" v-dragging="{ item: card, list: cards, group: 'card' }" :key="card.card_id">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix my_handle">
                            <span style="line-height: 30px;width:100px;display:inline-block;" contenteditable @blur="update_card(card,$event)">{{card.card_name}}</span>
                            <el-dropdown style="float: right;" @command="del_card(card,$event)">
                                <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='set'>设置通知人</el-dropdown-item>
                                    <el-dropdown-item divided command='del'>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div v-for="task in card.tasks" class="text item">
                            <div class="diy_notification">
                                <div class="el-notification__group">
                                    <span @click="update_task_box(card,task)">{{task.name}}</span>
                                    <i class="el-icon-close" style="float:right;cursor: pointer;font-size:10px;" @click="del_task(card,task)"></i>
                                    <p>{{task.desc}}</p>
                                    <el-button icon="arrow-left" size="mini" @click="move_task(card,task,-1)"></el-button>
                                    <el-button icon="arrow-right" size="mini" style="float:right;" @click="move_task(card,task,1)"></el-button>
                                </div>
                            </div>
                        </div>

                        <div class="diy_notification">
                            <div class="el-notification__group">
                                <span class="el-icon-plus" v-on:click="add_task_box(card)" style="cursor: pointer;"> 新建任务</span>
                            </div>
                        </div>
                    </el-card>
                </div>

                <div class="scrum-stage">
                    <el-button class="el-icon-plus" v-on:click="add_card"> 新建流程</el-button>
                </div>
            </div>
        </div>

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
import Api from '../common/api'
import VueDND from 'awe-dnd'
Vue.use(VueDND)

export default {
    data: function () {
        return {
            cards:[],
            editFormVisible:false,//编辑界面显是否显示
            editFormTtile:'编辑',//编辑界面标题
            form: {
                id:'',
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
    created(){
      this.select_card()
    },
    methods: {
        select_card(){
            var _this = this
             Api.get('/Card/select',function(res){
                _this.cards = res;
            });
        },
        add_card () {
            var _this = this
            var card = {
                card_name:'新建流程'
            }
            Api.post('/Card/add',card,function(res){
                _this.cards.push({
                    card_id:res.card_id,
                    card_name:res.card_name,
                    tasks:[]
                });
            });
            
        },
        update_card(card,event){
            var card = {
                card_id : card.card_id,
                card_name : event.target.innerHTML
            }
            Api.post('/Card/update',card,function(res){
               Vue.set(card,'name',event.target.innerHTML)
            });
            
        },
        del_card(card,event){
            var _this = this
            var card = {
                card_id : card.card_id,
            }
            if(event == 'del'){
                _this.$confirm('确认删除该流程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Api.post('/Card/delete',card,function(res){
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        _this.select_card()
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
            if(event == 'set'){

            }
        },
        add_task_box(card){
            this.card = card
            this.form = {
                id:'',
                name: '',
                date: '',
                level: '普通',
                desc: ''
            }
            this.editFormVisible=true
            this.editFormTtile='添加'
            this.$nextTick(function() {
                this.$refs.form.resetFields();
            })
        },
        add_task () {
             this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.form.id == ''){
                        this.form.id = new Date().getTime()
                        this.card.tasks.push(JSON.parse(JSON.stringify(this.form)))
                    }else{
                        for(var i=0;i<this.card.tasks.length;i++){
                            if(this.card.tasks[i].id == this.form.id){
                                this.card.tasks[i] = this.form
                            }
                        }
                    }
                    this.editFormVisible=false
                } else {
                    return false;
                }
            });
        },
        update_task_box(card,task){
            this.card = card
            this.form = task
            this.editFormVisible=true
            this.editFormTtile='编辑'
        },
        close_task_box(){
            this.editFormVisible=false
        },
        del_task(card,task){
            this.$confirm('确认操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                card.tasks.splice(card.tasks.indexOf(task), 1)
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

        },
        move_task(card,task,step){
            var card_index = this.cards.indexOf(card)
            if(this.cards[card_index+step]){
                card.tasks.splice(card.tasks.indexOf(task), 1)
                this.cards[card_index+step].tasks.push(task);
            }
        }
    },
    mounted () {
        this.$dragging.$on('dragged', ({ value }) => {
            var order = [];
            value.list.forEach(function(card,index){
                order.push({
                    card_id : card.card_id,
                    card_order : index
                })
            })
            Api.post('/Card/order',{order},function(res){
                
            });
        })
    }
}
</script>

<style scoped>
    .board-scrum-view {
        position: relative;
        height: 100%;
        background-color: #FFF;
        border-style: solid;
        border-width: 0;
        border-color: #E5E5E5;
        overflow-y: auto;
        overflow-x: hidden;
    }
    
    .board-scrum-stages {
        position: relative;
        white-space: nowrap;
        overflow-x: auto;
        height: 100%;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    
    .scrum-stage {
        position: relative;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        margin-right: 10px;
        vertical-align: top;
        border-radius: 3px;
        margin: 10px;
    }
    
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
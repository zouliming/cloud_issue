<template>
    <section class="my_body">
        <div class="board-scrum-view">
            <div class="board-scrum-stages">
                <div v-for="(card,index) in cards" class="scrum-stage" v-dragging="{ item: card, list: cards, group: 'card' }" :key="card.card_id">
                    <el-card class="box-card" v-bind:class="{ card_active: is_card_owner(card.card_owner)}">
                        <div slot="header" class="clearfix my_handle">
                            <span class="box-card-title" contenteditable @blur="update_card(card,$event)">{{card.card_name}}</span>
                            <el-dropdown style="position: absolute;right: 12px;cursor: pointer;" @command="manage_card(card,$event)">
                                <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='set'>设置负责人</el-dropdown-item>
                                    <el-dropdown-item divided command='del'>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>


                        <div class="diy_notification">
                            <div class="el-notification__group">
                                <span class="el-icon-plus" v-on:click="add_task_box(card)" style="cursor: pointer;"> 新建任务</span>
                            </div>
                        </div>

                        <div v-for="task in card.tasks" class="text item">
                            <div class="diy_notification" v-bind:class="{ task_active: is_current_task(card.card_owner,task)}">
                                <div class="el-notification__group">
                                    <span @click="update_task_box(card,task)" style="cursor: pointer;width: 160px;overflow: hidden;display: inline-block;"> {{task.task_name}}</span>
                                    <i class="el-icon-close" style="float:right;cursor: pointer;font-size:10px;" @click="del_task(card,task)"></i>
                                    <p @click="detail_task_box(task)" class="task_created">
                                        <label style="display:block" v-show="task.task_branch">{{task.task_branch}}</label>
                                        <label style="display:block" :class="{user_name_active:task.user_id==user.user_id}">{{task.user_name}} <a class="ui orange empty circular label" title="紧急" v-show="task.task_level==2" style="float: right;"></a></label>
                                        <label style="display:block;">{{task.task_create_time}}</label>
                                        <label style="display:block;"><el-progress :percentage="parseInt(task.task_rate)"></el-progress></label>
                                    </p>
                                    <el-row>
                                        <el-col :span="4">
                                            <el-button icon="arrow-left" size="mini" @click="move_task(card,task,-1)"></el-button>
                                        </el-col>
                                        <el-col :span="16">
                                            <push-code :branch_name="task.task_branch" :card_id="card.card_id" :project_name="task.task_project || default_project_name" v-if="task.task_branch"></push-code>
                                            <push-code :branch_name="task.task_name" :card_id="card.card_id" :project_name="task.task_project || default_project_name" v-else></push-code>
                                            &nbsp;
                                        </el-col>
                                        <el-col :span="4">
                                            <el-button icon="arrow-right" size="mini" style="float:right;" @click="move_task(card,task,1)"></el-button>
                                        </el-col>
                                    </el-row>
                                </div>
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
        <el-dialog :title="TaskBoxTtile" v-model="TaskBoxVisible" :modal-append-to-body="false">
            <div>
                <el-form :model="task_form" ref="task_form" label-width="100px" :rules="rules">
                    <el-form-item label="任务名称" prop="task_name">
                        <el-col :span="12">
                            <el-input v-model="task_form.task_name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="分支名" prop="task_branch">
                        <el-col :span="9">
                            <el-input v-model="task_form.task_branch"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属项目" prop="task_project">
                        <el-col :span="9">
                            <el-select v-model="task_form.task_project" placeholder="请选择">
                                <el-option
                                    v-for="project in projects"
                                    :label="project.key"
                                    :value="project.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="优先级">
                       <el-col :span="8">
                            <el-radio-group v-model="task_form.task_level">
                            <el-radio :label="task_level.value" v-for="task_level in task_level_arr">{{task_level.label}}</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item title="进度">
                               <el-slider
                                v-model="task_form.task_rate"
                                :step="25"
                                show-stops>
                                </el-slider>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            &nbsp;
                        </el-col>
                        <el-col :span="6">
                            <el-form-item title="领取人">
                                <el-select v-model="task_form.user_id" placeholder="请选择">
                                    <el-option
                                        v-for="user in users"
                                        :label="user.user_name"
                                        :value="user.user_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="任务描述">
                        <editor :input-content="inputContent" v-model="task_form.task_des"></editor>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                            class="upload-file"
                            :action="upload_url"
                            :on-success="upload_success"
                            :on-remove='upload_remove'
                            :on-preview="upload_link"
                            :file-list="fileList"
                            >
                            <el-button size="small" type="primary">上传附件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button type="primary" @click="add_task">提交</el-button>
                        <el-button v-on:click="close_task_box">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <!--详情-->
        <el-dialog :title="task_form.task_name" v-model="TaskBoxDetailVisible">
            <p v-show="task_form.task_branch">分支名：{{task_form.task_branch}}</p>
            <div class="wangEditor-container">
                <div class="wangEditor-txt">
                    <p v-html="task_form.task_des"></p>
                </div>
            </div>
        </el-dialog>

        <!--负责人-->
        <el-dialog title="负责人" v-model="OwnerBoxVisible" size="tiny">
            <span>
      <el-form :model="owner_form" label-width="100px">
          <el-form-item label="负责人">
            <el-select v-model="owner_form.card_owner" multiple placeholder="请选择">
              <el-option
                v-for="user in users"
                :label="user.user_name"
                :value="user.user_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="update_owner">提交</el-button>
          </el-form-item>
      </el-form>
  </span>
        </el-dialog>

    </section>
</template>

<script>
    /* eslint-disable indent */

    import Vue from 'vue'
    import Api from '../../common/api'
    import Editor from '../common/editor'
    import VueDND from 'awe-dnd'
    import { mapState, mapActions } from 'vuex'
    import PushCode from '../common/pushCode'
    import { API_URL } from '../../config'

    Vue.use(VueDND)

    export default {
        props: ['group_id'],
        data: function () {
            return {
                card: {},
                TaskBoxVisible: false,//编辑界面显是否显示
                TaskBoxTtile: '编辑',//编辑界面标题
                TaskBoxDetailVisible: false,//详情界面显是否显示
                OwnerBoxVisible: false,
                task_form: {},
                rules: {
                    task_name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                    ]
                },
                task_level_arr: [
                    { value: '1', label: '普通' },
                    { value: '2', label: '紧急' }
                ],
                // input content to editor
                inputContent: '',
                users: [],
                projects: {},
                owner_form: {},
                upload_url: API_URL + '/Upload/uploadFile',
                fileList: [],
                default_project_name:'cloud_web'
            }
        },
        computed: {
            ...mapState({
                cards: state => state.cards.cards,
                user: state => state.user.user,
                current_task_id: state => state.cards.current_task_id
            })
        },
        created() {
            this.select_user();
            this.select_projects();
            this.$store.dispatch('select_card', this.group_id);
        },
        watch: {
            TaskBoxVisible: function (val, oldVal) {
                if (val == false) {
                    this.resetForm('task_form');
                }
            }
        },
        methods: {
            add_card() {
                var _this = this
                var card = {
                    card_name: '新建流程',
                    group_id: this.group_id
                }
                Api.post('/Card/add', card, function (res) {
                    if (res.status == 0) {
                        _this.$message({
                            type: 'error',
                            message: res.info
                        })
                        return
                    }
                    _this.cards.push({
                        card_id: res.card_id,
                        card_name: res.card_name,
                        tasks: []
                    });
                });
            },
            update_card(card, event) {
                var _this = this
                if (card.card_name == event.target.innerHTML) {
                    return
                }
                var new_card = {
                    card_id: card.card_id,
                    card_name: event.target.innerHTML
                }
                Api.post('/Card/update', new_card, function (res) {
                    if (res.status == 0) {
                        _this.$message({
                            type: 'error',
                            message: res.info
                        })
                        return
                    }
                    Vue.set(card, 'card_name', event.target.innerHTML)
                });

            },
            manage_card(card, event) {
                var _this = this
                if (event == 'del') {
                    _this.$confirm('确认删除该流程?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Api.post('/Card/delete', card, function (res) {
                            if (res.status == 0) {
                                _this.$message({
                                    type: 'error',
                                    message: res.info
                                })
                                return
                            }
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            _this.cards.splice(_this.cards.indexOf(card), 1)
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
                if (event == 'set') {
                    var _this = this
                    Api.get('/Card/owner_select/card_id/' + card.card_id, function (res) {
                        _this.owner_form = res;
                        _this.OwnerBoxVisible = true
                    });
                }
            },
            add_task_box(card) {
                this.card = card
                this.task_form = {
                    card_id: card.card_id,
                    task_id: '',
                    task_name: '',
                    task_branch: '',
                    task_project:this.default_project_name,
                    task_level: '1',
                    task_rate: 0,
                    task_des: '',
                    task_file: '',
                    user_id: this.user.user_id
                }
                this.TaskBoxVisible = true
                this.TaskBoxTtile = '添加'
                this.inputContent = '<table class="desc_table" style="width: 100%;"><tr><td style="width: 120px;"><h5>&nbsp;<span lang="ZH-CN">更新说明及步骤</span></h5></td><td>&nbsp;覆盖</td></tr><tr><td><h5>&nbsp;<span lang="ZH-CN">回滚方法</span></h5></td><td>&nbsp;上一个版本</td></tr><tr><td><h5>&nbsp;<span lang="ZH-CN">更新原因</span></h5></td><td>&nbsp;</td></tr><tr><td><h5>&nbsp;<span lang="ZH-CN">影响范围</span></h5></td><td>&nbsp;</td></tr></></table><p><br></p>'
                this.fileList = [];
            },
            add_task() {
                this.$refs.task_form.validate((valid) => {
                    if (valid) {
                        this.task_form.task_file = this.fileList || [];
                        if (this.task_form.task_id == '') {
                            var _this = this
                            Api.post('/Task/add', this.task_form, function (res) {
                                _this.task_form.task_id = res.task_id
                                _this.card.tasks.push(JSON.parse(JSON.stringify(res)))
                                _this.TaskBoxVisible = false
                            });
                        } else {
                            var _this = this
                            Api.post('/Task/update', this.task_form, function (res) {
                                for (var i = 0; i < _this.card.tasks.length; i++) {
                                    if (_this.card.tasks[i].task_id == _this.task_form.task_id) {
                                        _this.card.tasks[i]['task_name'] = _this.task_form.task_name;
                                        _this.card.tasks[i]['task_level'] = _this.task_form.task_level;
                                        _this.card.tasks[i]['task_des'] = _this.task_form.task_des;
                                        _this.card.tasks[i]['task_branch'] = _this.task_form.task_branch;
                                        _this.card.tasks[i]['task_project'] = _this.task_form.task_project;
                                    }
                                }
                                _this.TaskBoxVisible = false
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            update_task_box(card, task) {
                this.card = card
                this.TaskBoxVisible = true
                this.TaskBoxTtile = '编辑'
                this.task_form = {
                    card_id: task.card_id,
                    task_id: task.task_id,
                    task_name: task.task_name,
                    task_branch: task.task_branch,
                    task_project: task.task_project || this.default_project_name,
                    task_level: task.task_level,
                    task_rate: parseInt(task.task_rate),
                    task_des: task.task_des,
                    task_file: task.task_file,
                    user_id: task.user_id
                }
                this.fileList = JSON.parse(task.task_file || '[]');
                this.inputContent = task.task_des
            },
            close_task_box() {
                this.TaskBoxVisible = false
            },
            del_task(card, task) {
                this.$confirm('确认操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var _this = this
                    Api.post('/Task/delete', task, function (res) {
                        if (res.status == 0) {
                            _this.$message({
                                type: 'error',
                                message: res.info
                            })
                            return
                        }
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        card.tasks.splice(card.tasks.indexOf(task), 1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            move_task(card, task, step) {
                var card_index = this.cards.indexOf(card)
                if (this.cards[card_index + step]) {
                    var _this = this
                    var move = {
                        to_card_id: this.cards[card_index + step].card_id,
                        task_id: task.task_id
                    }
                    Api.post('/Task/move', move, function (res) {
                        if (res.status == 0) {
                            _this.$message({
                                type: 'error',
                                message: res.info
                            })
                            return
                        }
                        _this.$message({
                            type: 'success',
                            message: '移动成功!'
                        })
                        card.tasks.splice(card.tasks.indexOf(task), 1)
                        _this.cards[card_index + step].tasks.push(task)
                    })

                }
            },
            detail_task_box(task) {
                this.task_form = JSON.parse(JSON.stringify(task))
                this.TaskBoxDetailVisible = true
            },
            select_user() {
                var _this = this
                Api.get('/User/select', function (res) {
                    _this.users = res;
                });
            },
            update_owner() {
                var _this = this
                Api.post('/Card/update', this.owner_form, function (res) {
                    _this.OwnerBoxVisible = false
                    if (res.status == 0) {
                        _this.$message({
                            type: 'error',
                            message: res.info
                        })
                        return
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            is_card_owner(card_owner) {
                if (card_owner && card_owner.indexOf(this.user.user_id) != -1) {
                    return true
                }
                return false
            },
            is_current_task(card_owner, task) {
                if (this.is_card_owner(card_owner) && task.task_id == this.current_task_id) {
                    return true
                }
                return false
            },
            upload_success(response, file, fileList) {
                //  console.log(fileList)
                this.fileList = fileList;
            },
            upload_remove(file, fileList) {
                this.fileList = fileList;
            },
            upload_link(file) {
                window.open(file.response);
            },
            select_projects(){
                var _this = this;
                _this.projects = [
                    {
                        key: 'cloud_web',
                        value: 'cloud_web'
                    },
                    {
                        key: 'crm_server',
                        value: 'crm_server'
                    },
                    {
                        key: 'crm_client',
                        value: 'crm_client'
                    },
                    {
                        key: 'console_api',
                        value: 'console_api'
                    },
                ];
            }
        },
        mounted() {
            var _this = this
            this.$dragging.$on('dragged', ({ value }) => {
                var order = [];
                value.list.forEach(function (card, index) {
                    order.push({
                        card_id: card.card_id,
                        card_order: index
                    })
                })
                Api.post('/Card/order', { order }, function (res) {
                    if (res.status == 0) {
                        _this.$message({
                            type: 'error',
                            message: res.info
                        })
                        return
                    }
                });
            })
        },
        components: {
            'editor': Editor,
            'PushCode': PushCode
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
    }

    .diy_notification {
        width: 200px;
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
        background-color: #EEE;
        border:none;
        border-radius: 0;
        box-shadow: none;
    }
    .box-card-title{
        line-height: 30px;
        width:100px;
        display:inline-block;
        font-size: 18px;
    }
    .card_active {
        background-color: rgba(79, 175, 76, 0.2);
    }

    .task_active .el-notification__group span,
    .task_active .el-notification__group p {
        color: #F2711C;
    }

    .task_created label {
        display: block;
        cursor: pointer;
    }

    .my_body {
        position: absolute;
        top: 75px;
        right: 0;
        bottom: 0;
        left: 10px;
        padding: 0;
        overflow: hidden;
        transition: all 218ms ease;
    }
    .user_name_active{
        color: orangered;
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

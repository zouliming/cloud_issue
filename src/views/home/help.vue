<template>
  <div>
    <br/>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">

        <div class="ui raised segment">
          <a class="ui blue ribbon label">简介</a>
          <p></p>
          <div class="ui bulleted list">
            <div class="item">用于团队协作、流程进度提醒。如项目发布、工作进度管理等。</div>
          </div>
          <a class="ui blue ribbon label">功能</a>
          <p></p>
          <div class="ui bulleted list">
            <div class="item">
              <div>项目</div>
              <div class="list">
                <div class="item">用户可以创建多个项目，不同项目可以设置不同参与者，只有创建人和参与者可也看到该项目。</div>
                <div class="item">只有项目创建人可编辑项目，参与者不可编辑项目。</div>
                <div class="item">如果想创建私有项目，该项目不设置参与者即可。</div>
              </div>
            </div>
            <div class="item">
              <div>流程</div>
              <div class="list">
                <div class="item">每个项目下可以创建多个流程，流程顺序可拖动调整。</div>
                <div class="item">每个流程可以指定多个负责人。</div>
                <div class="item">流程数据实时推送，项目中任何用户移动流程进度，其他用户页面数据将自动更新。</div>
              </div>
            </div>
            <div class="item">
              <div>提醒</div>
              <div class="list">
                <div class="item">首次访问浏览器会提示是否允许显示通知，请选择允许。</div>
                <div class="item">用户登录或者流程变更，所有用户将会收到桌面提醒。</div>
                <div class="item">流程负责人除了收到桌面提醒外，网页会单独弹窗提醒。</div>
              </div>
            </div>
          </div>
          <a class="ui blue ribbon label">技术栈</a>
          <p></p>
          <div class="ui bulleted list">
            <div class="item">
              <div>前端</div>
              <div class="list">
                <div class="item">vue、webpack、npm、es6、html5、css3、websocket 
                  <a href="https://github.com/fangxingguang/cloud_issue" target="_blank"><i class="github icon" style="font-size: 25px;"></i></a>
                </div>
              </div>
            </div>
             <div class="item">
              <div>后端</div>
              <div class="list">
                <div class="item">tp5、workerman
                  <a href="https://github.com/fangxingguang/cloud_issue_server" target="_blank"><i class="github icon" style="font-size: 25px;"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

  </div>
</template>

<script>

</script>
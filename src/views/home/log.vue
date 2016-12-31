<template>
  <div>
    <br/>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">

        <div class="ui feed" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <div class="event" v-for="log in logs">
            <div class="label">
              {{log.log_id}}
            </div>
            <div class="content">
              <div class="summary"><a class="user"> {{log.user_name}} </a> {{log.log_info}}
                <div class="date">{{log.log_create_time}} </div>
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
  import Vue from 'vue'
  import Api from '../../common/api'
  import infiniteScroll from 'vue-infinite-scroll'
  Vue.use(infiniteScroll)

  export default {
    data() {
      return {
        logs: [],
        busy: false,
        page: 1
      }
    },
    methods: {
      loadMore: function () {
        this.busy = true
        var _this = this
        Api.get('/Log/select/page/' + this.page, function (res) {
          console.log(_this.page)
          if (res.length > 0) {
            res.forEach(function (data) {
              _this.logs.push(data);
            })
            _this.page++
            _this.busy = false
          }
        });

      }
    }
  }
</script>
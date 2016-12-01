<template>
  <div class="footer el-menu--dark" >
    <el-row>
      <el-col :span="24">
        我是底部
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer{
    height: 40px;
    background-color: #324057;
    color: #a4aebd;
    width: 100%;
    position:absolute;
    bottom:0;
    padding:20px;
  }
</style>

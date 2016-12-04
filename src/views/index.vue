<template>
    <div class="board-scrum-view">
      <ul class="board-scrum-stages">
          <li v-for="card in box_card" class="scrum-stage">
            <card-box v-bind:card="card"></card-box>
          </li>
          <li class="scrum-stage"><el-button class="el-icon-plus" v-on:click="add_card"> 新建流程</el-button></li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import api from '../api/common'
import CardBox from '../components/card_box'

export default {
  data () {
    return {
      box_card : [
        {name:'开发'}
        ]
    }
  },
  methods: {
    add_card () {
      this.box_card.push({
        name:'测试'
      });
    }
  },
  components: {
    'card-box': CardBox
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
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
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
 
</style>

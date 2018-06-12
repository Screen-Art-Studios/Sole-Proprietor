<template>
  <div class="main">
    <scanner class="scanner" v-if="modal==='scanner'" :user="user" v-on:back="modal=''"></scanner>
    <div class="defaultView" v-else>
      <h1>Dashboard</h1>
      <div class="scannerBlock blocks" v-on:click="modal='scanner'">
        <button class="scannersButton">Scanner</button>
        <div class="scannerIcon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import scanner from './elements/Scanner'

export default {
  name: 'home',
  props: ['user', 'logged'],
  components: {
    'scanner': scanner
  },
  created () {
    let vue = this
    if (vue.logged !== true) {
      vue.$router.push('/login')
    }
  },
  data () {
    return {
      modal: ''
    }
  }
}
</script>

<style scoped lang="less">
@blue: #00a1ff;
@grey: #323d38;
@font: 'Roboto', sans-serif;
@titlefont: 'Timmana', sans-serif;

  .main {
    width: 100%;
    height: 800px;
    position: fixed;
  }

  .defaultView {
    width: 100%;
    height: 800px;
    margin-top: 90px;
    border: 12px solid @blue;
    display: grid;
    grid-template-columns: 1fr repeat(4, 65px) 1fr;
    grid-template-rows: 90px repeat(3, 135px);
    grid-gap: 5px;
  }

  h1 {
    font-family: @titlefont;
    color: @blue;
    margin: 0;
    text-align: center;
    line-height: 100px;
    font-size: 2.5em;
    grid-row: 1;
    grid-column-start: 2;
    grid-column-end: 6;
  }

  button {
    background: transparent;
    border: none;
    padding-top: 18px;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 1.2em;
    font-family: @font;
    z-index: 1;
  }

  .blocks {
    background-color: @blue;
    border-radius: 100px;
    display: grid;
    grid-template-rows: 30px 1fr;
    grid-template-columns: 1fr;
    z-index: 1;
  }

  .calIcon, .empIcon, .leadIcon, .projIcon, .anaIcon {
    background-repeat: no-repeat;
    background-size: contain;
    z-index: -1;
    margin-left: 14px;
  }

  .calendarBlock {
    grid-row: 2;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  .calIcon {
    background-image: url("");
  }

  .employeesBlock {
    grid-row: 2;
    grid-column-start: 4;
    grid-column-end: 6;
  }

  .empIcon {
    background-image: url("");
  }

  .leadsBlock {
    grid-row: 3;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  .leadIcon {
    background-image: url("");
  }

  .projectsBlock {
    grid-row: 3;
    grid-column-start: 4;
    grid-column-end: 6;
  }

  .projIcon {
    background-image: url("");
  }

  .analyticsBlock {
    grid-row: 4;
    grid-column-start: 3;
    grid-column-end: 5;
  }

  .anaIcon {
    background-image: url(".");
  }

</style>

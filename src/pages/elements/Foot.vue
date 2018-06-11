<template>
  <div class="Footer">
    <h1>ScreenArt Studios Copyright&#169;</h1>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<style scoped lang='less'>
@blue: #00a1ff;
@grey: #323d38;
@font: 'Roboto', sans-serif;
@titlefont: 'Timmana', sans-serif;

  .Footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5%;
    text-align: center;
    background: @blue;
  }

  h1 {
    font-family: @font;
    bottom: 0;
    z-index: 13;
    position: absolute;
    font-weight: 300;
    font-size: 1em;
    color: #fff;
    text-align: center;
    line-height: 1;
    right: 0;
    margin-bottom: 10px;
    margin-right: 12px;
    letter-spacing: 1px;
  }

  @media only screen and (max-width:750px) {
  }
</style>

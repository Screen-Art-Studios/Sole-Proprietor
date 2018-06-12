<template>
  <div class="main">
    <div class="back" v-on:click="$emit('back')">Back</div>
  </div>
</template>

<script>
export default {
  name: 'Invoice',
  data () {
    return {
      modal: '',
      error: false,
      number: 0,
      expMonth: 0,
      expYear: 0,
      cvc: 0
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.main {
  margin-top: 200px;
}
</style>

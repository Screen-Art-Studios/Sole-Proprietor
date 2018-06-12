<template>
  <div class="main">
    <div id="form" v-if="modal==='form'">
      <div class="toBeStripe"></div>
      <button v-on:click="submit">Submit</button>
      <button v-on:click="modal=''">Back</button>
    </div>
    <div v-else>
      <p class='event received'>Device is Ready</p>
      <button id='scanBtn' v-on:click="modal='form'"> Scan Now!</button>
    </div>
    <div class="back" v-on:click="$emit('back')">Back</div>
  </div>
</template>

<script>
export default {
  name: 'Scanner',
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
    let vue = this
    document.addEventListener('deviceready', vue.scanCreditCard, false)
  },
  methods: {
    submit () {
      let vue = this
      var stripe = window.Stripe('pk_test_fdMjT45ghTttbi0OWKaIv2zR')
      let card = document.getElementById('form')
      stripe.createToken(card).then(result => {
        if (result.error) {
          vue.error = true
        } else {
          // Send the token to your server.
          vue.stripeTokenHandler(result.token)
        }
      })
    },
    stripeTokenHandler (token) {
      alert(token)
    },
    scanCreditCard () {
      let vue = this
      window.CardIO.canScan(vue.onCardIOCheck)
    },
    onCardIOComplete (response) {
      var cardIOResponseFields = [
        'cardType',
        'redactedCardNumber',
        'cardNumber',
        'expiryMonth',
        'expiryYear',
        'cvv',
        'postalCode'
      ]
      let vue = this
      vue.number = response[cardIOResponseFields[2]]
      vue.expMonth = response[cardIOResponseFields[3]]
      vue.expYear = response[cardIOResponseFields[4]]
      vue.cvc = response[cardIOResponseFields[5]]
    },
    onCardIOCancel () {
      alert('card.io scan cancelled')
    },
    onCardIOCheck (canScan) {
      let vue = this
      alert('card.io canScan? ' + canScan)
      var scanBtn = document.getElementById('scanBtn')
      if (!canScan) {
        scanBtn.innerHTML = 'Manual entry'
      }
      scanBtn.addEventListener('click', function (e) {
        window.CardIO.scan({
          'requireExpiry': true,
          'scanExpiry': true,
          'requirePostalCode': true,
          'restrictPostalCodeToNumericOnly': true,
          'hideCardIOLogo': true,
          'suppressScan': false,
          'keepApplicationTheme': true
        }, vue.onCardIOComplete, vue.onCardIOCancel)
      })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  margin-top: 200px;
}
</style>

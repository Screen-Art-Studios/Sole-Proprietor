<template>
  <div v-bind:class="mainLogic">
    <div v-bind:class="headerLogic">
      <h1>INVOICE</h1>
      <h2 class="num">Invoice Number:</h2>
      <p class="invoiceid">0000000</p>
      <p class="name">Company Name</p>
      <p class="address">Address</p>
      <p class="citystatezip">City, State, ZIP</p>
      <p class="phone">Phone</p>
      <p class="email">Email</p>
      <p class="website">Website</p>
      <img class="logo" v-attr="">
    </div>
    <h2>Billed to:</h2>
    <p class="toname">Client Name</p>
    <p class="toaddress">Address</p>
    <p class="tocitystatezip">City, State, ZIP</p>
    <h2 class="date">Issue Date:</h2>
    <p class="issued">00/00/0000</p>
    <h2 class="notes">Notes:</h2>
    <h2 class="desc">Description</h2>
    <h2 class="qty">Qty/Hr Rate</h2>
    <h2 class="amount">Amount</h2>
    <div class="table"></div>
    <div class="descrip"></div>
    <div class="quant"></div>
    <div class="ammt"></div>
    <h2 class="subtotal">Subtotal</h2>
    <p class="sub">00.00</p>
    <h2 class="tax">Tax</h2>
    <p class="taxammt">00.00</p>
    <h2 class="final">Invoice Total</h2>
    <p class="total">00.00</p>
    <h3 class="thanks">Thank you for your business!</h3>
    <h4>Thumbnail Consulting 2018©</h4>
  </div>
</template>

<script>
export default {
  name: 'invoice',
  data () {
    return {
      invoiceStyle: 'simple'
    }
  },
  computed: {
    headerLogic () {
      let vue = this
      return {
        simpleHeader: vue.invoiceStyle === 'simple',
        cleanHeader: vue.invoiceStyle === 'clean'
      }
    },
    mainLogic () {
      let vue = this
      return {
        simpleMain: vue.invoiceStyle === 'simple',
        cleanMain: vue.invoiceStyle === 'clean'
      }
    }
  }
}
</script>

<style scoped>
  .simpleMain {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(40, 25px);
  }
  .simpleHeader h1 {
    opacity: .4;
    margin-left: 5%;
    font-size: 2.5em;
    font-weight: 500;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 1;
  }
  .simpleHeader {
    background-color: #0a71ad;
    height: 150px;
    box-shadow: 0px 2px 5px black;
    grid-column-start: 1;
    grid-column-end: 9;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 20px);
    border-bottom: 63px solid #005d93;
  }

  .simpleHeader img {
    width: 100px;
    height: 100px;
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row: 2;
    margin-top: 15px;
    background-color: white;
    border-radius: 50%;
  }
  .simpleHeader .name, .simpleHeader .address, .simpleHeader .citystatezip, .simpleHeader .phone, .simpleHeader .email, .simpleHeader .website {
    grid-column-start: 3;
    grid-column-end: 5;
    font-size: .8em;
    margin-right: 5%;
    margin-top: 30px;
    text-align: right;
    color: white;
  }
  .simpleHeader .num {
    grid-row: 5;
    margin-left: 5%;
    grid-column: 1;
    color: white;
  }
  .simpleHeader .invoiceid {
    grid-row: 6;
    margin: 8%;
    grid-column: 1;
    color: white;
  }
  .simpleMain h2 {
    grid-row: 9;
    font-size: 1em;
    grid-column-start: 2;
    grid-column-end: 4;
    color: #0a71ad;
    font-weight: 300;
  }
  .simpleMain .toname, .simpleMain .toaddress, .simpleMain .tocitystatezip {
    grid-column-start: 2;
    grid-column-end: 5;
    font-weight: 300;
  }
  .simpleMain .toname {
    grid-row: 11;
  }
  .simpleMain .toaddress {
    grid-row: 12;
  }
  .simpleMain .tocitystatezip {
    grid-row-start: 13;
    grid-row-end: 15;
  }
  .simpleMain .date {
    grid-row: 9;
    grid-column-start: 5;
    grid-column-end: 7;
  }
  .simpleMain .issued {
    grid-row: 11;
    grid-column-start: 5;
    grid-column-end: 7;
    font-weight: 300;
  }
  .simpleMain .notes {
    grid-row: 12;
    grid-column-start: 5;
    grid-column-end: 7;
  }
  .simpleMain .table {
    width: 90%;
    margin-left: 5%;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 18;
    grid-row-end: 30;
    border: 1px solid black;
  }
  .simpleMain .desc {
    grid-row: 17;
    line-height: 0px;
  }
  .simpleMain .qty {
    grid-row: 17;
    grid-column-start: 5;
    grid-column-end: 7;
    line-height: 0px;
    text-align: center;
  }
  .simpleMain .amount {
    grid-row: 17;
    grid-column: 7;
    grid-column-end: 9;
    line-height: 0px;
    text-align: center;
    width: 90%;
  }
   .simpleMain .descrip {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 18;
    grid-row-end: 30;
    border-right: 1px solid black;
  }
  .simpleMain .quant {
    grid-column-start: 7;
    grid-column-end: 5;
    grid-row-start: 18;
    grid-row-end: 30;
    border-right: 1px solid black;
  }
  .simpleMain .subtotal {
    grid-row: 32;
    grid-column-start: 2;
    grid-column-end: 7;
  }
  .simpleMain .sub {
    line-height: 50px;
    grid-row: 32;
    text-align: center;
    grid-column-start: 7;
    grid-column-end: 10;
    font-weight: 300;
  }
  .simpleMain .tax {
    grid-row: 33;
  }
  .simpleMain .taxammt {
    line-height: 50px;
    grid-row: 33;
    text-align: center;
    grid-column-start: 7;
    grid-column-end: 10;
    font-weight: 300;
  }
  .simpleMain .final {
    grid-row: 34;
    font-weight: 400;
  }
  .simpleMain .total {
    line-height: 50px;
    grid-row: 34;
    text-align: center;
    grid-column-start: 7;
    grid-column-end: 10;
    font-weight: 400;
    font-size: 1.2em;
    color: #005d93;
  }
  .simpleMain .thanks {
    grid-row: 35;
    grid-column-start: 1;
    grid-column-end: 11;
    text-align: center;
    font-weight: 300;
    font-size: 1.3em;
  }
  .simpleMain h4 {
    grid-row: 39;
    grid-column-start: 1;
    grid-column-end: 11;
    font-size: .8em;
    font-weight: 300;
    text-align: center;
  }
</style>

<template>
  <div class="main">
    <div class="header" v-bind:style="styleObject">
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
    <p class="issued">00/00/00</p>
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
  </div>
</template>

<script>
export default {
  name: 'invoice',
  data () {
    return {
      styleObject: {
        backgroundColor: '#0a71ad',
        color: 'white'
      }
    }
  }
}
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(40, 25px);
  }
  h1 {
    opacity: .4;
    margin-left: 5%;
    font-size: 2.5em;
    font-weight: 500;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row: 2;
  }
  .header {
    height: 150px;
    box-shadow: 1px 1px 3px black;
    grid-column-start: 1;
    grid-column-end: 9;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 20px);
  }
  img {
    border: 1px dashed;
    width: 100px;
    height: 100px;
    grid-column: 6;
    grid-row: 2;
    margin-right: 5%;
    margin-top: 5%;
  }
  .name, .address, .citystatezip, .phone, .email, .website {
    grid-column-start: 2;
    grid-column-end: 5;
    font-size: .8em;
    margin-right: 5%;
    margin-top: 20px;
    text-align: right;
  }
  .num {
    grid-row: 5;
    margin-left: 5%;
    grid-column: 1;
  }
  .invoiceid {
    grid-row: 6;
    margin: 8%;
    grid-column: 1;
  }
  h2 {
    grid-row: 9;
    font-size: 1em;
    grid-column-start: 2;
    grid-column-end: 4;
    opacity: .6;
  }
  .toname, .toaddress, .tocitystatezip {
    grid-column-start: 2;
    grid-column-end: 5;
  }
  .toname {
    grid-row: 11;
  }
  .toaddress {
    grid-row: 12;
  }
  .tocitystatezip {
    grid-row-start: 13;
    grid-row-end: 15;
  }
  .date {
    grid-row: 9;
    grid-column-start: 5;
    grid-column-end: 7;
  }
  .issued {
    grid-row: 11;
    grid-column-start: 5;
    grid-column-end: 7;
  }
  .table {
    width: 90%;
    margin-left: 5%;
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row-start: 18;
    grid-row-end: 30;
    border: 1px solid black;
  }
  .desc {
    grid-row: 17;
    line-height: 0px;
  }
  .qty {
    grid-row: 17;
    grid-column-start: 5;
    grid-column-end: 7;
    line-height: 0px;
    text-align: center;
  }
  .amount {
    grid-row: 17;
    grid-column: 7;
    grid-column-end: 9;
    line-height: 0px;
    text-align: center;
    width: 90%;
  }
   .descrip {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 18;
    grid-row-end: 30;
    border-right: 1px solid black;
  }
  .quant {
    grid-column-start: 7;
    grid-column-end: 5;
    grid-row-start: 18;
    grid-row-end: 30;
    border-right: 1px solid black;
  }
  .subtotal {
    grid-row: 32;
  }
  .sub {
    line-height: 50px;
    grid-row: 32;
    grid-column-start: 7;
    grid-column-end: 9;
  }
  .tax {
    grid-row: 33;
  }
  .taxammt {
    line-height: 50px;
    grid-row: 33;
    grid-column-start: 7;
    grid-column-end: 9;
  }
  .final {
    grid-row: 34;
  }
  .total {
    line-height: 50px;
    grid-row: 34;
    grid-column-start: 7;
    grid-column-end: 9;
  }
</style>

<template>
  <div class="main">
    <div class="accountView" v-if="modal==='view'">
      <h2 class="name">Name: {{activeUser.name}}</h2>
      <h2 class="email">Email: {{activeUser.email}}</h2>
      <button class="accountEditButton" v-on:click="modal='edit'">Edit Account</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="accountEdit" v-else-if="modal==='edit'">
      <input class="nameEdit" v-model="activeUser.name" placeholder="Name"/>
      <input class="emailEdit" v-model="activeUser.email" placeholder="user@example.com"/>
      <button class="submitEdit" v-on:click="updateUser">Submit</button>
      <button class="back" v-on:click="modal='view'">Back</button>
    </div>
    <div class="updatePass" v-else-if="modal==='pass'">
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="!showPass" type="password">
      <input class="passwordEdit" v-model="activeUser.password" placeholder="********" v-if="showPass">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <button class="submitUpdatePass" v-on:click="updatePass">Submit</button>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="settings" v-else-if="modal==='sett'">
      <h1>Settings</h1>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="success" v-else-if="modal==='success'">
      <h1>Success!!</h1>
      <button class="back" v-on:click="modal=''">Back</button>
    </div>
    <div class="accountHome" v-else>
      <h1>Account</h1>
      <button class="generalsettings" v-on:click="modal='sett'">General Settings</button>
      <button class="update" v-on:click="modal='pass'">Update Password</button>
      <button class="viewAccount" v-on:click="modal='view'">View Account</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'account',
  props: ['logged', 'user'],
  data () {
    return {
      modal: '',
      showPass: false,
      activeUser: {
        id: '',
        email: '',
        password: '',
        name: ''
      }
    }
  },
  created () {
    if (this.logged !== true) {
      this.$router.push('/login')
    }
    this.populateActiveUser()
  },
  methods: {
    updateUser () {
      let vue = this
      axios.put('http://localhost:81/users/' + vue.user.id, {
        email: vue.activeUser.email,
        name: vue.activeUser.name
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.activeUser.email = user.data.email
          vue.activeUser.name = user.data.name
          vue.modal = 'view'
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updatePass () {
      let vue = this
      axios.put('http://localhost:81/users/' + vue.user.id, {
        password: vue.activeUser.password
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.modal = 'success'
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clearActiveUser () {
      let vue = this
      vue.activeUser.email = ''
      vue.activeUser.name = ''
    },
    populateActiveUser () {
      let vue = this
      axios.get('http://localhost:81/users/' + vue.user.id, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.activeUser.email = response.data.email
          vue.activeUser.name = response.data.name
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    registerUser () {
      let vue = this
      axios.post('http://localhost:81/users', {
        email: vue.activeUser.email,
        password: vue.activeUser.password,
        name: vue.activeUser.name
      })
        .then(function () {
          vue.modal = 'success'
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="less">
  @red: #c90c2e;
  @grey: #323d38;
  @blue: #00a1ff;
  @font: 'Roboto', sans-serif;
  @titlefont: 'Timmana', sans-serif;
  .main {
    width: 100%;
    border: 12px solid @blue;
    height: 94.5%;
    position: fixed;
    margin-top: 50px;
  }

  h1 {
    font-family: @titlefont;
    color: @blue;
    text-align: center;
    line-height: 100px;
    font-size: 2.5em;
  }

  h2 {
    font-size: 1em;
    border-bottom: 2px solid @blue;
    padding-left: 5%;
    width: 90%;
  }

  input {
    width: 90%;
    font-size: 1.5em;
    background-color: #fff;
    border: 2px solid grey;
    padding-left: 5%;
    margin-left: 5%;
  }

  select option[data-default] {
    color: #888;
  }

  button {
    width: 90%;
    margin-left: 5%;
    background-color: @blue;
    border:none;
    margin-bottom: 5%;
    height: 50px;
    color: #fff;
    font-size: 1.5em;
    font-family: @font;
  }

  .accountEditButton {
    margin-bottom: 20px;
    background-color: @blue;
  }

  .submitEdit {
    background-color: @blue;
  }
  .passwordEdit {
    margin-top: 100px;
  }
  .accountView {
    margin-top: 100px;
  }
  .accountEdit {
    margin-top: 100px;
  }
  .nameEdit {
    font-size: 1em;
    margin-bottom: 10px;
  }
  .emailEdit {
    margin-bottom: 10px;
    font-size: 1em;
  }
</style>

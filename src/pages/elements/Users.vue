<template lang="html">
  <div class="userMain">
    <div class="waitingModal" v-if="modal==='wait'">
      <h2>Please Wait...</h2>
    </div>
    <div class="regModal" v-else-if="modal==='register'">
      <h2>Register</h2>
      <h3 v-if="error">Missing Inputs</h3>
      <input class="name" v-model="name" placeholder="Name">
      <input class="email" v-model="email" placeholder="user@example.com">
      <h5>Make this User an Admin?</h5>
      <input class="checkbox" type="checkbox" v-model="admin">
      <h5>Password</h5>
      <input class="password" v-model="password" placeholder="*********" type="password" v-if="!showPass" v-on:keypress.enter="modal='question'">
      <input class="password" v-model="password" placeholder="*********" v-if="showPass" v-on:keypress.enter="modal='question'">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <button class="editBack" v-on:click="modal=''; resetUser">Back</button>
      <button class="registerUser" v-on:click="registerUser()">Register User</button>
    </div>
    <div class="editModal" v-else-if="modal==='edit'">
      <h2>Edit User</h2>
      <h3 v-if="error">Missing Inputs</h3>
      <h4>Name:</h4><input class="name" v-model="name" placeholder="First Name">
      <h4>Email:</h4><input class="email" v-model="email" placeholder="user@example.com">
        <h4 v-if="!payment">Admin:</h4>
        <input class="checkbox" type="checkbox" v-model="admin" v-if="!payment">
      <button class="updateUser" v-on:click="updateUser">Update User</button>
      <button class="deleteUser" v-on:click="deleteUser" v-if="!payment">Delete User</button>
      <button class="editBack" v-on:click="modal=''; resetUsers">Back</button>
    </div>
    <div class="viewModal" v-else-if="modal==='view'">
      <h2>{{ name }}</h2>
      <h3>Email: </h3><h4>{{ email }}</h4>
      <h3>Admin: </h3><h4>{{ admin }}</h4>
      <button class="viewEdit" v-on:click="modal='edit'">Edit User</button>
      <button class="viewBack" v-on:click="modal=''">Back</button>
    </div>
    <div class="mainModal" v-else>
      <h2>Users:</h2><strong class="userLength">{{ users.length }}</strong>
      <button class="regButton" v-on:click="modal='register'">Register a New User</button>
      <button class="backButton" v-on:click="$emit('back')">Back</button>
      <div class="users" v-for="user in users" v-bind:key="user.id">
        <span v-on:click="viewUser(user)">{{ user.name }}</span>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  props: ['logged', 'user'],
  data () {
    return {
      modal: '',
      users: [],
      userID: '',
      showPass: false,
      email: '',
      password: '',
      name: '',
      admin: false,
      error: false,
      emailUser: false,
      payment: false
    }
  },
  created () {
    let vue = this
    vue.populateUsers()
  },
  methods: {
    viewUser (user) {
      let vue = this
      vue.name = user.name
      vue.email = user.email
      vue.admin = user.admin
      vue.userId = user._id
      vue.payment = user.payment
      vue.modal = 'view'
    },
    populateUsers () {
      let vue = this
      axios.get('http://52.40.157.173:81/users/all/' + vue.user.companyId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.users = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      vue.resetUser()
    },
    resetUser () {
      let vue = this
      vue.name = ''
      vue.email = ''
      vue.admin = false
      vue.userId = ''
      vue.payment = false
    },
    updateUser () {
      let vue = this
      axios.put('http://52.40.157.173:81/users/' + vue.userId, {
        email: vue.email,
        name: vue.name,
        admin: vue.admin
      }, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (user) {
          vue.email = user.data.email
          vue.name = user.data.name
          vue.admin = user.data.admin
          vue.modal = 'view'
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    deleteUser () {
      let vue = this
      axios.delete('http://52.40.157.173:81/users/' + vue.userId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
        .then(function (response) {
          vue.modal = ''
          vue.resetUsers()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    registerUser () {
      let vue = this
      vue.modal = 'wait'
      axios.post('http://52.40.157.173:81/users', {
        email: vue.email,
        password: vue.password,
        name: vue.name,
        companyId: vue.user.companyId,
        admin: vue.admin,
        emailUser: vue.emailUser
      })
        .then(function (user) {
          vue.resetUser()
          vue.populateUsers()
          vue.modal = ''
        })
        .catch(function (err) {
          console.log(err)
          vue.err = true
        })
    }
  }
}
</script>

<style scoped lang="less">
@blue: #00a1ff;
@grey: #323d38;
@header: 2.2em;
@font: 'Roboto', sans-serif;
@titlefont: 'Timmana', sans-serif;

.userMain {
  width: 100%;
  height: 94.5%;
  position: fixed;
  margin-top: 50px;
  border: 12px solid @blue;
}

h1, h2, h3, h4, h5 {
  margin: 0;
  padding: 0;
}

button {
  background: @blue;
  border: none;
  color: white;
}

.mainModal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px repeat(20, 40px);
  grid-gap: 4px;
}

.mainModal h2, .userLength {
  grid-row: 1;
  font-size: @header;
  padding-top: 16px;
}

.mainModal h2 {
  grid-column-start: 1;
  grid-column-end: 5;
  border-bottom: 4px solid @blue;
  padding-left: 3%;
}

.userLength {
  grid-column: 4;
  border-left: 4px solid @blue;
}

.backButton, .regButton {
  grid-row: 9;
}

.regButton {
  grid-column-start: 1;
  grid-column-end: 4;
}

.users {
  grid-column-start: 1;
  grid-column-end: 3;
  padding-top: 20px;
  text-align: center;
  border-bottom: 1px solid @blue;
}

.regModal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px repeat(20, 40px);
  grid-gap: 4px;
}

.regModal h2 {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 5;
  padding-top: 20px;
  padding-left: 22px;
}

.regModal input {
  grid-column-start: 1;
  grid-column-end: 5;
  width: 100%;
  border: 1px solid grey;
  align-content: center;
}

.regModal h5{
  grid-column-start: 1;
  grid-column-end: 4;
  font-size: 1.15em;
  padding-top: 12px
}

.regModal input.checkbox {
  grid-row: 4;
  grid-column: 4;
  margin-top: 20px;
}

.regModal .togglePass, .regModal .registerUser {
  grid-row: 8;
}

.regModal .togglePass {
  grid-column-start: 1;
  grid-column-end: 3;
}

.regModal .registerUser {
  grid-column-start: 3;
  grid-column-end: 5;
}

.viewModal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px repeat(20, 40px);
  grid-gap: 4px;
}

.viewEdit {
  grid-row: 9;
  grid-column-start: 1;
  grid-column-end: 4;
}

.viewBack {
  grid-row: 9;
}

.viewModal h2 {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 5;
  padding-top: 20px;
  padding-left: 22px;
}

.viewModal h3 {
  font-size: 1.1em;
  grid-column: 1;
  padding-top: 10px;
  text-align: right;
}

.viewModal h4 {
  font-size: 1.1em;
  grid-column-start: 2;
  grid-column-end: 5;
  padding-top: 14px;
  text-align: center
}

.editModal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px repeat(20, 40px);
  grid-gap: 4px;
}

.editModal h2 {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 5;
  padding-top: 20px;
  padding-left: 10px;
}

.editModal h4 {
  grid-column: 1;
  text-align: right;
}

.editModal input {
  grid-column-start: 2;
  grid-column-end: 5;
  width: 90%
}

.updateUser, .deleteUser {
  grid-row: 8;
}

.updateUser {
  grid-column-start: 1;
  grid-column-end: 3;
}

.deleteUser {
  grid-column-start: 3;
  grid-column-end: 5;
}

.editBack {
  grid-row: 9;
  grid-column: 4;
}

.editModal input.checkbox {
  grid-row: 4;
  grid-column: 2;
  margin-top: 14px;
}

</style>

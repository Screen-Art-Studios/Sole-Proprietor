<template lang="html">
  <div class="main">
    <div class="waitingModal" v-if="modal==='wait'">
      <h2>Please Wait...</h2>
    </div>
    <div class="registerModal" v-else-if="modal==='register'">
      <h1>Register</h1>
      <h3 v-if="error">Missing Inputs</h3>
      <input class="email" v-model="email" placeholder="user@example.com">
      <input class="name" v-model="name" placeholder="Name">
      <h5>Make this User an Admin?</h5>
      <input type="checkbox" v-model="admin">
      <input class="password" v-model="password" placeholder="*********" type="password" v-if="!showPass" v-on:keypress.enter="modal='question'">
      <input class="password" v-model="password" placeholder="*********" v-if="showPass" v-on:keypress.enter="modal='question'">
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="!showPass">Show Password</button>
      <button class="togglePass" v-on:click="showPass = !showPass" v-if="showPass">Hide Password</button>
      <button class="editBack" v-on:click="modal=''; resetUser">Back</button>
      <button class="registerUser" v-on:click="registerUser()">Register User</button>
    </div>
    <div class="editModal" v-else-if="modal==='edit'">
      <h1>Edit User</h1>
      <h3 v-if="error">Missing Inputs</h3>
      <input class="name" v-model="name" placeholder="First Name">
      <input class="email" v-model="email" placeholder="user@example.com">
      <div class="adminInput">
        <h5 v-if="!payment">Admin</h5>
        <input type="checkbox" v-model="admin" v-if="!payment">
      </div>
      <button class="updateUser" v-on:click="updateUser">Update User</button>
      <button class="deleteUser" v-on:click="deleteUser" v-if="!payment">Delete User</button>
      <button class="editBack" v-on:click="modal=''; resetUsers">Back</button>
    </div>
    <div class="viewModal" v-else-if="modal==='view'">
      <h2>User</h2>
      <h3>Name: {{ name }}</h3>
      <h3>Email: {{ email }}</h3>
      <h3>Admin: {{ admin }}</h3>
      <button class="viewEdit" v-on:click="modal='edit'">Edit User</button>
      <button class="viewBack" v-on:click="modal=''">Back</button>
    </div>
    <div class="mainModal" v-else>
      <h2>Users: {{ users.length }}</h2>
      <button class="regbutton" v-on:click="modal='register'">Register a New User</button>
      <button v-on:click="$emit('back')">Back</button>
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
    axios.get('http://52.40.157.173:81/users/all' + vue.user.companyId, {headers: { 'Authorization': 'JWT ' + vue.user.token }})
      .then(function (response) {
        vue.users = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
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
          vue.users = []
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
</style>

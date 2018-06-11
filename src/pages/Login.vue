<template>
  <div class="main">
    <h1>Log-In</h1>
    <div class="loginBox">
      <input class="email" placeholder="Email" v-model="email" type="email"/>
      <input class="password" placeholder="Password" v-model="password" type="password" v-on:keypress.enter="login"/>
      <h3 class="logged">Stay logged In?<input type="checkbox" class="checkbox" v-model="stayLogged"/></h3>
      <button class="login" v-on:click="login">Submit</button>
      <h2 class="registerlink" v-on:click="$router.push('/Register')">Create a New Account Here</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  props: ['logged'],
  data () {
    return {
      email: '',
      password: '',
      stayLogged: false,
      user: {
        token: '',
        id: '',
        companyId: '',
        admin: false
      }
    }
  },
  created () {
    if (this.logged === true) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      let vue = this
      axios.post('https://api.mystic-crm.com/users/login', {
        email: vue.email.toLowerCase(),
        password: vue.password
      })
        .then(response => {
          if (response.status !== 401) {
            vue.user.token = response.data.token
            vue.user.id = response.data.userId
            vue.user.companyId = response.data.companyId
            vue.user.admin = response.data.admin
            if (vue.stayLogged === true) {
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userId', response.data.userId)
              localStorage.setItem('companyId', response.data.companyId)
              localStorage.setItem('admin', response.data.admin)
            } else {
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              localStorage.removeItem('companyId')
              localStorage.removeItem('admin')
            }
            vue.$emit('login', vue.user)
          }
        })
        .catch(response => {
          console.log(response)
          this.wrong = true
        })
    }
  }
}
</script>

<style scoped lang="less">
@blue: #00A1FF;
@darkBlue: #00578A;
@lightBlue: #78CDFF;
@grey: #323d38;
@font: 'Roboto', sans-serif;
@titlefont: 'Timmana', sans-serif;

.main {
  height: 500px;
  width: 100%;
  text-align: center;
  position: fixed;
}

h1, h2, h3 {
  margin: 0;
}

h1 {
  color: @blue;
  font-family: @titlefont;
  margin-top: 150px;
}

input.email, input.password {
  border: none;
  width: 90%;
  border-bottom: 1px solid @blue;
  margin-top: 5px;
  height: 30px;
}

.logged {
  margin-top: 20px;
  font-size: 1.2em;
}

input.checkbox {
  margin-top: 5px;
  margin-left: 5px;
}

button {
  background: @blue;
  margin-top: 20px;
  color: #fff;
  border: none;
  padding: 5px 20px;
  border-radius: 25px;
  font-size: 1.5em;
}

.registerlink {
  margin-top: 24px;
  font-size: 1.2em;
  color: @blue;
  text-decoration: underline;
  text-decoration-color: @blue;
}

@media (min-width: 700px) {
}
</style>

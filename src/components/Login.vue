
<template>
  <div>
    <!-- Login  -->
    <section class="wrapper">
      <div class="container" style="padding-top:11%;">
        <div class="row">
          <div class="col-md-12">
            <div class="login-box">
              <div class="login-title">
                <h3>Log In</h3>
              </div>
              <form method="POST" @submit.prevent="login">
                <div class="single-login-field">
                  <input type="email" v-model="username" placeholder="Email Address" />
                </div>
                <div class="single-login-field">
                  <input type="password" v-model="password" placeholder="Password" />
                </div>
                <div class="remember-row single-login-field clearfix"></div>
                <div class="single-login-field">
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <p style="color:#fff">Username - admin@gmail.com</p>
        <p style="color:#fff">Password - 12345678</p>
      </div>
    </section>
    <!-- Login End -->
  </div>
</template>
<script>
export default {};
</script>
<script>
import { LOGIN_MUTATION } from "../graphql";
import { onLogin } from "../vue-apollo";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            data: {
              username: this.username,
              password: this.password
            }
          }
        })
        .then(data => {
          console.log(data);
          onLogin(
            this.$apollo.provider.defaultClient,
            data.data.login.access_token
          );
          this.$router.push("/employee").catch(() => {});
        })
        .catch(error => {
          alert("please fill all forms");
        });
    }
  }
};
</script>
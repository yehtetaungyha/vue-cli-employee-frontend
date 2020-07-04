<template>
  <section class="wrapper">
    <div class="container" style="padding-top:11%;">
      <div class="row">
        <div class="col-md-12">
          <div class="login-box">
            <div class="login-title">
              <h3>Register</h3>
            </div>
            <form method="POST" @submit.prevent="signup">
              <div class="single-login-field">
                <input type="text" v-model="name" placeholder="User Name" />
              </div>
              <div class="single-login-field">
                <input type="email" v-model="email" placeholder="Email Address" />
              </div>
              <div class="single-login-field">
                <input type="password" v-model="password" placeholder="Password" />
              </div>
              <div class="single-login-field">
                <button type="submit">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { SIGNUP_MUTATION } from "../graphql";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      if (this.name != "" && this.email != "" && this.password != "") {
        this.$apollo
          .mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            this.data = response.data.signup;
            alert("Register succefully");
            this.$router.push("/login");
          });
      } else {
        alert("please fill all forms");
      }
    }
  }
};
</script>
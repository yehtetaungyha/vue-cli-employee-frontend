<template>
  <div>
    <div v-bind:class="{ 'show': show }">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand style="padding: 10px;">EMPLOYEE</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav></b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto nav-menu">
            <b-nav-item>
              <router-link to="/signup" tag="li" style="color:#fff" active-class="active" exact>
                <b-icon icon="newspaper" font-scale="1"></b-icon>&nbsp;Register
              </router-link>
            </b-nav-item>
            <div>
              <b-nav-item>
                <a tag="li" @click.prevent="logout" style="color:#fff" active-class="active" exact>
                  <b-icon icon="shield-lock" font-scale="1"></b-icon>&nbsp;Logout
                </a>
              </b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="margin-top:40px;">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.employee_email }}</td>
                <td>{{ employee.employee_phone }}</td>
                <td>{{ employee.employee_address }}</td>
                <td>
                  <button
                    type="button"
                    @click="selectEmployee(employee)"
                    class="btn btn-info"
                  >Select</button>&nbsp;&nbsp;
                  <button
                    type="button"
                    @click="deleteEmployee(employee.id)"
                    class="btn btn-danger"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4" style="margin-top:40px;">
          <form>
            <div class="form-group">
              <label>Employee Name</label>
              <input class="form-control" type="text" name="employee_name" v-model="employee_name" />
            </div>
            <div class="form-group">
              <label>Employee Email</label>
              <input
                class="form-control"
                type="email"
                name="employee_email"
                v-model="employee_email"
              />
            </div>
            <div class="form-group">
              <label>Employee Phone</label>
              <input
                class="form-control"
                type="number"
                name="employee_phone"
                v-model="employee_phone"
              />
            </div>
            <div>
              <label>Employee Address</label>
              <input
                class="form-control"
                type="text"
                name="employee_address"
                v-model="employee_address"
              />
            </div>
            <br />
            <button
              v-if="!id"
              type="button"
              @click="createEmployee(employee_name, employee_email, employee_phone,employee_address)"
              class="btn btn-success"
            >Create</button>
            <button
              v-else
              type="button"
              @click="updateEmployee(id, employee_name, employee_email, employee_phone,employee_address)"
              class="btn btn-info"
            >Update</button>&nbsp;&nbsp;
            <button
              style="color:#fff"
              type="button"
              class="btn btn-danger"
              @click="clearForm()"
            >Clear</button>
          </form>
        </div>
      </div>
    </div>
    <footer class="fixed-bottom">
      <p style="color:#fff" class="text-center">@copy-2020</p>
    </footer>
  </div>
</template>
<script>
import { ALL_EMPLOYEE_QUERY } from "../graphql";
import { CREATE_MUTATION } from "../graphql";
import { UPDATE_MUTATION } from "../graphql";
import { DELETE_MUTATION } from "../graphql";
import { onLogout } from "../vue-apollo";
export default {
  data() {
    return {
      show: true,
      id: null,
      employee_name: "",
      employee_email: "",
      employee_phone: "",
      employee_address: ""
    };
  },
  apollo: {
    employees: {
      query: ALL_EMPLOYEE_QUERY
    }
  },
  methods: {
    selectEmployee(employee) {
      this.id = employee.id;
      this.employee_name = employee.employee_name;
      this.employee_email = employee.employee_email;
      this.employee_phone = employee.employee_phone;
      this.employee_address = employee.employee_address;
    },
    clearForm() {
      this.id = null;
      this.employee_name = "";
      this.employee_email = "";
      this.employee_phone = "";
      this.employee_address = "";
    },

    createEmployee() {
      if (
        this.employee_name != "" &&
        this.employee_email != "" &&
        this.employee_phone != "" &&
        this.employee_address != ""
      ) {
        this.$apollo
          .mutate({
            mutation: CREATE_MUTATION,
            variables: {
              employee_name: this.employee_name,
              employee_email: this.employee_email,
              employee_phone: this.employee_phone,
              employee_address: this.employee_address
            }
          })
          .then(response => {
            this.data = response.data.createEmployee;
            location.reload();
          });
      } else {
        alert("please fill all forms");
      }
    },
    updateEmployee() {
      if (
        this.employee_name != "" &&
        this.employee_email != "" &&
        this.employee_phone != "" &&
        this.employee_address != ""
      ) {
        this.$apollo
          .mutate({
            mutation: UPDATE_MUTATION,
            variables: {
              id: this.id,
              employee_name: this.employee_name,
              employee_email: this.employee_email,
              employee_phone: this.employee_phone,
              employee_address: this.employee_address
            }
          })
          .then(response => {
            this.data = response.data.updateEmployee;
            location.reload();
          });
      } else {
        alert("please fill all forms");
      }
    },
    deleteEmployee(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_MUTATION,
          variables: {
            id: id
          }
        })
        .then(response => {
          this.data = response.data.deleteEmployee;
          location.reload();
        });
    },
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
      alert("Are you sure logout!");
      this.$router.push("/login").catch(() => {});
    },
    toggleNavbar() {
      this.show = !this.show;
    }
  }
};
</script>
<template>
  <div>
    <div class="card p-5 columns">
      <div class="card-content column is-two-thirds p-5">
        <h1 class="title">Add new employee</h1>
        <hr />
        <h2 class="subtitle is-4">Employee details</h2>
        <b-field class="file is-primary" :class="{ 'has-name': !!file }">
          <b-upload v-model="file" class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload picture</span>
            </span>
            <span class="file-name" v-if="file">
              {{ file.name }}
            </span>
          </b-upload>
        </b-field>
        <b-field label="First Name" horizontal>
          <b-input v-model="newEmployee.firstName" name="firstName" expanded></b-input>
        </b-field>
        <b-field label="Last Name" horizontal>
          <b-input v-model="newEmployee.lastName" name="lastName" expanded></b-input>
        </b-field>
        <b-field label="Phone number" horizontal>
          <b-input v-model="newEmployee.phone" name="phone" expanded></b-input>
        </b-field>
        <b-field label="Email" horizontal>
          <b-input v-model="newEmployee.email" name="email" expanded></b-input>
        </b-field>
        <b-field label="Temporary password" horizontal>
          <b-input v-model="newEmployee.password" name="password" expanded></b-input>
        </b-field>
        <b-field label="Availability" horizontal>
          <b-input v-model="newEmployee.availability" name="availability" expanded></b-input>
        </b-field>
        <b-field label="Notes" horizontal>
          <b-input v-model="newEmployee.description" name="description" expanded></b-input>
        </b-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button">Reset</button>
          </div>
          <div class="control">
            <button @click="submit" class="button">Save and invite</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddAccount',
  data() {
    return {
      file: null,
      newEmployee: {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        availability: '',
        description: '',
        role: '5feb3410214c2f2d14529dae'
      }
    }
  },
  methods: {
    ...mapActions('employees', ['addEmployee']),
    submit() {
      this.newEmployee.username = this.newEmployee.email
      this.addEmployee(this.newEmployee)
    }
  }
}
</script>

<style>
.field-label {
  min-width: 10rem;
}
</style>

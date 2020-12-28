<template>
  <div>
    <b-table :data="data">
      <b-table-column field="avatar" width="100" v-slot="props">
        <b-image :src="props.row.avatar"></b-image>
      </b-table-column>

      <b-table-column field="first_name" label="Employee details" v-slot="props">
        <span>{{ props.row.firstName + ' ' + props.row.lastName }}</span>
      </b-table-column>

      <b-table-column field="last_name" label="Current status">Inactive</b-table-column>

      <b-table-column field="date" label="Assigned to" centered v-slot="props">
        <span class="tag is-success">
          {{ props.row.bookings.map((booking) => booking.service.name) }}
        </span>
      </b-table-column>

      <b-table-column label="Actions"></b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'EmployeeList',
  data() {
    return {
      data: [
        {
          avatar:
            'https://expertphotography.com/wp-content/uploads/2019/11/Cute-Kitten-Picture-get-your-cat-to-look-at-the-camera.jpg',
          firstName: 'Atanas',
          lastName: 'Mitev',
          email: 'at@email.com',
          bookings: [
            {
              status: null,
              frequencyType: null,
              frequencyDurationType: null,
              tasks: [],
              assignedEmployees: [
                {
                  confirmed: false,
                  blocked: false,
                  _id: '5fe9e1eaba4f8b3a7c5cf728',
                  username: 'employee',
                  email: 'employee@employee.com',
                  firstName: 'Employee',
                  lastName: '1',
                  provider: 'local',
                  createdAt: '2020-12-28T13:47:22.187Z',
                  updatedAt: '2020-12-28T13:47:22.194Z',
                  __v: 0,
                  role: '5fe9a718ab4e6f32c4e12ed7',
                  id: '5fe9e1eaba4f8b3a7c5cf728'
                }
              ],
              _id: '5fe9e23fba4f8b3a7c5cf72a',
              startDate: '2020-12-30T11:00:00.000Z',
              endDate: '2020-12-30T21:00:00.000Z',
              published_at: '2020-12-28T13:49:39.536Z',
              createdAt: '2020-12-28T13:48:47.041Z',
              updatedAt: '2020-12-28T13:49:39.550Z',
              __v: 0,
              client: {
                confirmed: true,
                blocked: false,
                _id: '5fe9e214ba4f8b3a7c5cf729',
                username: 'business-client',
                email: 'business-client@business-client.com',
                firstName: 'Business Client',
                lastName: '1',
                provider: 'local',
                createdAt: '2020-12-28T13:48:04.226Z',
                updatedAt: '2020-12-28T13:48:04.234Z',
                __v: 0,
                role: '5fe36fef6d907410d4d186a6',
                id: '5fe9e214ba4f8b3a7c5cf729'
              },
              service: {
                image: [],
                _id: '5fe9bc039e3acd323c3822c3',
                name: 'Service one',
                taskList: 'Overall description',
                published_at: '2020-12-28T11:06:01.347Z',
                createdAt: '2020-12-28T11:05:39.960Z',
                updatedAt: '2020-12-28T12:55:04.291Z',
                __v: 0,
                serviceTask: [
                  {
                    _id: '5fe9bd4b069a3e0764f24f33',
                    kind: 'ComponentCustomServiceCustomService',
                    ref: '5fe9bcd8bfedd443cc391dfd'
                  },
                  {
                    _id: '5fe9bd4b069a3e0764f24f34',
                    kind: 'ComponentCustomServiceCustomService',
                    ref: '5fe9bcd8bfedd443cc391dfe'
                  }
                ],
                serviceTasks: [],
                description: 'description\n# Title\n\n1. list\n2. list',
                id: '5fe9bc039e3acd323c3822c3'
              },
              meeting: false,
              termsOfService: true,
              id: '5fe9e23fba4f8b3a7c5cf72a'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
tr {
  background: rgb(177, 236, 229);
}
table {
  border-spacing: 0px 10px;
}
</style>

<template>
  <div>
    <Tabs />
    <b-field>
      <b-datepicker ref="datepicker" expanded placeholder="Select a date"></b-datepicker>
    </b-field>
    <div class="card my-3">
      <div class="content is-flex is-flex-direction-column">
        <div class="is-fullwidth">
          <p class="title is-4">TOTAL HOURS FOR *MONTH*</p>
        </div>
        <div class="is-fullwidth is-align-self-flex-end mt-5">
          <p class="title is-5">24hrs 32min 30sec</p>
        </div>
      </div>
    </div>
    <TimesheetItem />
  </div>
</template>

<script>
import Tabs from '../components/Tabs'
import TimesheetItem from '../components/TimesheetItem'
export default {
  name: 'Timesheets',
  components: { Tabs, TimesheetItem }
}
</script>

<style lang="scss" scoped></style>

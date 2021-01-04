<template>
  <b-collapse :open="false" class="card" animation="slide" aria-id="contentIdForA11y3">
    <div slot="trigger" slot-scope="props" role="button" aria-controls="contentIdForA11y3">
      <div class="content is-flex is-flex-direction-column">
        <div
          class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-start"
        >
          <div class="image">
            <img
              class="image is-rounded is-64x64"
              src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            />
          </div>
          <div class="hc container is-fullwidth">
            <strong>
              <p class="is-flex is-flex-direction-row is-justify-content-space-between">
                <span>Clients name</span>
                <b-icon :icon="props.open ? 'chevron-up' : 'chevron-down'"></b-icon>
              </p>
            </strong>
            <p>Address: Some address</p>
          </div>
        </div>

        <div class="is-align-self-flex-end">
          <p class="title is-5">Time taken: 02:40:00</p>
        </div>
      </div>
    </div>

    <div class="content">
      <strong>
        <p class="is-flex is-flex-direction-row is-justify-content-space-between">
          <span>Date: 22/02/2020</span>
          <span>Started at: 00:00</span>
        </p>
        <p class="is-flex is-flex-direction-row is-justify-content-space-between">
          <span>Date: 22/02/2020</span>
          <span>Finished at: 00:00</span>
        </p>
      </strong>
    </div>
  </b-collapse>
</template>

<script>
export default {
  name: 'TasksheetItem',
  props: []
}
</script>

<style lang="scss" scoped>
.hc {
  margin-left: 10px;
}
</style>

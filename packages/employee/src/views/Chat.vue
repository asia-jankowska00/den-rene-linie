<template>
  <div>
    <div class="media">
      <div class="media-left">
        <div class="image">
          <img
            class="image is-rounded is-64x64"
            src="https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
          />
        </div>
      </div>
      <div class="media-content box">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dicta.</p>
      </div>
    </div>

    <div class="media">
      <div class="media-content box">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dicta.</p>
      </div>
      <div class="media-right">
        <div class="image">
          <img
            class="image is-rounded is-64x64"
            src="https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
          />
        </div>
      </div>
    </div>
    <div
      class="content actions is-flex is-flex-direction-row is-fullwidth is-justify-content-space-between is-align-items-center"
    >
      <b-button rounded icon-right="plus" />
      <b-field rounded><b-input placeholder="Type..." rounded></b-input></b-field>
      <b-button rounded icon-right="arrow-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  components: {}
}
</script>

<style lang="scss" scoped>
.actions {
  background: white;
  margin: 0 -10px;
  .field {
    margin: 0;
  }
}
</style>

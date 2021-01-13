<template>
  <div class="bar-bottom">
    <div class="tabs is-toggle">
      <ul>
        <li>
          <router-link tag="a" to="/dashboard/bookings">
            <div>
              <b-icon size="is-medium" pack="fas" icon="calendar-alt" />
            </div>
            Schedule
          </router-link >
        </li>
        <li>
          <router-link tag="a" to="/dashboard/guides">
            <div>
              <b-icon size="is-medium" pack="fas" icon="broom" />
            </div>
            Services
          </router-link >
        </li>
        <li>
          <router-link tag="a" to="/dashboard/notifications">
            <div>
              <b-icon size="is-medium" pack="fas" icon="bell" />
            </div>
            Notifications
          </router-link >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default { name: 'BarBottom' }
</script>

<style lang="scss" scoped>
  .bar-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #FFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    ul, li, button{
      width: 100%;
    }
    ul{
      li{
        a{
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: none;
          background-color: #FFF;
          font-size: .8rem;
          font-weight: bold;
          color: #A0A3BD;
          &.router-link-exact-active{
            color: #196972;
          }
          &:focus{
            background-color: #FFF;
          }
        }
      }
        
    }
  }
</style>
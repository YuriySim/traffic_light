<template>
  <div class="container">
    <div class="block">
      <div
        class="circle red"
        :class="{'red-active': color=='Red' && blinkKey}"
      >
        <p class="time" v-if="color=='Red'">{{second}}c</p>
      </div>
    </div>

    <div class="block">
      <div
        class="circle yellow"
        :class="{'yellow-active': color=='Yellow' && blinkKey}"
      >
        <p class="time" v-if="color=='Yellow'">{{second}}c</p>
      </div>
    </div>

    <div class="block">
      <div
        class="circle green"
        :class="{'green-active': color=='Green' && blinkKey}"
      >
        <p class="time" v-if="color=='Green'">{{second}}c</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TrafficLight',

    data() {
      return {
        second: 0,

        interval: null,

        routeKey: true,
        blinkKey: true,
      }
    },

    methods: {
      constSeconds(color) {
        if (this.remSecond === 0) {
          if (color === 'Red') {
            this.updateSecond(10)
          } else if (color === 'Yellow'){
            this.updateSecond(3)
          } else if (color === 'Green'){
            this.updateSecond(15)
          }
        }
      },

      blinkColor() {
        if (this.second <= 3 && this.second % 2 !== 0) {
          this.blinkKey = false
        } else if (this.second < 3) {
          this.blinkKey = true
        }
      },

      toggleColor() {
        this.blinkKey = true
        this.second = this.remSecond

        switch (this.color) {
          case 'Red':
            this.interval = setInterval(() => {
              if (this.second > 0) {
                this.blinkColor()

                this.second--
                this.updateSecond(this.second)
              } else {
                this.routeKey = true;
                this.$router.push('/yellow')
              }
            }, 1000)

            break

          case 'Yellow':
            this.interval = setInterval(() => {
              if (this.second > 0) {
                this.blinkColor()

                this.second--
                this.updateSecond(this.second)
              } else {
                if(this.routeKey) {
                  this.$router.push('/green')
                } else this.$router.push('/red')
              }
            }, 1000)

            break

          case 'Green':
            this.interval = setInterval(() => {
              if (this.second > 0) {
                this.blinkColor()

                this.second--
                this.updateSecond(this.second)
              } else {
                this.routeKey = false;
                this.$router.push('/yellow')
              }
            }, 1000)

            break
        }
      },

      updateSecond(second) {
        this.$store.commit('updateSecond', second)
      },
    },

    computed: {
      color() {
        this.constSeconds(this.$route.name)

        return this.$route.name || 'Red'
      },

      remSecond() {
        return this.$store.getters.remSecond
      },
    },

    watch: {
      color() {
        if(this.interval) {
          clearInterval(this.interval)
        }
        this.updateSecond(0)
        this.constSeconds(this.color)
        this.toggleColor()
      }
    },

    mounted() {
      if(!this.interval) {
        this.toggleColor()
      }
    },

    beforeUnmount() {
      clearInterval(this.interval)
    },
  }
</script>

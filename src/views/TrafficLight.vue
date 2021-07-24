<!--Traffic light Vue component-->
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

        routeKey: true, //responsible for switching the route from the yellow signal
        blinkKey: true, //responsible for the blinking of light
      }
    },

    methods: {

      //this function defines "second" depending on "route"
      //condition "remSecond === 0" is necessary to keep the state across page reloads
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

      //this function starts blinking of light when "second < 3"
      blinkColor() {
        if (this.second <= 3 && this.second % 2 !== 0) {
          this.blinkKey = false
        } else if (this.second < 3) {
          this.blinkKey = true
        }
      },

      //this function counts down seconds
      //when "second = 0" it changes "route" (and color)
      toggleColor() {
        this.blinkKey = true
        this.second = this.remSecond

        switch (this.color) {
          case 'Red':
            this.interval = setInterval(() => {
              if (this.second > 0) {
                this.blinkColor()

                this.second--

                //saves state on every iteration in case of page reload:
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

      //this function calls mutation Vuex
      updateSecond(second) {
        this.$store.commit('updateSecond', second)
      },
    },

    computed: {
      //this function determines the color depending on the "route"
      color() {
        this.constSeconds(this.$route.name)

        return this.$route.name || 'Red'
      },

      //this function calls getter Vuex
      remSecond() {
        return this.$store.getters.remSecond
      },
    },

    watch: {
      //Tracks route changes
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
      if(this.interval) {
        clearInterval(this.interval)
      }
    },
  }
</script>

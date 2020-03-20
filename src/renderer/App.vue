<template>
  <div id="app">
    <div v-if="loggedIn">
      <router-view></router-view>
    </div>
    <div v-else>
      <div v-bind:class="{ loader_state_none: loaderisactive }">
        <div class="cssload-wrap">
          <div class="cssload-cssload-spinner"></div>
          <div class="cssload-title">Chargement ...</div>
        </div>
      </div>

      <div class="login_background login_background2">
        <!-- <h2>Login</h2>
        <form @submit.prevent="login">
          <label><input v-model="email" placeholder="Username"></label>
          <label><input v-model="pass" placeholder="Password" type="password"></label> (hint: password1)<br>
          <button type="submit">login</button>
          <p v-if="error" class="error">Bad login information</p>
        </form> -->

        <div class="applogin_content">
          <div class="demo">
              <div class="login">
                <!-- <div class="login__check"></div> -->
                <div class="login_avatar">
                  <div class="logo_skear"></div>
                </div>
                <div class="login__form">
                  <form @submit.prevent="login">
                  <div class="login__row">
                    <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
                      <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"></path>
                    </svg>
                    <input type="text" class="login__input name" v-model="email" placeholder="Username">
                  </div>
                  <div class="login__row">
                    <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
                      <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"></path>
                    </svg>
                    <input v-model="pass" class="login__input pass" placeholder="Password" type="password">
                  </div>
                  <p v-if="error" class="error">Bad login information</p>
                  <button type="submit" class="login__submit">Sign in</button>
                  </form>
                </div>
              </div>
            </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import auth from '@/components/login/auth'
  export default {
    name: 'skearcommunity',
      data () {
      return {
        email: '',
        pass: '',
        error: false,
        loggedIn: auth.loggedIn(),
        loaderisactive: true
      }
    },
    methods: {
      login () {
        this.loaderisactive = false;
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
            this.loaderisactive = true;
          } else {
            this.$router.replace(this.$route.query.redirect || '/')
            this.loaderisactive = true;
          }
        })
      }
    },
    created () {
      auth.onChange = loggedIn => {
        this.loggedIn = loggedIn
      }
    }
  }
</script>

<style>
  body {
    margin : 0px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
  }
  .error {
    color: red;
    font-size: 18px;
    margin-top: 1rem;
  }
  pre {
   white-space: pre-wrap;
   word-wrap: break-word;
   font-family: inherit;
  }

  ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      cursor: pointer;
  }
  ::-webkit-scrollbar-track {
      /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 6px;*/
      display: none;
  }
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }

  /*Loading*/
  .loader_state_none{
    display: none;
  }

  .cssload-title{
    /* color: #02baff; */
    position: absolute;
    margin-top: 75px;
    -webkit-animation: rainbow 2s ease infinite;
    -z-animation: rainbow 2s ease infinite;
    -o-animation: rainbow 2s ease infinite;
      animation: rainbow 2s ease infinite;
  }

  @-webkit-keyframes rainbow{
  	0%{color: #02baff;}
  	50%{color: rgba(2, 186, 255, 0.21);}
  	100%{color: #02baff;}
  }

  .cssload-wrap {
  display: flex;
  display: -o-flex;
  display: -ms-flex;
  display: -webkit-flex;
  display: -moz-flex;
  box-pack: center;
  -o-box-pack: center;
  -ms-box-pack: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  box-align: center;
  -o-box-align: center;
  -ms-box-align: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  perspective: 390px;
  -o-perspective: 390px;
  -ms-perspective: 390px;
  -webkit-perspective: 390px;
  -moz-perspective: 390px;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 9999;
  width: 100%;

  /* margin-top: 50px;
  margin-left: 39px;
  padding-right: 39px;
  padding-bottom: 50px; */
  /* background: rgba(0, 0, 0, 0.05); */
}

.cssload-cssload-spinner {
  position: relative;
  transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  animation: cssload-wobble 4.59s ease-in-out infinite;
  -o-animation: cssload-wobble 4.59s ease-in-out infinite;
  -ms-animation: cssload-wobble 4.59s ease-in-out infinite;
  -webkit-animation: cssload-wobble 4.59s ease-in-out infinite;
  -moz-animation: cssload-wobble 4.59s ease-in-out infinite;
}

.cssload-cssload-spinner:before,
.cssload-cssload-spinner:after {
  display: block;
  content: ' ';
  border-radius: 50%;
  width: 88px;
  height: 88px;
  -webkit-clip-path: polygon(50% 0, 7% 26%, 7% 74%, 50% 100%, 93% 74%, 93% 26%, 83% 32%, 83% 69%, 50% 89%, 17% 69%, 17% 32%, 50% 12%, 83% 32%, 93% 26%);
  clip-path: polygon(50% 0, 7% 26%, 7% 74%, 50% 100%, 93% 74%, 93% 26%, 83% 32%, 83% 69%, 50% 89%, 17% 69%, 17% 32%, 50% 12%, 83% 32%, 93% 26%);
  animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -o-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -ms-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -webkit-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -moz-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
}

.cssload-cssload-spinner:before {
  background-color: #02baff;
  background: linear-gradient(to right, #3271ff, #02baff);
  position: absolute;
}

.cssload-cssload-spinner:after {
  background-color: #4c4c4c;
  background: linear-gradient(to right, #768f9d, #4c4c4c);
  animation-delay: -0.86s;
  -o-animation-delay: -0.86s;
  -ms-animation-delay: -0.86s;
  -webkit-animation-delay: -0.86s;
  -moz-animation-delay: -0.86s;
}

@keyframes cssload-wobble {
  0%,
  100% {
    transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-o-keyframes cssload-wobble {
  0%,
  100% {
    -o-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -o-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-ms-keyframes cssload-wobble {
  0%,
  100% {
    -ms-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -ms-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-webkit-keyframes cssload-wobble {
  0%,
  100% {
    -webkit-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -webkit-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-moz-keyframes cssload-wobble {
  0%,
  100% {
    -moz-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -moz-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@keyframes cssload-spin {
  0%,
  100% {
    transform: translateZ(49px) rotateX(14deg);
  }
  33% {
    transform: translateZ(-49px) scale(0.4);
  }
  66% {
    transform: translateZ(-49px);
  }
}

@-o-keyframes cssload-spin {
  0%,
  100% {
    -o-transform: translateZ(49px) rotateX(14deg);
  }
  33% {
    -o-transform: translateZ(-49px) scale(0.4);
  }
  66% {
    -o-transform: translateZ(-49px);
  }
}

@-ms-keyframes cssload-spin {
  0%,
  100% {
    -ms-transform: translateZ(49px) rotateX(14deg);
  }
  33% {
    -ms-transform: translateZ(-49px) scale(0.4);
  }
  66% {
    -ms-transform: translateZ(-49px);
  }
}

@-webkit-keyframes cssload-spin {
  0%,
  100% {
    -webkit-transform: translateZ(49px) rotateX(14deg);
  }
  33% {
    -webkit-transform: translateZ(-49px) scale(0.4);
  }
  66% {
    -webkit-transform: translateZ(-49px);
  }
}

@-moz-keyframes cssload-spin {
  0%,
  100% {
    -moz-transform: translateZ(49px) rotateX(14deg);
  }
  33% {
    -moz-transform: translateZ(-49px) scale(0.4);
  }
  66% {
    -moz-transform: translateZ(-49px);
  }
}

  /* Background fond login */
  .logo_skear{
    background: url(assets/skearlogo.png);
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    margin-left: 5rem;
  }
  .login_avatar{
    bottom: 45%;
    left: 0;
    width: 100%;
    height: 54%;
    position: absolute;
  }
  .login_background {
    background: url(assets/spacestation3.jpg);
    background-size: cover;
    background-repeat:no-repeat;
    background-position: center;
  }
  .login_background2 {
    /* background-color: rgba(0, 0, 0, 0.7); */
    background-blend-mode: multiply;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    color: white;
    overflow: scroll;
    /*padding-bottom: 4rem !important;
    padding-top: 4.5rem !important;*/
  }

  /*ajout*/
 /* html, body {
  font-size: 62.5%;
  height: 100%;
  overflow: hidden;
}
@media (max-width: 768px) {
  html, body {
    font-size: 50%;
  }
} */

.applogin_content{
  font-size: 62.5%;
  height: 100%;
  overflow: hidden;
}

.applogin_content svg {
  display: inline-block;
  width: 1.3rem;
  height: 1.8rem;
  overflow: visible;
}

.applogin_content .svg-icon {
  cursor: pointer;
}
.applogin_content .svg-icon path {
  stroke: rgba(255, 255, 255, 0.9);
  fill: none;
  stroke-width: 1;
}

.applogin_content input, button {
  outline: none;
  border: none;
}

.applogin_content .demo {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12rem;
  margin-top: -19.5rem;
  width: 24rem;
  height: 38rem;
  overflow: hidden;
}

.applogin_content .login {
  position: relative;
  height: 100%;
  background: -webkit-gradient(linear, left top, left bottom, from(rgba(135, 158, 187, 0)), to(rgba(0, 0, 0, 0.6)));
  background: linear-gradient(to bottom, rgba(135, 158, 187, 0)) 0%, rgba(0, 0, 0, 0.6) 100%);
  -webkit-transition: opacity 0.1s, -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
  transition: opacity 0.1s, -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
  transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
  transition: opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25), -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25);
  -webkit-transform: scale(1);
          transform: scale(1);
}
.applogin_content .login.inactive {
  opacity: 0;
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
.applogin_content .login__check {
  position: absolute;
  top: 16rem;
  left: 13.5rem;
  width: 14rem;
  height: 2.8rem;
  background: #fff;
  -webkit-transform-origin: 0 100%;
          transform-origin: 0 100%;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}
.applogin_content .login__check:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 2.8rem;
  height: 5.2rem;
  background: #fff;
  -webkit-box-shadow: inset -0.2rem -2rem 2rem rgba(0, 0, 0, 0.2);
          box-shadow: inset -0.2rem -2rem 2rem rgba(0, 0, 0, 0.2);
}
.applogin_content .login__form {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 1rem 2.5rem;
  text-align: center;
}
.applogin_content .login__row {
  height: 3rem;
  padding-top: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.applogin_content .login__icon {
  margin-bottom: -0.4rem;
  margin-right: 0.5rem;
}
.applogin_content .login__icon.name path {
  stroke-dasharray: 73.50196075439453;
  stroke-dashoffset: 73.50196075439453;
  -webkit-animation: animatePath 2s 0.5s forwards;
          animation: animatePath 2s 0.5s forwards;
}
.applogin_content .login__icon.pass path {
  stroke-dasharray: 92.10662841796875;
  stroke-dashoffset: 92.10662841796875;
  -webkit-animation: animatePath 2s 0.5s forwards;
          animation: animatePath 2s 0.5s forwards;
}
.applogin_content .login__input {
  display: inline-block;
  width: 17rem;
  height: 100%;
  padding-left: 1.5rem;
  font-size: 1rem;
  background: transparent;
  color: #FDFCFD;
}
.applogin_content .login__submit {
  position: relative;
  width: 100%;
  height: 3rem;
  margin: 1rem 0 2.2rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(51, 84, 255, 0.66);
  font-size: 1rem;
  border-radius: 3rem;
  cursor: pointer;
  overflow: hidden;
  -webkit-transition: width 0.3s 0.15s, font-size 0.1s 0.15s;
  transition: width 0.3s 0.15s, font-size 0.1s 0.15s;
}
.applogin_content .login__submit:focus{
  outline: none;
}
.applogin_content .login__submit:active{
  background: rgba(51, 84, 255, 0.46);
}
.applogin_content .login__submit:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1.5rem;
  margin-top: -1.5rem;
  width: 3rem;
  height: 3rem;
  border: 2px dotted #fff;
  border-radius: 50%;
  border-left: none;
  border-bottom: none;
  -webkit-transition: opacity 0.1s 0.4s;
  transition: opacity 0.1s 0.4s;
  opacity: 0;
}
.applogin_content .login__submit.processing {
  width: 4rem;
  font-size: 0;
}
.applogin_content .login__submit.processing:after {
  opacity: 1;
  -webkit-animation: rotate 0.5s 0.4s infinite linear;
          animation: rotate 0.5s 0.4s infinite linear;
}
.applogin_content .login__submit.success {
  -webkit-transition: opacity 0.1s 0.3s, background-color 0.1s 0.3s, -webkit-transform 0.3s 0.1s ease-out;
  transition: opacity 0.1s 0.3s, background-color 0.1s 0.3s, -webkit-transform 0.3s 0.1s ease-out;
  transition: transform 0.3s 0.1s ease-out, opacity 0.1s 0.3s, background-color 0.1s 0.3s;
  transition: transform 0.3s 0.1s ease-out, opacity 0.1s 0.3s, background-color 0.1s 0.3s, -webkit-transform 0.3s 0.1s ease-out;
  -webkit-transform: scale(30);
          transform: scale(30);
  opacity: 0.9;
}
.applogin_content.login__submit.success:after {
  -webkit-transition: opacity 0.1s 0s;
  transition: opacity 0.1s 0s;
  opacity: 0;
  -webkit-animation: none;
          animation: none;
}
.applogin_content .login__signup {
  font-size: 1.2rem;
  color: #ABA8AE;
}
.applogin_content .login__signup a {
  color: #fff;
  cursor: pointer;
}

.applogin_content .ripple {
  position: absolute;
  width: 15rem;
  height: 15rem;
  margin-left: -7.5rem;
  margin-top: -7.5rem;
  background: rgba(0, 0, 0, 0.4);
  -webkit-transform: scale(0);
          transform: scale(0);
  -webkit-animation: animRipple 0.4s;
          animation: animRipple 0.4s;
  border-radius: 50%;
}

@-webkit-keyframes animRipple {
  to {
    -webkit-transform: scale(3.5);
            transform: scale(3.5);
    opacity: 0;
  }
}

@keyframes animRipple {
  to {
    -webkit-transform: scale(3.5);
            transform: scale(3.5);
    opacity: 0;
  }
}
@-webkit-keyframes rotate {
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate {
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@-webkit-keyframes animatePath {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes animatePath {
  to {
    stroke-dashoffset: 0;
  }
}

</style>

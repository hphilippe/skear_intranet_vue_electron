<template>
  <div class="background_space">

    <div class="container">
    <div class="spaceship">
      <div class="logo"></div>
      <div class="stabilizer_right">
        <div class="smoke_stabilizer_right">
          <div class="smoke_stabilizer_right one"></div>
        </div>
      </div>
      <div class="stabilizer_left"></div>
      <div class="line"></div>
      <div class="line second"></div>
      <div class="line third"></div>
      <div class="line four"></div>
      <div class="decor_one"></div>
      <div class="decor_two"></div>
      <div class="leftleg">
        <div class="leftlegsecondpart"></div>
      </div>
      <div class="rightleg">
        <div class="rightlegsecondpart"></div>
      </div>
      <div class="smoke">
        <div class="smoke_particule"></div>
        <div class="smoke_particule one"></div>
        <div class="smoke_particule two"></div>
      </div>
    </div>
    <div class="shadow"></div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'skearspace',
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  created(){

  }
}
</script>

<style scoped>

@keyframes shadow {
  0% {
    transform: scale(0.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes landing {
  0% {
    top: -400px;
    transform: rotate(25deg);
  }
  100% {
    top: 300px;
    transform: rotate(0deg);
  }
}
@keyframes smokestabilizerright {
  0% {
    width: 0px;
    transform: scale(0);
  }
  10% {
    width: 20px;
    transform: scale(0.6);
  }
  50% {
    width: 40px;
    transform: scale(1);
  }
  72% {
    width: 20px;
    transform: scale(0.8);
  }
  100% {
    width: 0px;
  }
}
@keyframes openlegleft {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(-120deg);
  }
  100% {
    transform: rotate(-120deg);
  }
}
@keyframes secondleg {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
    width: 30px;
  }
  69% {
    width: 60px;
  }
  70% {
    transform: rotate(69deg);
    width: 60px;
  }
  80% {
    width: 60px;
  }
  90% {
    width: 60px;
  }
  100% {
    transform: rotate(69deg);
    width: 60px;
  }
}
@keyframes smoke {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
    transform: scale(0);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes smokeparticule {
  0% {
    transform: scale(0);
  }
  10% {
    transform: scale(0.6);
  }
  30% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.6);
  }
  80% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes secondlegright {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
    width: 30px;
  }
  69% {
    width: 60px;
  }
  70% {
    transform: rotate(-69deg);
    width: 60px;
  }
  80% {
    width: 60px;
  }
  90% {
    width: 60px;
  }
  100% {
    transform: rotate(-69deg);
    width: 60px;
  }
}
@keyframes openlegright {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(120deg);
  }
  100% {
    transform: rotate(120deg);
  }
}

.background_space {
  /* background: #ff7e5f; */
  background: url(../../assets/windowxp.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
}

.container {
  height: 600px;
  width: 400px;
  margin: 0 auto;
  position: relative;
}

.container .shadow {
  width: 120px;
  height: 20px;
  position: absolute;
  bottom: 22px;
  left: 41%;
  border-radius: 50%;
  z-index: 0;
  /* filter: blur(15px) */
  background: #666;
  animation: shadow 10s;
  animation-fill-mode: forwards;
  opacity: 0.7;
}
.container .spaceship {
  height: 246px;
  width: 50px;
  background: #f5f5f5;
  position: relative;
  border-radius: 15px 15px 6px 6px;
  left: 50%;
  top: 100px;
  animation: landing 10s;
  animation-fill-mode: forwards;
  z-index: 2;
}
.container .spaceship .logo {
  /* background: url("https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg") no-repeat; */
  background: url(../../assets/spaceskearlogo.png);
  background-repeat:no-repeat;
  height: 20px;
  width: 100px;
  transform: rotate(-90deg);
  position: absolute;
  background-size: 100%;
  top: 43px;
  right: -27px;
  z-index: 99999;
}
.container .spaceship .stabilizer_left {
  height: 5px;
  width: 5px;
  background: #CCC;
  left: 0px;
  top: 20px;
  position: absolute;
}
.container .spaceship .stabilizer_right {
  height: 5px;
  width: 5px;
  background: #CCC;
  right: 0px;
  top: 20px;
  position: absolute;
}
.container .spaceship .stabilizer_right .smoke_stabilizer_right.one {
  height: 15px;
  width: 40px;
  position: relative;
  display: block;
  left: 10px;
  filter: blur(10px);
  background: #F5F5F5;
  top: 0;
  animation: smokestabilizerright 10s;
  animation-fill-mode: forwards;
}
.container .spaceship .line {
  width: 100%;
  height: 1px;
  position: relative;
  top: 40px;
  background: #ccc;
  z-index: 9;
}
.container .spaceship .line:after {
  content: " ";
  display: block;
  width: 100%;
  height: 1px;
  position: relative;
  top: 1px;
  background: #fff;
}
.container .spaceship .line.second {
  top: 44px;
}
.container .spaceship .line.third {
  top: 80px;
}
.container .spaceship .line.four {
  top: 84px;
}
.container .spaceship .decor_one {
  position: absolute !important;
  width: 100%;
  height: 60px;
  background: #2c3e50;
  position: relative;
  bottom: -1px;
  z-index: 3;
  border-radius: 0 0 6px 6px;
}
.container .spaceship .decor_two {
  position: relative;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: 109px;
  z-index: 3;
  background: #2c3e50;
  height: 80px;
  border-radius: 25px 25px 0 0;
}
.container .spaceship .leftleg {
  position: absolute;
  width: 10px;
  height: 40px;
  left: 10px;
  bottom: 0px;
  background: #000;
  z-index: 2;
  transform: rotate(-135deg);
  animation: openlegleft 6s ease-in-out;
  animation-fill-mode: forwards;
  transform-origin: bottom left;
}
.container .spaceship .leftleg .leftlegsecondpart {
  width: 30px;
  height: 4px;
  background: #000;
  position: absolute;
  transform: rotate(80deg);
  transform-origin: bottom left;
  left: 5px;
  top: -3px;
  animation: secondleg 6s ease-in-out;
  animation-fill-mode: forwards;
}
.container .spaceship .rightleg {
  position: absolute;
  width: 10px;
  height: 40px;
  right: 10px;
  bottom: 0px;
  z-index: 2;
  transform: rotate(135deg);
  background: #000;
  transform-origin: bottom right;
  animation: openlegright 6s ease-in-out;
  animation-fill-mode: forwards;
}
.container .spaceship .rightleg .rightlegsecondpart {
  width: 40px;
  height: 4px;
  background: #000;
  position: absolute;
  transform: rotate(80deg);
  transform-origin: bottom right;
  right: 6px;
  animation: secondlegright 6s ease-in-out;
  animation-fill-mode: forwards;
}
.container .spaceship .smoke {
  position: absolute;
  bottom: -40px;
  width: 50px;
  height: 30px;
  margin: 0 auto;
  animation: smoke 10s;
  animation-fill-mode: forwards;
}
.container .spaceship .smoke .smoke_particule {
  height: 20px;
  width: 40xp;
  position: relative;
  border-radius: 50px;
  background: #999;
  filter: blur(8px);
  animation: smokeparticule 10s;
}
.container .spaceship .smoke .smoke_particule.one {
  height: 10px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
.container .spaceship .smoke .smoke_particule.two {
  height: 10px;
  width: 20px;
  margin: 0 auto;
  display: block;
}

</style>

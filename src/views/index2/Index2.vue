<template>
  <div class="index2">
    <div class="bg">
      <video preload="auto" autoplay loop playsinline src="~assets/index2/bg.mp4"></video>
    </div>
    <div class="animation">
      <img class="intro" src="~assets/index2/intro.png" />
      <div class="badge">
        <img class="music" src="~assets/index2/badge-music.png" />
        <img class="ring" src="~assets/index2/badge-ring.png" />
      </div>
      <img class="subtitle" src="~assets/index2/subtitle.png" />
      <img class="title" src="~assets/index2/title.png" />
      <div class="roller">
        <div class="roller1">
          <div class="text"></div>
        </div>
        <div class="roller2">
          <div class="text"></div>
        </div>
      </div>
      <img class="arrow" src="~assets/index2/arrow.png" @click="onNext" />
      <img class="footer" src="~assets/index2/footer.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import useNext from '../useNext';

export default defineComponent({
  name: 'index2',
  components: {},
  props: {},
  setup() {
    const { nextPage } = useNext();

    const onNext = () => {
      nextPage({
        currentViewName: 'session1',
        nextViewName: 'session2'
      });
    };

    return { onNext };
  }
});
</script>

<style lang="scss">
.index2 {
  width: 100%;
  height: 100vh;
  position: relative;
  .bg {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    video {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
  .animation {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    .intro {
      margin-top: 11%;
      margin-left: 10%;
      width: 58.6%;
      height: 4.4%;
      flex-shrink: 0;
    }
    .badge {
      top: 4.2%;
      right: 7%;
      width: 16.5%;
      height: 16.5%;
      position: absolute;
      .music {
        position: relative;
        width: 100%;
        animation: rotate 30s linear 0s infinite normal none;
        animation-direction: reverse;
      }
      .ring {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        animation: rotate 20s linear 0s infinite normal none;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(1turn);
        }
      }
    }
    .subtitle {
      margin-top: 18.1%;
      margin-left: 10%;
      margin-bottom: 7.72%;
      width: 50.6%;
      height: 7.5%;
    }
    .title {
      margin-left: 10%;
      margin-bottom: 4.53%;
      width: 53.6%;
    }
    .roller {
      height: 15.33%;
      width: 100%;
      position: relative;
      overflow: hidden;
      .roller1 {
        position: absolute;
        background-image: url('assets/index2/band1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        .text {
          transform: rotate(355deg);
          transform-origin: left top;
          margin-top: 21%;
          width: 209%;
          height: 16%;
          background-image: url('assets/index2/band-text.png');
          animation: roll 20s linear -10s infinite normal both;
          background-size: contain;
          background-repeat: repeat-x;
        }
      }
      .roller2 {
        position: absolute;
        background-image: url('assets/index2/band2.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        .text {
          transform: rotate(9.8deg);
          transform-origin: left top;
          margin-top: 2%;
          width: 209%;
          height: 16%;
          background-image: url('assets/index2/band-text.png');
          animation: roll 20s linear -10s infinite normal both;
          animation-direction: reverse;
          background-size: contain;
          background-repeat: repeat-x;
        }
      }
      @keyframes roll {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 200vw 0;
        }
      }
    }
    .arrow {
      position: absolute;
      right: 0;
      bottom: 15.5vh;
      width: 36.1%;
      height: 8%;
    }
    .footer {
      position: absolute;
      right: 5%;
      bottom: 2.5%;
      width: 90.19%;
      height: 5.6%;
    }
  }
}
</style>

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'animejs/lib/anime.es.js';
declare module 'three';
declare module 'three/examples/jsm/utils/BufferGeometryUtils.js';
declare module 'components/mask/useAnime';

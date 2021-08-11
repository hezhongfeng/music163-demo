declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 这里是为了处理ts的校验规则，error TS7016: Could not find a declaration file for module
declare module 'animejs/lib/anime.es.js';
declare module 'three';
declare module 'three/examples/jsm/utils/BufferGeometryUtils.js';
declare module 'components/mask/useAnime';

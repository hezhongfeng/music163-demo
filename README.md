# 模仿《你的性格主导色》

![](https://raw.githubusercontent.com/hezhongfeng/images/master/163.gif?token=AC4ZP2XPYYRP6GI7HXOOOOLDBQEP2)

> Vue 3 + Typescript + Vite

在线 [Demo](https://hezf-music.vercel.app/)

## 运行

```js
// 安装
yarn
// 本地运行
yarn dev
```

## 介绍

《你的性格主导色》是今年网易云音乐前端团队开发的一款测试用户主导色的 H5 应用，上线后反响很好，刷爆了微博和朋友圈。

项目的主要开发者 `imyzf` 发表了一篇文章《官方揭秘！你的颜色是这样算出来的》，解释了一些动效和最后主导色的计算方面的问题。但由于涉及到了具体的业务，所以作者没有开源出源码，但是热心的作者给了很多的提示。我就是根据这些提示，揭秘了我比较感兴趣的部分。

由于一直没有在生产环境中使用`Vue3.0`和`vite`，所以源码部分我使用了 `Vue3.0`+`vite`实现。

## 页面预加载

> 答题类页面与一般的 H5 页面的不同之处在于，用户的操作路径是确定的，即每个页面的下一页路由是固定的，所以在 router 层面做了优化，提前预加载了下一个页面

由于活动页面使用了大量的视频和动效等，所以想在用户阅读选择题目的过程中把下一页的页面渲染完毕，这样切换到下一页面的时候会很流畅，体验很好。

最初就想着怎么利用 `vue-router` 完成页面的预加载。但是搞了一圈发现，都是基于`webpack`或者`vite`的懒加载，提前加载了一些资源，并不会提前渲染出页面。

后来通过看`vue-router`文档，才找到了灵感，利用命名视图，同时展示 2 个视图，使用`css`隐藏下一页，这时候虽然不显示，但是页面已经渲染出来了。

通过修改`router-view`的 `name` 属性，完成页面的切换。也就是说，其实我的路由是没有变化的。

```javascript
// App.vue
<template>
  <router-view :name="currentViewName"></router-view>
  <router-view :name="nextViewName"></router-view>
</template>

// 注意 ，这里使用两个 viewName 完成了页面的跳转，next 的页面被预加载
const currentViewName = computed(() => store.getters.currentViewName);
const nextViewName = computed(() => store.getters.nextViewName);

// router的定义部分
const routes = [
  {
    path: '/',
    components: {
      default: Index1,
      index2: Index2,
      session1: Session1,
      session2: Session2,
      session5: Session5
    }
  }
];
```

看上面的代码，`Index1`、`Index2` 和`Session1`等其实就是每一页的组件了，通过修改`currentViewName`和`nextViewName`就可以达到页面切换的目的。

最终的效果是下图这样的，下一页已经提前渲染出来：

![](https://i.loli.net/2021/08/11/stmdjcFqlSyNvTh.png)

## 翻页动效

作者提示说使用`canvas`实现了页面切换时候的幕布拉动效果，主要运用了最核心的 `canvas API` 是 `bezierCurveTo`。

通过查询得知，`bezierCurveTo` 需要 3 个 点用来绘制三次贝赛尔曲线，[在线体验](https://www.w3school.com.cn/tags/canvas_beziercurveto.asp)

看下图，想要实现拉动动画，`P1 P2 P3`的`X`轴坐标需要持续变化，然后绘制曲线，就能够实现拉动的效果了。

![](https://i.loli.net/2021/08/05/23L7wEYhnfaNdt4.png)

我这里使用了比较轻量的`JavaScript` 动画库`animejs`，用来控制上面几个点的持续移动。3 个动画效果分别移动了`P1 P2 P3`的`X`轴坐标 ，再配合曲线的绘制，就达到了基本的拉动幕布效果。

```javascript
const heights = [0, 0.5 * pageHeight, pageHeight];
points = {
  p1: {
    x: pageWidth,
    y: heights[0]
  },
  p2: {
    x: pageWidth,
    y: heights[1]
  },
  p3: {
    x: pageWidth,
    y: heights[2]
  },
  p4: {
    x: pageWidth,
    y: heights[2]
  },
  p5: {
    x: pageWidth,
    y: heights[0]
  }
};

// P1点的变化
anime({
  targets: points.p1,
  x: 0,
  easing: 'easeInQuart',
  delay: 50,
  duration: 500
});

// P2点的变化
anime({
  targets: points.p2,
  x: 0,
  easing: 'easeInSine',
  duration: 500
});

anime({
  targets: points.p2,
  y: 0.6 * pageHeight,
  easing: 'easeInSine',
  duration: 500
});

// P3点的变化
anime({
  targets: points.p3,
  x: 0,
  easing: 'easeInQuart',
  delay: 50,
  duration: 500
});

// 画曲线
anime({
  duration: 550,
  update: function () {
    // 清除上一次的绘制
    ctx.clearRect(0, 0, pageWidth, pageHeight);
    ctx.beginPath();
    ctx.moveTo(points.p1.x, points.p1.y);
    // 幕布的上半区域
    ctx.bezierCurveTo(points.p1.x, points.p1.y, points.p2.x, points.p2.y - 0.2 * pageHeight, points.p2.x, points.p2.y);
    // 幕布的下半区域
    ctx.bezierCurveTo(points.p2.x, points.p2.y + 0.2 * pageHeight, points.p3.x, points.p3.y, points.p3.x, points.p3.y);
    // 已拉动部分的矩形区域
    ctx.lineTo(points.p4.x, points.p4.y);
    ctx.lineTo(points.p5.x, points.p5.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#f1f1f1';
    ctx.stroke();
  }
});
```

最终完成的效果是这样的：

![](https://i.loli.net/2021/08/11/lOimJnR6HZ9Lh7V.gif)

这个动效由于每一页都需要使用，所以考虑完成一个通用的全局组件。

考虑到使用的时候一般组件需要写到`vue` 模板上面，很不方便，所以最好通过一个全局函数直接显示这段动效，类似于`showAnimation()`;

首先需要完成一个独立的组件，由于想覆盖掉页面的所有信息，所以使用了 `Vue3.0` 最新提供的`teleport` 组件：

```javascript
<!-- 这个canvas会被渲染为 app 的子级 -->
  <teleport to="#app">
    <canvas class="mask-canvas" ref="canvas" :class="{ 'mask-canvas-posi': isShow }"></canvas>
  </teleport>
```

然后需要把组件通过 Vue 插件的方式注册到全局属性，由于我想使用 `Composition API` ，所以最终决定使用 `provide `+ `inject` 的方式注册和使用全局 `property`。一般的情况下使用`app.config.globalProperties`就可以了，但是这种配合`Composition API`写起来会比较麻烦，不推荐。

```javascript
(Mask as any).install = (app: App): void => {
  // Vue3 的 Composition API 建议使用 provide + inject 的方式注册和使用全局 property
  app.provide('mask', Mask);
};

// 使用的时候
const Mask = inject('mask');
```

最后，由于翻页动效和路由都在一起使用，就继续封装了个`useNext`函数，这样在一般的`view`组件使用的话，就非常简单了，同时做了翻页动效和翻页的操作：

```javascript
nextPage();
```

到这里我可以夸夸`Composition API`了，非常的简单和方便，通过这个全局通用组件的封装，我彻底喜欢上了这种方式。

## 云层动效

todo...

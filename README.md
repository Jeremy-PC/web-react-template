# web-react-template

## 背景介绍

> 该架构是基于 egg+react17+mobx6+antd+webpack5 组成的。该架构首先用 egg 搭建个 node 后台，代理所有的请求（包括页面的请求和接口的请求）。此外，在页面的开发中，主要使用 react17 架构（大部分组件都是基于 react hook 来实现的），并且使用 mobx6 做为状态管理工具（相比 mobx5，写法上有点小区别）。在 UI 层面，主要使用了 antd 做为 UI 库（主要还是为了快速开发，因为 antd 的 UI 组件库比较丰富）。在打包架构方面，主要使用了 webpack5（相比 webpack4，该版本内置了很多实用的打包插件，可以方便我们快速入门。）

## 工程结构

> 根目录

| 文件名称 |                    描述                    |
| :------: | :----------------------------------------: |
|  .husky  |       主要是做一些 commit 的钩子函数       |
|   app    |   egg 运行时, 主要目录模块(详情: 附录 1)   |
|  config  | egg 运行时, 用于编写配置文件(详情: 附录 2) |
|   logs   |      egg 运行时, 产生的 log 日志文件       |
|   run    |       egg 运行时, 产生的配置信息文件       |
|   src    |          项目的源码(详情: 附录 3)          |
| webpack  |             项目打包的配置文件             |

> 附录 1, 其他可以参考: [egg 官网](https://eggjs.org/zh-cn/basics/structure.html)

|  文件名称  |                         描述                          |
| :--------: | :---------------------------------------------------: |
| controller |       用于解析用户的输入，处理后返回相应的结果        |
|   public   | 用于放置静态资源(即 src 打包出来的文件会放在该目录下) |
| middleware |                    用于编写中间件                     |
| router.js  |                 用于配置 URL 路由规则                 |

> 附录 2, 其他可以参考: [egg 官网](https://eggjs.org/zh-cn/basics/structure.html)

|     文件名称     |          描述          |
| :--------------: | :--------------------: |
| config.{env}.js  |    用于编写配置文件    |
| config/plugin.js | 用于配置需要加载的插件 |

> 附录 3, 其他可以参考: [mobx 官网](https://cn.mobx.js.org/) 和 [mobx-react 官网](https://mobx-react.js.org/)

|   文件名称    |                      描述                      |
| :-----------: | :--------------------------------------------: |
|   template    | 多页应用的入口文件(建议以页面名称作为文件名称) |
|    layout     |   布局的统一入口(建议以页面名称作为文件名称)   |
|  components   |                     组件库                     |
|     page      |                    页面组件                    |
|     store     |               mobx 状态管理仓库                |
|  lib/config   |            与打包环境相关的配置文件            |
| lib/constants |                项目中的一些常量                |
|   lib/fetch   |      项目中的网络请求模块(主要基于 axios)      |
|   lib/util    |           项目中的一些公共工具类函数           |

## 其他描述

1. 为啥工程中自带的 Node.js 转发服务?

   > 为了彻底做前后端分离，且便于 docker 版本发布管理。这里通过 Node.js 搭建了转发层。好处是前端可以任意做转发不用考虑跨域，后端也不用考虑跨域问题。并且由于这个转发服务，前端也解耦了服务端的 OA 鉴权逻辑。该服务对于开发基本是无感的，一般要用到的只有转发的接口配置。

2. 关于 store 中的异步请求?
   > - observable 定义一个存储 state 的可追踪字段
   > - action 将一个方法标记为可以修改 state 的 action。
   > - computed 标记一个可以由 state 派生出新的值并且缓存其输出的 getter。

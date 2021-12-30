import Lazy from "@components/lazy-load";

const routerMap = [
  {
    title: "首页",
    path: "/",
    component: Lazy(() => import("@page/home")),
  },
  {
    // 注意！ 404页面必须放在末尾
    title: "404",
    path: "*",
    component: Lazy(() => import("@page/error")),
  },
];

export default routerMap;

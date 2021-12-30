module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.page.index);
  router.get("/authorization", controller.page.authorization);
  router.get("/api/*", controller.api.index);
  router.post("/api/*", controller.api.index);
  router.put("/api/*", controller.api.index);
  router.delete("/api/*", controller.api.index);
};

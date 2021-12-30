module.exports = (options) => {
  return async function huyaoa(ctx, next) {
    await next();
  };
};

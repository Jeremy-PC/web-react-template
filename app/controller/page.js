const Controller = require("egg").Controller;

class IndexController extends Controller {
  async index() {
    await this.ctx.render("index.html");
  }
  async authorization() {
    await this.ctx.render("authorization.html");
  }
}

module.exports = IndexController;

const Controller = require("egg").Controller;

class ApiController extends Controller {
  async index() {
    this.ctx.body = "this is api!";
  }
}

module.exports = ApiController;

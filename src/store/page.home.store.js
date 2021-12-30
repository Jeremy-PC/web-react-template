import { makeObservable, observable, action } from "mobx";

export default class {
  constructor(rootStore) {
    makeObservable(this, {
      count: observable,
      clearData: action,
      add: action,
      del: action,
    });
    this.rootStore = rootStore;
  }

  // --------------- observable -----------------
  count = 0;

  // ---------------- action --------------------
  clearData() {
    this.count = 0;
  }
  add() {
    this.count += 1;
  }
  del() {
    this.count -= 1;
  }
}

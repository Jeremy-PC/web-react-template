// react
import React from "react";
import { configure } from "mobx";
// store
import pageHomeStore from "./page.home.store";
// configure
configure({ enforceActions: "never" });

class rootStore {
  constructor() {
    this.pageHomeStore = new pageHomeStore(this);
  }
}

const storesContext = React.createContext({ rootStore: new rootStore() });

export default () => React.useContext(storesContext);

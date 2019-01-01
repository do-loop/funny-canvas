const element   = document.getElementById("canvas");

const state         = new State();
const transformer   = new Transformer();
const drawer        = new Drawer(element)
const canvas        = new Canvas(state, transformer, drawer);
const manager       = new Manager(canvas);
const watcher       = new Watcher(manager);
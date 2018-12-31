const element   = document.getElementById("canvas");

const drawer    = new Drawer(element)
const canvas    = new Canvas(drawer);
const manager   = new Manager(canvas);
const watcher   = new Watcher(manager);
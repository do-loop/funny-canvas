const element   = document.getElementById("canvas");

const state         = new State();
const transformer   = new Transformer();
const drawer        = new Drawer(element)
const canvas        = new Canvas(state, transformer, drawer);
const manager       = new Manager(canvas);
const watcher       = new Watcher(manager);

const Points = [

    new Point(100, 180),
    new Point(130, 180),   
    new Point(160, 180),
    new Point(190, 180),
    new Point(190, 150),
    new Point(190, 120),
    new Point(160, 120),
    new Point(130, 120),
    new Point(130, 90),
    new Point(130, 60),
    new Point(130, 30),
    new Point(130, 0),
    new Point(100, 0),
    new Point(70, 0),
    new Point(70, 30),
    new Point(70, 60),
    new Point(70, 90),
    new Point(70, 120),
    new Point(40, 120),
    new Point(10, 120),
    new Point(10, 150),
    new Point(10, 180),
    new Point(40, 180),
    new Point(70, 180),
    new Point(100, 180)
];

// drawer.drawBezierPoints(Points);
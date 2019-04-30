import * as R from "ramda";

const correctAnwserFull = [
  { i: "planOverview", x: 0, y: 0, w: 2, h: 1 },
  { i: "highestCostUsers", x: 2, y: 0, w: 1, h: 1 },
  { i: "recommendations", x: 3, y: 0, w: 1, h: 1 },
  { i: "companyStorage", x: 0, y: 1, w: 2, h: 1 },
  { i: "softwareAssets", x: 2, y: 1, w: 1, h: 1 },
  { i: "departmentSpend", x: 3, y: 1, w: 1, h: 1 },
  { i: "highestStorageUsers", x: 0, y: 2, w: 1, h: 1 },
  { i: "users", x: 1, y: 2, w: 3, h: 1 }
];

const correctAnwserNoAdption = [
  { i: "planOverview", x: 0, y: 0, w: 2, h: 1 },
  { i: "highestCostUsers", x: 2, y: 0, w: 1, h: 1 },
  { i: "recommendations", x: 3, y: 0, w: 1, h: 1 },
  { i: "companyStorage", x: 0, y: 1, w: 2, h: 1 },
  { i: "departmentSpend", x: 2, y: 1, w: 1, h: 1 },
  { i: "highestStorageUsers", x: 3, y: 1, w: 1, h: 1 },
  { i: "users", x: 0, y: 2, w: 3, h: 1 }
];

const items1 = [
  { name: "planOverview", w: 2, active: true },
  { name: "highestCostUsers", w: 1, active: true },
  { name: "recommendations", w: 1, active: true },
  { name: "companyStorage", w: 2, active: true },
  { name: "softwareAssets", w: 1, active: true },
  { name: "departmentSpend", w: 1, active: true },
  { name: "highestStorageUsers", w: 1, active: true },
  { name: "users", w: 3, active: true }
];
const items2 = [
  { name: "planOverview", w: 2, active: true },
  { name: "highestCostUsers", w: 1, active: true },
  { name: "recommendations", w: 1, active: true },
  { name: "companyStorage", w: 2, active: true },
  { name: "softwareAssets", w: 1, active: false },
  { name: "departmentSpend", w: 1, active: true },
  { name: "highestStorageUsers", w: 1, active: true },
  { name: "users", w: 3, active: true }
];
const gridSize = 4;

const getNextWidth = (index, items) => R.path([index + 1, "w"], items);

const createCoords = ({ x, y, w, index, items }) => {
  const nextX = x + w,
    nextW = getNextWidth(index, items),
    shouldNextRow = nextX + nextW <= gridSize;

  if (shouldNextRow) return { x: nextX, y };
  return { x: 0, y: y + 1 };
};

const generateLayout = items => {
  let output = [],
    x = 0,
    y = 0;
  const total = items.length;

  R.forEachObjIndexed(function(item, index) {
    if (item.active) {
      const { name, w } = item;
      const j = parseInt(index);

      output.push({ i: name, x, y, w, h: 1 });

      if (j < total - 1) {
        const coords = createCoords({ x, y, w, index: j, items });
        x = coords.x;
        y = coords.y;
      }
    }
  }, items);

  return output;
};

const layout1 = generateLayout(items1);
const layout2 = generateLayout(items2);

// console.log('layout Full: ', layout1);
// console.log('layout no adoption:  ', layout2);
console.log("Correct answer full? ", R.equals(layout1, correctAnwserFull));
console.log(
  "Correct answer no adoption? ",
  R.equals(layout2, correctAnwserNoAdption)
);

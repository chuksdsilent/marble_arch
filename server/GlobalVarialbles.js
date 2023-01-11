let start = new Date();
start.setHours(0, 0, 0, 0);

let end = new Date();
end.setHours(23, 59, 59, 999);

var now = new Date();
var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
export const pipeline = [
  {
    $match: {
      createdAt: { $gte: start, $lt: end },
    },
  },
  {
    $group: { _id: null, price: { $sum: "$price" } },
  },
];
export const stockPipeline = [
  {
    $match: {
      createdAt: { $gte: start, $lt: end },
    },
  },
  {
    $group: { _id: null, total: { $sum: "$total" } },
  },
];
export const allPipeline = [
  {
    $group: { _id: null, total: { $sum: "$total" } },
  },
];

export const todayPipeline = {
  created_on: { $gte: startOfToday },
};

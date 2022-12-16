import React from "react";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Room Number",
    dataIndex: "roomNumber",
    key: "roomNumber",
  },
  {
    title: "Room Type",
    dataIndex: "roomType",
    key: "roomType",
  },
  {
    title: "Room Price",
    dataIndex: "price",
    key: "price",
    render: (_, { price }) => <>&#8358;{formatCurrency(price)}</>,
  },
];

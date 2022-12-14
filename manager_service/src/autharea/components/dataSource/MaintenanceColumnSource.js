import React from "react";
import Moment from "react-moment";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Name",
    dataIndex: "stockId",
    key: "stockId",
    render: (_, { stockId }) => <>{stockId.name}</>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },

  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { createdAt }) => (
      <>
        <Moment format="D MMM, YY">{createdAt}</Moment>
      </>
    ),
  },
];

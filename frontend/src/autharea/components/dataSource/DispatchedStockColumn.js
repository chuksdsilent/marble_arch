import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Stock Name",
    dataIndex: "stockId",
    key: "stockId",
    render: (_, { stockId }) => <>{stockId.name}</>,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_, { price }) => <>&#8358;{formatCurrency(price)}</>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (_, { total }) => <>&#8358;{formatCurrency(total)}</>,
  },
  // {
  //   title: "Received",
  //   dataIndex: "received",
  //   key: "received",
  //   render: (_, { received }) => (
  //     <>{received === "true" ? <i className="bi-check-lg"></i> : ""}</>
  //   ),
  // },

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
  {
    title: "Action",
    render: record => (
      <>
        <Link to={`/manager/stock-dispatched/update/${record._id}`}>
          Update
        </Link>
      </>
    ),
  },
];

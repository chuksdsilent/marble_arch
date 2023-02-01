import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "come",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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
        <Link to={`/manager/stock-inventory/${record._id}`}>Update</Link>
      </>
    ),
  },
];

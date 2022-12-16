import React from "react";
import Moment from "react-moment";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Name",
    dataIndex: "menuId",
    key: "menuId",
    render: (_, { menuId }) => <>{menuId.name}</>,
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

export const menuColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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

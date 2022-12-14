import React from "react";
import Moment from "react-moment";
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
    title: "Staff",
    dataIndex: "staffId",
    key: "staffId",
    render: (_, { staffId }) => (
      <>
        {staffId.surname} {staffId.firstName}
      </>
    ),
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

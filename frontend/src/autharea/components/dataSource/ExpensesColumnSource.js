import React from "react";
import Moment from "react-moment";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, { amount }) => <>&#8358;{formatCurrency(amount)}</>,
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
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

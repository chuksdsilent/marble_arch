import { Space } from "antd";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
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
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <Link to={`/restaurant/menu/edit/${record._id}`}>Update</Link>
  //     </Space>
  //   ),
  // },
];

import { Button } from "antd";
import React from "react";
import Moment from "react-moment";
import { formatCurrency } from "../../../utils/FormatCurrency";

export const columns = [
  {
    title: "Surname",
    dataIndex: "staffId",
    key: "staffId",
    render: (_, { staffId }) => <>{staffId.surname}</>,
  },

  {
    title: "First Name",
    dataIndex: "staffId",
    key: "staffId",
    render: (_, { staffId }) => <>{staffId.firstName}</>,
  },
  {
    title: "Room Type",
    dataIndex: "roomType",
    key: "roomType",
    render: text => <a>{text}</a>,
  },
  {
    title: "Room Number",
    dataIndex: "roomNumber",
    key: "roomNumber",
  },
  {
    title: "Arrival Date",
    dataIndex: "arrivalDate",
    key: "arrivalDate",
    render: (_, { arrivalDate }) => (
      <>
        <Moment format="D MMM, YY">{arrivalDate}</Moment>
      </>
    ),
  },
  {
    title: "Departure Date",
    dataIndex: "departureDate",
    key: "departureDate",
    render: (_, { departureDate }) => (
      <>
        <Moment format="D MMM, YY">{departureDate}</Moment>
      </>
    ),
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (_, { price }) => <>&#8358; {formatCurrency(price)}</>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (_, { total }) => <>&#8358; {formatCurrency(total)}</>,
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

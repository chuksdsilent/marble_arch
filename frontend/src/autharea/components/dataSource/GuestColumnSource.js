import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const columns = [
  {
    title: "Surname",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Company/Organization",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "occupation",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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
    dataIndex: "_id",
    render: _id => <Link to={`/manager/guest/${_id}`}>View</Link>,
  },
];

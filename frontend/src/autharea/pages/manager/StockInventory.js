import React, { useState, useEffect } from "react";
import { StockServices } from "../../../services/StockServices";
import {
  Row,
  Col,
  Table,
  Button,
  Divider,
  Skeleton,
  Form,
  DatePicker,
} from "antd";
import { TotalCardStyles } from "../../styles/TotalCardStyles";
import { formatCurrency } from "../../../utils/FormatCurrency";
import Moment from "react-moment";
import { columns } from "../../components/dataSource/StockColums";
import moment from "moment";
import { useLocation } from "react-router";

const StockInventory = () => {
  let total = 0;
  const { query, search } = useLocation();
  const params = new URLSearchParams(search).get("backUrl");
  const [dataSource, setDataSource] = useState([]);

  useEffect(async () => {
    try {
      const response =
        params === "today"
          ? await StockServices.todayStock()
          : await StockServices.inventory();
      setDataSource(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const onFinish = async values => {
    const data = {
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.endDate).format("YYYY-MM-DD"),
    };
    try {
      const response = await StockServices.searchStock(data);
      setDataSource(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log(
      "start date is ",
      moment(values.startDate).format("YYYY-MM-DD")
    );
  };
  return (
    <>
      <h3>All Stocks</h3>
      <Divider />
      <Row justify="start">
        <Col xl={20} xs={24}>
          <Form name="basic" onFinish={onFinish}>
            <Row gutter={[16, 16]}>
              <Col xs={8} xl={6}>
                {/* <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[
                    { required: true, message: "Start Date is required" },
                  ]}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item> */}
              </Col>
              <Col xss={8} xl={6}>
                {/* <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: "End Date is required" }]}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item> */}
              </Col>
              <Col xs={24} xl={7}>
                {/* <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item> */}
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xl={4} xs={24}>
          <TotalCardStyles>
            <div>Total:</div>
            <div className="total-badge">
              &#8358;
              {dataSource &&
                dataSource.map(data => {
                  total += data.total;
                })}
              {formatCurrency(total)}
            </div>
          </TotalCardStyles>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          {dataSource ? (
            <Table
              className="table-striped-rows"
              columns={columns}
              dataSource={dataSource}
            />
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>
    </>
  );
};

export default StockInventory;

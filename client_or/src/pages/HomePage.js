import React, { useState, useEffect } from "react";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    { 
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function getAllTransaction() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transaction/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransactions(res.data);
        //  setShowModal(true)
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        message.error("Error Occoured in Fetching");
      }
    }
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transaction/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted ");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to Delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transaction/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated");
      } else {
        await axios.post("/api/v1/transaction/add-transaction", {
          ...values,
          userid: user._id,
        });

        setLoading(false);
        message.success("Transaction added");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="all m-5 p-3">
        <div className="filters bg-dark text-light ">
          <div>
            <h6>Select Filters</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Past Week</Select.Option>
              <Select.Option value="30">Past Month</Select.Option>
              <Select.Option value="365">Past Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div>
            <h6>Select Category</h6>
            <Select value={type} onChange={(values) => setType(values)}>
              <Select.Option value="all">All Categories</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div>
            <h6>Table/Chart</h6>
            <UnorderedListOutlined
              className="mx-2"
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className="mx-2"
              onClick={() => setViewData("analytics")}
            />
          </div>
          <div>
            <button className="btn" onClick={() => setShowModal(true)}>
              Add New
            </button>
          </div>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransaction} />
          ) : (
            <Analytics allTransaction={allTransaction} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">salary</Select.Option>
                <Select.Option value="tip">tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default HomePage;

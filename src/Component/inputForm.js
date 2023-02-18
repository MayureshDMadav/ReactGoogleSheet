import React, { useState } from "react";
import "../Component/syte/style.css";
import axios from "axios";
import moment from "moment/moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputForm = () => {
  const [state, setstate] = useState({
    Merchant_Name: "",
    Merchant_Domain: "",
    Last_Date: moment().format("DD MMMM YYYY"),
  });
  const [getR, setR] = useState();

  const changeHanlder = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setstate((pre) => {
      return { ...pre, [name]: value };
    });
  };
  const url = `https://regressionbackend.onrender.com?Merchant_Name=${state.Merchant_Name}&Merchant_Domain=${state.Merchant_Domain}&Last_Date=${state.Last_Date}`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
  };

  const handlesubmit = async () => {
    await axios(config)
      .then((response) => {
        setR(response.data);
        toast("Saved Succesfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Error Please Try again !!!");
      });
  };

  return (
    <div>
      <h3>Add New Entry </h3>

      <div className="inputext">
        Merchant Name:
        <input
          type="text"
          name="Merchant_Name"
          placeholder="Merchant Name"
          onChange={changeHanlder}
        />
        Merchant Domain:
        <input
          type="text"
          name="Merchant_Domain"
          placeholder="Merchant Domain"
          onChange={changeHanlder}
        />
        Date:
        <input
          type="text"
          name="Date"
          disabled
          placeholder="Date"
          onChange={changeHanlder}
          value={state.Last_Date}
        />
        <button onClick={handlesubmit}>Add Data</button>
      </div>
      <h4>
        <ToastContainer position="bottom-right" />
      </h4>
    </div>
  );
};

export default InputForm;

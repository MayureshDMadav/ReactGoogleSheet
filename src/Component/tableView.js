import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../Component/syte/style.css";
import dateTime from "./dataSorting";

const TaleView = () => {
  const [post, setPost] = useState();

  const handleFilter = (e) => {
    const newData = post.filter((row) => {
      return row.Merchant_Name.toLowerCase().includes(
        e.target.value.toLowerCase()
      );
    });
    if (e.target.value !== 0 || e.target.value > 0) {
      setPost(newData);
    } else if (e.target.value === 0 || e.target.value <= 0) {
      setImmediate(() => {
        setPost(post);
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await axios
        .get(
          "https://script.google.com/macros/s/AKfycbwMxjUmgH6nMvMFKiP8PjnDHuilgHP-ua1Q2lq0OL-DlEbxsr8c5D6XPG8qfLBneelF/exec"
        )
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      name: "Merchant Name",
      selector: (post) => post.Merchant_Name,
      sortable: true,
    },
    {
      name: "Merchant Domain",
      selector: (post) => post.Merchant_Domain,
    },
    {
      name: "Date",
      selector: (post) => dateTime(post.Last_Date),
    },
  ];

  return (
    <div>
      <span className="Header">
        <h2> REGRESSION STATUS </h2>
      </span>
      <div className="container">
        <span className="search-text">
          <label>Search: </label>
          <input type="text" onChange={handleFilter} />
        </span>
        <DataTable
          columns={columns}
          data={post}
          fixedHeader
          pagination
        ></DataTable>
      </div>
    </div>
  );
};

export default TaleView;

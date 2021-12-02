import React, { Component, useEffect } from "react";
import "./Account.css";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_SPECIAL_TESTS } from "./Graphql/Mutation";
function TestResults() {
  const header = useSelector((state) => state.header);
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [getSpecialTests, { data,error }] = useMutation(GET_SPECIAL_TESTS);

  useEffect(()=>{
    getSpecialTests({variables:{id:userInfo?.id}})
  },[])

  console.log(data)

  return (
    <div align="center">
      <h3> {header}'s Test Results</h3>
      <table className="results">
        <tr>
          <td className="blue">General Test Score</td>
          <td className="orange">{userInfo?.general_test_score}</td>
        </tr>
        <br></br>
        <tr>
          <td className="blue">Specialized Test</td>
          {data?.getSpecialTests?.map(item=>{
            return <td className="orange">
            {item?.test_name} / {item?.score}
          </td>
          })}
          
        </tr>
      </table>
      <div className="result-btn">
        <Link to="/mainprofile" className="reg-btn" value="Save">
          Back
        </Link>
        <Link to="/share" className="reg-btn" value="Cancel">
          Share Results
        </Link>
      </div>
      <p className="bottom_p">
        <b>Make the right decision.</b>
      </p>
    </div>
  );
}

export default TestResults;

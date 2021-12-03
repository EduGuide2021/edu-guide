import React, { Component, useState } from "react";
import { genCoursesDescription } from "./GentestData";
import "./General.css";

import { Link,useHistory } from "react-router-dom";
const GenCourses = (props) => {
  const history = useHistory()
  const [topCourse, setTopCourse] = useState(
    props?.history?.location?.state?.map((item) => {
      return {
        courseName: item,
        courseDescription: genCoursesDescription[item],
      };
    })
  );
  console.log(topCourse);
  return (
    <div align="center">
      <h3>Career Decision Support General Test</h3>
      <br></br>
      <table className="course-table">
        <tr align="center">
          {topCourse?.map((item) => {
            return (
              <td>
                <p className="courses-title">{item?.courseName}</p>
              </td>
            );
          })}
        </tr>
        <tr align="center">
          {topCourse?.map((item) => {
            return (
              <td>
                <td>
                  <p>{item?.courseDescription}</p>
                </td>
              </td>
            );
          })}
        </tr>
        <br></br>
        <tr align="center">
          {topCourse?.map((item) => {
            return (
              <td>
                <button onClick={()=>history.push('/specdesc',{selected:item?.courseName,topCourse:props?.history?.location?.state})} className="courses-btn" value="TakeCS">
                  Take {item?.courseName} test
                </button>
              </td>
            );
          })}
        </tr>
      </table>

      <p className="bottom_p">
        <b>Make the right decision.</b>
      </p>
    </div>
  );
};

export default GenCourses;

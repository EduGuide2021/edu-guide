import React, { Component } from "react";
import "./Account.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import { assertNamedType } from "graphql";

function MainProfile() {
  const header = useSelector((state) => state.header);
  const icon = useSelector((state) => state.icon);
  const userInfo = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <h3>My Profile</h3>
      <table className="profile-table">
        <tr>
          <td>{icon}</td>
          <td>
            <form className="edit-form">
              <label>
                <b>Name:</b>
                <text type="text" className="edit-field" name="aname">{userInfo?.name}</text>
              </label>
              <br></br>
              <label>
                <b>Username:</b>
                <text type="text" className="edit-field" name="uname">
                  {header}
                </text>
              </label>
              <br></br>
              <label>
                <b>Level/Strand:</b>
                <text type="text" className="edit-field" name="aname">{userInfo?.levelStrand}</text>
              </label>
              <br></br>
              <label>
                <b>School:</b>
                <text type="text" className="edit-field" name="aname">{userInfo?.school}</text>
              </label>
            </form>
          </td>
        </tr>
      </table>
      <div className="profile-btn">
        <Link to="/editprofile" className="reg-btn" value="Edit">
          Edit
        </Link>
        <Link to="/changepass" className="reg-btn" value="Change Password">
          Change Password
        </Link>
        <Link to="/testresults" className="reg-btn" value="Show Test Results">
          Show Test Results
        </Link>
      </div>
      <p className="bottom_p">
        <b>Make the right decision.</b>
      </p>
    </div>
  );
}

export default MainProfile;

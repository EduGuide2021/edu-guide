import React, { useState } from "react";
import "./Account.css";
import { Link } from "react-router-dom";
import { EDIT_PROFILE } from "../account/Graphql/Mutation";
import { useMutation } from "@apollo/client";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setAccountDetails } from "../store/actions/header";

function EditProfile() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [username, setUsername] = useState(userInfo?.username);
  const [levelStrand, setLevelStrand] = useState(userInfo?.levelStrand);
  const [school, setSchool] = useState(userInfo?.school);
  const dispatch = useDispatch()

  const [editProfile] = useMutation(EDIT_PROFILE);

  function ShowingSomeErrors() {
    const { loading, error, data } = useMutation(EDIT_PROFILE, {
      errorPolicy: "all",
    });

    if (loading) return <span>loading...</span>;
    return (
      <div>
        <h2>Good: {data.goodField}</h2>
        <pre>
          Bad:{" "}
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
    );
  }

  return (
    <div>
      <h3>Edit Profile</h3>
      <table className="edit-table">
        <tr>
          <td>
            <div className="edit-iconbg">
              <img src="./icons/bg icon.png"></img>
              <div className="edit-icon">
                <img src="./icons/icon 1.png"></img>
              </div>
            </div>
          </td>
          <td>
            <form className="edit-form">
              <label>
                <b>Username:</b>
                <input
                  type="text"
                  className="edit-field"
                  name="uname"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </label>
              <br></br>
              <label>
                <b>Level/Strand:</b>
                <input
                  type="text"
                  className="edit-field"
                  name="lvlstrand"
                  value={levelStrand}
                  onChange={(event) => {
                    setLevelStrand(event.target.value);
                  }}
                />
              </label>
              <br></br>
              <label>
                <b>School:</b>
                <input
                  type="text"
                  className="edit-field"
                  name="school"
                  value={school}
                  onChange={(event) => {
                    setSchool(event.target.value);
                  }}
                />
              </label>
            </form>
          </td>
        </tr>
      </table>
      <div className="profile-btn">
        <Link to="/changeicon" className="reg-btn" value="Edit">
          Change Icon
        </Link>
        <Link
          to="/save"
          className="reg-btn"
          value="Edit Profile"
          onClick={() => {
            if(username && levelStrand){
              editProfile({
                variables: {
                  id: userInfo?.id,
                  username: username,
                  levelStrand: levelStrand,
                  school: school,
                },
              }).then(()=>{
                let updatedUser={...userInfo,username:username,levelStrand:levelStrand,school:school}
                localStorage.setItem('user',JSON.stringify(updatedUser))
                dispatch(
                  setAccountDetails(username)
                );
              })
            }else{
              message.error('Please fill details')
            }
            
          }}
        >
          Save Changes
        </Link>
        <Link to="/mainprofile" className="reg-btn" value="Cancel">
          Cancel
        </Link>
      </div>
      <p className="bottom_p">
        <b>Make the right decision.</b>
      </p>
    </div>
  );
}

export default EditProfile;

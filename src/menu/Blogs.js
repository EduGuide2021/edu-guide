import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from 'emailjs-com'
import React, { useRef, useState } from "react";
import { CREATE_BLOG, DELETE_BLOG } from "../account/Graphql/Mutation";
import { GET_ALL_BLOGS } from "../account/Graphql/Queries";
import { useMutation, useQuery } from "@apollo/client";
import icon from '../components/pics/icon7.png'

function Blogs() {
  const header = useSelector((state) => state.header);
  const { data } = useQuery(GET_ALL_BLOGS);
  const [blogValue,setBlogValue] = useState('')
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [createBlog, { error }] = useMutation(CREATE_BLOG,{refetchQueries:[GET_ALL_BLOGS]});
  const [deleteBlog, { deleteError=error }] = useMutation(DELETE_BLOG,{refetchQueries:[GET_ALL_BLOGS]});
  const form = useRef();
 let sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('gmail', 'template_975judb', form.current, 'user_k2uyNdRwq3XhF0ItCc5pZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  const onSubmitBlog = () => {
    createBlog({variables:{content:blogValue,creator:userInfo?.id}})
    setBlogValue('')
  }

  return (
    <div align="center">
      <h1>Tell us your career decision journeys/advice!</h1>
      <form align="center" ref={form} onSubmit={sendEmail}>
      <input type="text" className="blog-field" value={blogValue} onChange={(e)=>setBlogValue(e.target.value)} name="message" />
      <br></br>
      <br></br>

      {header ? (
        <input className="sub-btn" type="submit" value="Submit" onClick={onSubmitBlog} />
      ) : (
        <Link to="/login">
          <input className="sub-btn" type="submit" value="Submit" />
        </Link>
      )}
      </form>
      <div>
        {data?.getAllBlog?.filter(item=>item?.is_approved || userInfo?.is_admin)?.map(item=>{
          return (
            <div>
            <div className="commdiv">
              <div className="commicon">
                <img src={icon}></img>
              </div>
              <textarea className="comm_entry" value={item?.content} disabled name="post" />
              {userInfo?.is_admin && <button type="submit" className="deletebtn" onClick={()=>{
              deleteBlog({variables:{id:item?.id}})
            }}>
              Delete
            </button>}
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
            <p>Cretated by : {item?.creator}</p>
            <p>Cretated At : {`${new Date(Number(item?.createdAt)).getDate()}/${new Date(Number(item?.createdAt)).getMonth()+1}/${new Date(Number(item?.createdAt)).getFullYear()}`}</p>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default Blogs;

import React,{useState,useEffect} from "react";
import {Link,useLocation,useNavigate} from "react-router-dom"
import axios from "axios";
import Menu from "../components/Menu";
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import moment from "moment";

const Single =()=>{
    const [post,setPost]=useState({})

    const location=useLocation()
    const navigate=useNavigate()

    const postId=location.pathname.split("/")[2]
    
    useEffect(()=>{
      const fetchData=async ()=>{
        try{
          const res = await axios({
            method:"get",
            baseURL:"http://localhost:8800/api/",
            url:`/posts/${postId}`
          })
          setPost(res.data)
        }catch(err){
          console.log(err)
        }
      }
      fetchData();
    },[postId]);

    const handleDelete=async()=>{
        try{
              await axios({
              method:"delete",
              baseURL:"http://localhost:8800/api/",
              url:`/posts/${postId}`
            })
            navigate("/")
          }catch(err){
            console.log(err)
          }
    }
    const handleEdit=async()=>{
      try{
        await axios.put(
          `http://localhost:8800/api/posts/${postId}`,
          post
      );
          navigate("/")
        }catch(err){
          console.log(err)
        }
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
    return(
        <div className="single">
            <div className="content">
                <img src={`./upload/${post?.img}`}/>
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt=""/>}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=${postId}`} state={post}>
                        <img onClick={handleEdit} src={Edit} alt="edit"/>
                        </Link>
                        <img onClick={handleDelete} src={Delete} alt="delete"/>
                    </div>
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
            </div>
            <Menu cat={post.cat}/>
        </div>
    )
}
export default Single
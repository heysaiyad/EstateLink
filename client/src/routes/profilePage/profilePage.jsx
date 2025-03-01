import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  // console.log(data);
  // console.log("test");

  const {currentUser, updateUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async()=>{
      try{
        await apiRequest.post("/auth/logout");
        // localStorage.removeItem('user');
        updateUser(null);
        navigate("/")

      }catch(err){
        console.log(err);
      }
  }
  return !currentUser ?(
    <Navigate to={"/login"}/>
  ):(
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>

            <Link to={"/profile/update"}>
            <button>Update Profile</button>
            </Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={"/add"}>
            <button>Create New Post</button>
            </Link>
          </div>
          <List  posts={data?.userPosts}/>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={data?.savedPosts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chats={data?.chatResponse}/>
        </div>
      </div>
    </div>
    )
}

export default ProfilePage;

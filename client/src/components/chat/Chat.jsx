import { useState, useContext } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import {format} from "timeago.js";

function Chat({chats}) {
  const [chat, setChat] = useState(null);
  const {currentUser} = useContext(AuthContext);
 

  const handleOpenChat = async (id, receiver) => {
    try {
      const res= await apiRequest("/chats/"+id);
      setChat({...res.data, receiver});
      console.log(res.data);
      console.log(receiver);
      console.log(chat.messages);
      console.log(chat.receiver.username);
      console.log("loda");
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
  
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/"+ chat.id, {text});
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  }
   
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div className="message" key={c.id}
          style={{ backgroundColor: c.seenBy.includes(currentUser.id) ? 'white' : '##fecd514e' }}
          onClick={()=>handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver?.avatar || "noavatar.jpg"} alt="" />
            <span>{c.receiver?.username || 'N/A'}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "noavatar.jpg"}
                alt=""
              />
              {chat.receiver?.username || 'N/A'}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
        
         <div className="center">
  {chat.messages.map((message) => (
    <div
      className="chatMessage"
      style={{
        alignSelf: message.userId === currentUser.id ? 'flex-end' : 'flex-start',
        textAlign: message.userId === currentUser.id ? 'right' : 'left',
        backgroundColor: message.userId === currentUser.id ? '#dcf8c6' : '#f1f0f0',
        color: '#333',
        padding: '10px 15px',
        borderRadius: '15px',
        margin: '10px 0',
        maxWidth: '60%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
      key={message.id}
    >
      <p style={{ margin: 0 }}>{message.text}</p>
      <span style={{ fontSize: '0.8em', color: '#888' }}>{format(message.createdAt)}</span>
    </div>
  ))}
</div>
         
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;

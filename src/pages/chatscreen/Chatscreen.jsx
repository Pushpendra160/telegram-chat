import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from "../../assets/user.jpg"
import './chatscreen.css'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';

const Chatscreen = ({username, userid}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${userid}`)
      .then(res => {
        setMessages(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='chat-screen-content'>
      <div className='chat-screen-header'>
        <div className='chat-screen-header-profile-and-name'>
          <img src={User} alt="user"  />
          <div className='chat-screen-header-name'>
            <h3>{username}</h3>
            <p>Last seen recently</p>
          </div>
        </div>
        <div className='chat-screen-header-icon'>

          <SearchOutlinedIcon className='chat-screen-header-icon-outline'/>
           <CallOutlinedIcon className='chat-screen-header-icon-outline'/>
           <MoreVertOutlinedIcon className='chat-screen-header-icon-outline'/>
        </div>
      </div>
      <div className='chat-screen-msg-content'>
      {messages.map(message => (
          <div key={message.id} className={`message ${message.sender.id === 1 ? 'sent' : 'received'}`} style={{ backgroundColor: message.sender.id === 1 ? ' rgb(33,33,33)' : ' rgb(33,33,33)' }}>
            <p>{message.message}</p>
            <span>{new Date(message.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className='chat-screen-write-msg'>
          <AttachmentOutlinedIcon className='chat-screen-header-icon-outline'/>
        <input type="text" placeholder='Write a message...' />
        <SentimentSatisfiedAltOutlinedIcon className='chat-screen-header-icon-outline'/>
        <MicNoneOutlinedIcon className='chat-screen-header-icon-outline'/>

      </div>
    </div>
  )
}

export default Chatscreen

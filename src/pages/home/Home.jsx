import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './home.css'
import Hamburger from '../../assets/hamburger.svg'
import User from '../../assets/user.jpg'
import Chatscreen from '../chatscreen/Chatscreen'

import AnchorTemporaryDrawer from '../../components/Drawer'

const Home = () => {
  const chatInfoElements = [];
  const [showmsg, setShowmsg] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [menuclick, setMenuclick] = useState(false);
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://devapi.beyondchats.com/api/get_all_chats?page=1")
      .then(res => {
        setChatData(res.data.data.data);
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

// useEffect(()=>{
//   axios.get("https://devapi.beyondchats.com/api/get_all_chats?page=1").then(res=>{
//     console.log(res.data.data.data);
//   })
// }, [])
    
  for (let i = 0; i < 6  ; i++) {
    chatInfoElements.push(
      <div className='chat-info' key={i} onClick={()=>{setShowmsg(true)}}>
        <img src={User} alt="user" className='user-image' />
        <div className='chat-name'>
          <h3>Name</h3>
          <p>abd :<span>dfgd</span></p>
        </div>
        <p className='chat-info-date'>24:34:12</p>
      </div>
    );
  }
  return (
    <div className='home-screen' >
      <div className= {showmsg===true?'show-msg-screen': 'chat-data'} >
        {menuclick===true && 
    <div className='chat-sidebar-content'
    //  onClick={()=>{setMenuclick(false)}}
      >  
{/* <Sidebar className='chat-sidebar'  >
  
  <Menu >
  
    <SubMenu label="Charts">
  
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar> */}
</div>
        }
        <div className='chat-data-content'>
        <div className='chat-data-header'>
        <AnchorTemporaryDrawer />

            <input type="text" className='chat-search-box' placeholder='search'/>
        </div>
        <div className='chat-data-list'>
            
         {/* {chatInfoElements} */}
         {chatData.slice(0,7).map(chat => (
              <div className='chat-info' key={chat.id} onClick={() => (setShowmsg(true), setUsername(chat.creator.name), setUserid(chat.id))}>
                <img src={User} alt="user" className='user-image' />
                <div className='chat-name'>
                  <h3>{chat.creator.name===null?'username':chat.creator.name}</h3>
                  <p>{chat.status} : <span>{chat.msg_count}</span></p>
                </div>
                <p className='chat-info-date'>{new Date(chat.updated_at).toLocaleTimeString()}</p>
              </div>
            ))}
                
        </div>
         
      </div>
      </div>
      <div className='chat-screen-data'>
         {showmsg===false && <p className='no-msg'>Select chat to start messeging</p>}
         {showmsg===true && <Chatscreen username={username} userid={userid} className="chat-screen-data-msg"  />}
         

      </div>
    </div>
  )
}

export default Home

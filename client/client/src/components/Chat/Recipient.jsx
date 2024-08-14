import React, { useState } from 'react'
import Recipient_Image from '../../assets/Chat/bot_image.png'
import searchSVG from '../../assets/Chat/search.svg'
import optionSVG from '../../assets/Chat/option.svg'
import alertSVG from '../../assets/Chat/greendot.svg'
import newMessageSVG from '../../assets/Chat/message_new.svg'

function Recipient({users,setUsers,selectedUser,setSelectedUser,socket}) {
 

  const handleSelectedUser=(userId)=>{
    setSelectedUser(userId);
    const userData=users;
    userData.forEach((user)=>{
      if(user.userId==userId)
        user.hasNewMessages=false;
    })
    setUsers(userData); 
  }

  const handleHasSeen = (userId) => {
    const usersData=users.map((user)=>{
      if(user.userId.toString()==userId.toString())
      {
        user.hasNewMessages=false;
      

      }
      
      return user;
    })

    setUsers(usersData)
};
  return (
    <div className='RecipientBody'>

      <div className='RB_Search'>
      <img id='RBsearch' src={searchSVG} height='22px' width='22px'></img>
      <div>
      <img id='RBmessage' src={newMessageSVG} height='22px' width='22px'></img>
      <img id='RBoption' src={optionSVG} height='18px' width='18px'></img>
      </div>
      </div>



      <div className='RB_RecipientList'>

      <div className='RB_Recipient selected'>
     <div className="RB_Recipient_inner"> <img src={Recipient_Image} alt='Recipient_Image' height='40' width='40'/>
      <div className='RB_Recipient_Body'>
        <p id='' className='Recipient_Name'>Dummy</p>
        <p className='LastMsg'>last message...</p>
    </div></div>
    <img src={alertSVG} alt='Alert_Image' height='30' width='30' hidden/>

    </div>
    
   
     
      <div className='RB_Recipient'>
     <div className="RB_Recipient_inner"> <img src={Recipient_Image} alt='Recipient_Image' height='40' width='40'/>
      <div className='RB_Recipient_Body'>
        <p id='' className='Recipient_Name'>Dont Click Here</p>
        <p className='LastMsg'>last message...</p>
    </div></div>
    <img src={alertSVG} alt='Alert_Image' height='30' width='30' hidden/>

    </div>

    {users && users.map((user)=>{
      const isSelected = user.userId === selectedUser;
      return <div className={`RB_Recipient ${isSelected ? 'selected' : ''}`} onClick={()=>handleSelectedUser(user.userId)}>
      <div className="RB_Recipient_inner"> <img src={Recipient_Image} alt='Recipient_Image' height='40' width='40'/>
       <div className='RB_Recipient_Body'>
         <p id={user.userId} className='Recipient_Name' style={{fontSize:'larger',}}>{user.username}</p>

         {user.isConnected?<p className='UserStatus' style={{color:'#1fc15d'}}>Online</p>:<p className='UserStatus'
         style={user.hasNewMessages?{fontWeight:600}:{}}
         >{user.lastMessage}</p>}
     </div></div>
     {user.hasNewMessages?<img src={alertSVG} alt='Alert_Image'  height='30' width='30' onClick={()=>handleHasSeen(user.userId)}/>:<img src={alertSVG} alt='Alert_Image'  height='30' width='30' hidden/> }
     
 
     </div>
    })}
</div></div>
  )
}

export default Recipient
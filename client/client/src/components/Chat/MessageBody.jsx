import React, { useEffect, useRef, useState } from 'react'
import Recipient_Image from '../../assets/Chat/bot_image.png'
import AttachmentImage from '../../assets/Chat/attachment.svg'
import StickerImage from '../../assets/Chat/emoji.svg'
import SendImage from '../../assets/Chat/message.svg'
function MessageBody({users,setUsers,selectedUser,setSelectedUser,socket}) {
    const [userInput,setUserInput]=useState('');
    const [messages,setMessages]=useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleUserInput=(e)=>{
        setUserInput(e.target.value);
    
    }

    const handleUserInputSubmit=()=>{
        console.log(`USer Message:`,userInput)
        const Usermessage={content:userInput,to:selectedUser}
        socket.emit('private message',Usermessage)

        const usersData=users.map((user)=>{
            if(user.userId==selectedUser)
            {
                user.messages.push({
                    content:userInput,
                    fromSelf:true,
                })
                return user;
            }
            else
            return user;

        });
        

        setUsers(usersData)
        setUserInput('');

    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleUserInputSubmit();
          // Perform your action here, e.g., submit form, call a function, etc.
          // For example, if you want to submit a form:
          // handleSubmit();
        }
      };

    useEffect(()=>{
        if(users && selectedUser){
        let messagesArray=users.filter((user)=>user.userId==selectedUser)[0].messages
        setMessages(messagesArray)
        }
    },[selectedUser,users])



  return (<>
    {selectedUser?<div className='Message_Body'>
        <div className='MB_Header'>
        <img src={Recipient_Image} alt='Recipient_Image' height='40' width='40'/>
        <p>{(users && users.filter((user)=>user.userId==selectedUser)[0].username )|| 'Error404'} </p>
        
        </div>
        <div className='MB_TextHist'>
        {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.fromSelf ? 'fromSelf' : 'fromOther'}`}
        >
          {message.content}
        </div>
      ))}
        </div>
        <div className='MB_Footer'>
       
        
        <img src={AttachmentImage} alt='Attach_Image' height='27' width='27'/><img src={StickerImage} alt='Sticker_Image' height='32' width='32'/>
        <input id='MessageInput' type='text' name='UserMessage' placeholder='Send a Hi!' value={userInput} onChange={handleUserInput} onKeyDown={handleKeyPress}></input>
        
        <img src={SendImage} alt='Send_Image' height='27' width='27' onClick={handleUserInputSubmit}/>

        </div>
    </div>:<div></div>}</>
  )
}

export default MessageBodya
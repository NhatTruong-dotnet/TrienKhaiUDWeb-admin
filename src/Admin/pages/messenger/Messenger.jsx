import './messenger.css'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import io from 'socket.io-client'
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [fetchMessagesByEmail, setEmail] = useState('');
  const [messageSendSucess, setMessageSendSucess] = useState(false);
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let userToFetchConversation = '';
  let messageSend = useRef();
  const [socket, setSocket] = useState(io(`https://serverbookstore.herokuapp.com`));
  const [newMessgeCome, setNewMessageCome] = useState(false);

  const [enabledSendIcon, setEnabledSendIcon] = useState(false);
  try { 
    socket.emit("admin-connect");
    userToFetchConversation = currentUser.userToFetchConversation;
  } catch (error) {
    socket.emit("admin-connect");
    let guestInfo = {
      "userToFetchConversation": "",
      "gmail": ""
    }
    localStorage.setItem('user', JSON.stringify(guestInfo))
    currentUser = JSON.parse(localStorage.getItem('user'))
    
  }
  useEffect(() => {
    currentUser = JSON.parse(localStorage.getItem('user'))
    socket.on("forwardToAdmin", args =>{
     setNewMessageCome(!newMessgeCome)
    })
    //https://dmitripavlutin.com/react-useeffect-infinite-loop/
    const getConversations = async () => {
      try {
        
        const resData = await axios.get("https://serverbookstore.herokuapp.com/api/conversations/");
        setConversations(resData.data);
        currentUser = JSON.parse(localStorage.getItem('user'));
        userToFetchConversation = currentUser.userToFetchConversation;
        const res = await axios.get("https://serverbookstore.herokuapp.com/api/conversations/" + userToFetchConversation);
        setMessages(res.data[0].messages);
      } catch (error) {
          console.log(error);
      }
    }
    getConversations();},[currentUser.gmail,newMessgeCome]
  );

  useEffect(() => {
    //https://dmitripavlutin.com/react-useeffect-infinite-loop/
    const getConversations = async () => {
      try {
        const resData = await axios.get("https://serverbookstore.herokuapp.com/api/conversations/");
        setConversations(resData.data);
        currentUser = JSON.parse(localStorage.getItem('user'));
        userToFetchConversation = currentUser.userToFetchConversation;
        const res = await axios.get("https://serverbookstore.herokuapp.com/api/conversations/" + userToFetchConversation);
        setMessages(res.data[0].messages);
      } catch (error) {
          console.log(error);
      }
    }
    getConversations();}, [fetchMessagesByEmail,messageSendSucess,newMessgeCome]
  );



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })}, [messages]
  );

  function fetchMessageFromConversation(gmail) {
    let guestInfo = {
      "userToFetchConversation": gmail,
      "gmail": "admin@gmail.com"
    }
    localStorage.setItem('user', JSON.stringify(guestInfo))
    

    setEmail(gmail);
  }

  async function  sendMessage(){
    try {
        currentUser = JSON.parse(localStorage.getItem('user'))
        const message = {gmail: currentUser.gmail, messageText:messageSend.current.value}
        const res = await axios.post("https://serverbookstore.herokuapp.com/api/conversations/"+currentUser.userToFetchConversation,message).then(() => setMessageSendSucess(!messageSendSucess));
        document.getElementById('chatMessageInputAdmin').value = '';
        setEnabledSendIcon(false)
        socket.emit("adminChat", "adminChatChat")
    } catch (error) {
        console.log(error);
    }
}
  return (
    <>
      <div className='messengerAdmin'>
        <div className="chatMenuAdmin">
          <div className="chatMenuWrapperAdmin">
            <input type="text" placeholder='Search for friends' className='chatMenuInputAdmin' />
            {
              conversations.map((element) => {

                return <div onClick={() => fetchMessageFromConversation(element['gmail'])}>
                  <Conversation key={element['gmail']} conversation={element} />
                </div>
              })
            }

          </div>
        </div>
        <div className="chatBoxAdmin">
          <div className="chatBoxWrapperAdmin">
            <div className="chatBoxTopAdmin">
              {
                messages.map((element, i) => {
                  return <div ref={scrollRef}>
                    <Message key={element._id}
                        messageText={element.messageText}
                        //https://www.javascripttutorial.net/web-apis/javascript-localstorage/#:~:text=The%20localStorage%20can%20store%20only,the%20localStorage%20using%20the%20JSON.
                        own={element.gmail === currentUser.gmail ? true : false}
                        chatTime={element.chatTime}
                    />
                  </div>

                })
              }
            </div>
            <div className="chatBoxBottomAdmin">
              <textarea className='chatMessageInputAdmin' id='chatMessageInputAdmin'  ref={messageSend} placeholder='write something'
                onChange={() => {document.getElementById('chatMessageInputAdmin').value ==="" ? setEnabledSendIcon(false):setEnabledSendIcon(true) }}></textarea>
              {enabledSendIcon && <button className='chatSubmitButtonAdmin' id='chatMessageInputAdmin' onClick={sendMessage}>Send</button>}
            </div>
          </div>
        </div>
        
      </div>
    </>

  )
}

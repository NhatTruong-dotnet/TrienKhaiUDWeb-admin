import './message.css'
import { format } from  'timeago.js'
export default function Message(props) {
  return (
    <div className={props.own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" 
            src={props.own ? "https://img.favpng.com/21/14/20/computer-icons-login-user-system-administrator-image-png-favpng-iNFT01rNqwKESE8gShbhXTYCv.jpg" :"https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"} alt="img here" />
            <p className="messageText">{props.messageText}</p>
        </div>
        <div className="messageBottom">{format(props.chatTime)}</div>
    </div>
  )
}

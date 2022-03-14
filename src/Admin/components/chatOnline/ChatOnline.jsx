import './chatOnline.css'

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg" alt="img here" className="chatOnlineImg" />
                <div className="chatOnlineBadge"></div>
                <span className="chatOnlineName">Johnny Dang</span>
            </div>
        </div>    
    </div>
  )
}

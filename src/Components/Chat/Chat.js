import React,{useState, useEffect} from 'react'
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined,AttachFile,MoreVert, InsertEmoticon,Mic} from '@material-ui/icons'
import axios from '../../Axios/axios';
import db from '../../firebase';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../Store/StateProvider/StateProvider';
import firebase from 'firebase';


const Chat = ({messages}) => {
    const [input, setInput] = useState('');
    const [roomname, setroomname] = useState("");
    const {roomId} = useParams();
    const [firemessages,setFireMessages]=useState([]);

    const[{user},dispatch]=useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>setroomname(snapshot.data().name));
            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(
                setFireMessages(snapshot.docs.map(doc=>doc.data()))
            ))

        }
    },[roomId]);


    const sendmessage=async(e)=>{
        e.preventDefault();

        // for firebase firestore
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        //------------------------------
        // for mongo DB
    //     await axios.post("/message/new",{

    // message:input,
    // name:"pm",
    // timestamp:"far far away",
    // received:false
    //     });
        setInput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
            
            <div className="chat__headerInfo">
    <h3>{roomname}</h3>
    <p>
        last seen at {' '}
        {
            new Date(
                firemessages[firemessages.length - 1]?.
                timestamp?.toDate()
            ).toLocaleString()
        }
    </p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            <div className="chat__body">
                {/* for firbase store */}
                {
                    firemessages.map(msg=>(
                        <p className={`chat__message ${msg.name === user.displayName && "chat__reciever"}`} >
                    <span className="chat__name">{msg.name}</span>
                    {msg.message}
                    <span className="chat__timestamp">{new Date(msg.timestamp?.toDate()).toLocaleString()}</span>
                </p>
                    ))
                }
                {/* ------------------------------ */}
                {/* for mongo db */}
                {/* {messages.map(msg=>(
                    <p className={`chat__message ${msg.received && "chat__reciever"}`} >
                    <span className="chat__name">{msg.name}</span>
                    {msg.message}
                    <span className="chat__timestamp">{msg.timestamp}</span>
                </p>
                ))} */}
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input
                      value={input} 
                      onChange={(e)=>setInput(e.target.value)}
                     placeholder="Type a message"
                     type="text"
                     />
                     <button
                       onClick={sendmessage} 
                      type="submit">
                         Send a message
                     </button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}

export default Chat

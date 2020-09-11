import React,{useEffect, useState} from 'react';
import "./SidebarChat.css";
import { Avatar } from '@material-ui/core';
import db from '../../../firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({id,name,addNewChat}) => {

    const [messages, setmessages] = useState('');
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages')
            .orderBy('timestamp','desc').onSnapshot(snapshot=>(
                setmessages(snapshot.docs.map((doc)=>doc.data()))
            ))
        }
        
    }, [id])

    const createChat=()=>{
        const roomName = prompt("Please Enter Name for chat");
        if(roomName){
            //do some clever stuff
            db.collection("rooms").add({
                name:roomName
            })
        }
    }
    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>
            <div className="sidebarChat__info">
    <h2>{name}</h2>
    <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div
         className="sidebarChat"
         onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>

    )
}

export default SidebarChat

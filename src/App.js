import React,{useEffect,useState} from 'react';
import './App.css';
import Sidebar from './Components/Sidebar.js/Sidebar';
import Chat from './Components/Chat/Chat';
import Pusher from 'pusher-js';
import axios from './Axios/axios';
import { Switch, Route } from 'react-router';
import Login from './Components/Login/Login';
import { useStateValue } from './Store/StateProvider/StateProvider';
// import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';

function App() {

  const [meaasage, setmeaasage] = useState([]);
  const [{user},dispatch]=useStateValue();

  useEffect(() => {
    axios.get('/messages/sync')
    .then(res=>setmeaasage(res.data))
    
  }, [])
  
  useEffect(()=>{
   

    const pusher = new Pusher('64217f0f74b8fc7b482b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (nreMessages)=> {
      // alert(JSON.stringify(nreMessages));
      setmeaasage([...meaasage,nreMessages])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[meaasage])
console.log("meaasage",user);
  return (
  
    <div className="app">
      {
        !user?(<Login/>)
        :(
          <div className="app__body">
          
        <Sidebar/>
          <Switch>
          
          <Route path="/rooms/:roomId">
            <Chat messages={meaasage}/>
          </Route>
          <Route path="/">
          <Chat messages={meaasage}/>
          </Route>
        </Switch>
      </div>
        )
      }
      
     
    </div>
  );
}

export default App;

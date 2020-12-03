import React, { useEffect, useState } from 'react'
import './App.css'
import Post from './components/post/post.component'
import image from './assets/images/1.jpg'
import { db } from './firebase/firebase.util'

const App = () => {
  const [posts, setPosts] = useState([])
  // useEffect -> Runs a piece of code based on a specific condition   
  useEffect(()=>{
    // this is where code runs
   db.collection('posts').onSnapshot(snapshot => {
      // onSnapshot() ->is a listener which listens each time data changes in database
      // Like add,edit,delete Document this code down here will get Execueted

      setPosts(snapshot.docs.map( doc => doc.data()))
      // Above code will update states as soon as component passed in parameter loads in this case "posts"

   })
   
  },[posts])

  return (
    <div className="App">
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="app__headerImage"/>
      </div>
      <h1>Hello Clever Programmers Let's build an Instagram clone with React !!!</h1>
      {posts.map( ({id,username,caption,imageUrl}) => <Post key={id} username={username} imageUrl={imageUrl} caption={caption} />)} 
    </div>
  ); 

  

  
}

export default App;


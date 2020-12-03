import { Modal,makeStyles, Button, TextField, } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './App.css'
import Post from './components/post/post.component'
import { auth, db } from './firebase/firebase.util'
import SendIcon from '@material-ui/icons/Send';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    textAlign : `center`,
    padding : 30
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
 
  const [email, setEmail] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [confirmPassword, setConfirmPassword] = useState([])
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  
  const [user, setUser] = useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    if(password !== confirmPassword) return alert("Password Doesn't Match !!!")
    auth.createUserWithEmailAndPassword(email,password)
    .then( authUser => {
      setOpen(false)
      setEmail('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      return authUser.user.updateProfile({
        displayName : username
      })
    })
    .catch( error => alert(error.message))
  }

  const handleLogin = event => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .then(authUser => {
      setOpenSignIn(false)
      setEmail('')
      setPassword('')
    }).catch(error => alert(error.message))
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        setUser(authUser)
      } else {
         setUser(null)
      }

    })

    return () => {
      // perform some cleanup action 
      unsubscribe()
    }

  },[user,username])

  // useEffect -> Runs a piece of code based on a specific condition   
  useEffect(()=>{
    // this is where code runs
   db.collection('posts').onSnapshot(snapshot => {
      // onSnapshot() ->is a listener which listens each time data changes in database
      // Like add,edit,delete Document this code down here will get Execueted

      setPosts(snapshot.docs.map( doc => (
            { 
              id : doc.id ,      // doc.id -> returns all data of document
              post : doc.data()  // doc.data() -> returns all data of document
            }
          )
        )
      )
      // Above code will update states as soon as component passed in parameter loads in this case "App" since passed None
   })
   
  },[])
  console.log(user)
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      
        <div style={modalStyle} className={classes.paper}>
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="app__headerImage"/>
          <form onSubmit={handleSubmit}>
            <TextField 
              style={{marginTop:20}} 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              label="Email Address" 
              type="email" 
              fullWidth 
              required
            />
            <TextField 
              style={{marginTop:20}} 
              value={username} 
              onChange={(event) => setUsername(event.target.value)} 
              label="Username" 
              type="text" 
              fullWidth 
              required
            />
            <TextField 
              style={{marginTop:20}} 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              label="Password" 
              type="password" 
              fullWidth 
              required
            />
            <TextField 
              style={{marginTop:20}} 
              value={confirmPassword} 
              onChange={(event) => setConfirmPassword(event.target.value)} 
              label="Confirm Password" 
              type="password" 
              fullWidth 
              required
            />
            <Button
              style={{marginTop:35}}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              endIcon={<SendIcon />}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      
        <div style={modalStyle} className={classes.paper}>
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="app__headerImage"/>
          <form onSubmit={handleLogin}>
            <TextField 
              style={{marginTop:20}} 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              label="Email Address" 
              type="email" 
              fullWidth 
              required
            />
            <TextField 
              style={{marginTop:20}} 
              value={password} 
              onChange={(event) => setPassword(event.target.value)} 
              label="Password" 
              type="password" 
              fullWidth 
              required
            />
            <Button
              style={{marginTop: 35}}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              endIcon={<SendIcon />}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="app__headerImage"/>
      </div>
      { user ?
        <div>
          <span>Signed in as <strong> {user.displayName} </strong></span>
          <Button variant="outlined" color="secondary" onClick={() => auth.signOut() }>Sign Out</Button>
        </div>
        
      : <div className="app__login-container">
          <Button variant="outlined" color="primary" onClick={() => setOpen(true) }>Sign Up</Button> 
          <Button variant="contained" style={{backgroundColor : "lightgreen"}} onClick={() => setOpenSignIn(true) }>Login </Button> 
        </div>
      
      }
      <h1>Hello Clever Programmers Let's build an Instagram clone with React !!!</h1>
      {posts.map( ({id,post}) => <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />)} 
    </div>
  ); 
  
}

export default App;


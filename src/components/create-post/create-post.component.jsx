import React, { useState } from 'react'
import firebase from 'firebase'
import { db, storage } from '../../firebase/firebase.util'
import './create-post.component.css'

const CreatePost = ({username}) => {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const handleChange = event => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
            
        }
    }
    const handleUpload = event => {
        event.preventDefault()
        
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Progress Function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => {
                console.error(error)
                alert(error.message)
            },
            () => {
                // complete Function 
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Post Image Inside Database 
                        // Create Post document here
                        db.collection('posts').add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imageUrl : url,
                            username : username
                        })
                    })
                    setProgress(0)
                    setCaption('')
                    setImage(null)
            }
        )
    }
    console.log(username)
    return ( 
        <form onSubmit={handleUpload} className='createpost'>
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="createpost__headerImage"/>
            <h4 style={{textAlign:"center"}} >Post Something New</h4>
            <input 
              style={{marginTop:20}} 
              onChange={(event) => setCaption(event.target.value)} 
              value={caption}
              placeholder="Caption" 
              type="text"  
              required
            />
            <input
              style={{marginTop:20}} 
              onChange={handleChange} 
              type="file" 
              required
            />
            <progress className='createpost__progress' value={progress} max="100" />
            <button className='createpost__button' type="submit">Upload</button>
        </form>
     );
}
 
export default CreatePost;
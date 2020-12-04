import React, { useState } from 'react'
import firebase from 'firebase'
import { Button } from "@material-ui/core"
import { db, storage } from '../../firebase/firebase.util'


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
                    setTimeout(setProgress(0),5000)
                    setCaption('')
                    setImage(null)
            }
        )
    }
    console.log(username)
    return ( 
        <form onSubmit={handleUpload}>
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
            <progress value={progress} max="100" />
            <Button type="submit">Upload</Button>
        </form>
     );
}
 
export default CreatePost;
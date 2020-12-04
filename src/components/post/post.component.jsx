import { Avatar } from '@material-ui/core';
import React,{ useEffect, useState } from 'react'
import { db } from '../../firebase/firebase.util'
import firebase from 'firebase'
import "./post.component.css";

const Post = ({postId, imageUrl, username, caption, user}) => {

    const [comments,setComments] = useState([])
    const [comment,setComment] = useState('')

    useEffect(() => {
        let unsubscribe
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map(doc => doc.data()))
            })
        }
      return () => {
        unsubscribe()
      };
    }, [postId])

    const handleSubmit = event => {
        event.preventDefault()
        console.log(comment)
        setComment('')
        db.collection('posts').doc(postId).collection('comments').add({
            username : user.displayName,
            comment : comment,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className="post">
            {/* Post Header = avatar + username */}
            <div className="post__header">
                <Avatar className="post__avatar" alt={username} src="/static/images/avatar/1.jpg"/>
                <h3>{username}</h3>
            </div>
            {/* Image */}
            <img className="post__image" src={imageUrl} alt="Post"/>
            {/* Username + Caption */}
            <h4 className="post__text"><strong>{username}</strong> : {caption}</h4>
            <div className="post__comments">
                {comments.map(comment =>
                    (<p>
                        <strong>{comment.username} </strong> {comment.comment}
                    </p>)
                )}
            </div>
            { user ?
            <form onSubmit={handleSubmit} className="post__commentBox">
                <input type="text" className="post__input" placeholder="Post your comment..." value={comment} onChange={ event => setComment(event.target.value) }/>
                <button className='post__button' disabled={!comment} type="submit">Post</button>
            </form> :
            <div className="post__comments">
                <p style={{marginBottom : 20 }}>Login to Comment...</p>
            </div>
            }

        </div>
    )
}

export default Post

import { Avatar } from '@material-ui/core';
import React from 'react'
import "./post.component.css";

const Post = ({imageUrl, username, caption}) => {
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
        </div>
    )
}

export default Post

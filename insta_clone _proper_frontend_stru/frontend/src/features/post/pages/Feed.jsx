import React,{useEffect} from 'react'
import '../style/feed.scss'
import Post from '../components/post'
import { usePost } from '../hooks/usepost'


const Feed = () => {

    const {loading,feed,handlegetfeed}= usePost()
    
    useEffect(()=>{
        handlegetfeed()
    },[])


    if(loading|| !feed){
        return (<main><h1>feed is loading...</h1></main>)

    }
    
    console.log(feed)
    return (
        <main className='feed-page'>
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post user={post.user} post={post}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed

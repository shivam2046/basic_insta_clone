import {getfeed} from '../services/post.api'
import { useContext } from 'react'
import { PostContext } from '../post.context'

export const usePost=()=>{
    const context =useContext(PostContext)
    const { loading,setLoading,post,setPost,feed, setFeed}= context

    const handlegetfeed=async()=>{
        setLoading(true)
        const data = await getfeed()
        setFeed(data.post)
        setLoading(false)

    }
    return{loading,feed,post,handlegetfeed}
}
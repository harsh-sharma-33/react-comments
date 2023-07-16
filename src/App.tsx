/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react'
import './App.css'
import Comments from './components/comments/Comments'
import { comments } from './data'
import ICommentData from './interfaces/ICommentData'

function App() {
  const [commentsData, setCommentsData] = useState<ICommentData[] | undefined>()
  useEffect(() => {
    // Api call to fetch comments goes here
    setCommentsData(comments)

  }, [])

  return <div className='container'>
    <h1>Comment Widget</h1>
    <Comments data={commentsData} isRootComment={true} setCommentsData={setCommentsData} />
  </div>
}

export default App

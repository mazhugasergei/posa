// react
import { useLayoutEffect, useState } from 'react'
// supabase
import { createClient } from '@supabase/supabase-js'
// components
import ViewWindow from './ViewWindow'

const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteXNtYmR3aWljbmN6Y2NhZ2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1NjA3ODcsImV4cCI6MTk5MjEzNjc4N30.vK-GKvv9LDJ12qmIJud0qImK9p-ztcSKaodIeSRUvMA'
const supabase = createClient('https://lmysmbdwiicnczccagbn.supabase.co', publicKey)
const CDNURL = 'https://lmysmbdwiicnczccagbn.supabase.co/storage/v1/object/public/images/'

const Home = () => {
  const [images, setImages] = useState<any[] | null>()
  const [dates, setDates] = useState<any[] | null>()
  const [now, setNow] = useState<string | null>()
  const [viewWindow, setViewWindow] = useState<any[] | null>()

  const getDates = async () => {
    await supabase.storage
      .from('images')
      .list() // get all the folders' names
      .then(res => {
        // extract strings from objects
        let tmp = [] as string[]
        res.data?.forEach(folderObj => tmp.push(folderObj.name))
        return tmp
      })
      .then(foldersNames => {
        setDates(foldersNames)
        const now = foldersNames[0]
        setNow(now)
        getImages(now)
      })
      // .catch(e => console.log("error in getDates()"))
  }

  const getImages = async (folder: string) => {
    setImages(null)
    await supabase.storage
      .from('images')
      .list(folder)
      .then(res => setImages(res.data))
      // .catch(e => console.log("error in getImages()"))
  }

  useLayoutEffect(()=>{
    getDates()
  }, [])


  const changeFolder = (e: any) => {
    if(e.target.checked){
      setNow(e.target.id)
      getImages(e.target.id)
    }
  }

  const openViewWindow = (url: string) => {
    document.body.style.overflow = "hidden"
    setViewWindow([<ViewWindow url={url} close={closeViewWindow} key={0}/>])
  }

  const closeViewWindow = () => {
    document.body.style.overflow = "unset"
    setViewWindow(null)
  }

  return (
    <main className="Home">
      { viewWindow }
      <nav className="folders wrapper">
        {
          dates?.map((folder, i)=> {
            const date = new Date(folder).toLocaleDateString("en-US", {day: 'numeric', month: 'short'})
            return(
              <div key={i}>
                <input type="radio" name="folders" id={folder} defaultChecked={folder==now? true : false} onChange={changeFolder} />
                <label className="btn" htmlFor={folder}>{
                  date !== "Invalid Date"? date : folder
                }</label>
              </div>
            )
          })
        }
      </nav>
      <ul className="images wrapper">
        { !images && <div className="loader"/> }
        {
          images && images.map((img, i) => (
            <li
              style={{ backgroundImage: "url('"+CDNURL+now+"/"+img.name+"')" }}
              onClick={()=>{openViewWindow(CDNURL+now+"/"+img.name)}}
              key={i}
            />
          ))
        }
      </ul>
    </main>
  )
}
 
export default Home
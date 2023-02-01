// react
import { useEffect, useState } from 'react'
// supabase
import { createClient } from '@supabase/supabase-js'
// components
import ViewWindow from './components/ViewWindow'

const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2pqcmZrdHR2bGpkZHZhbXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5NzM5MTgsImV4cCI6MTk5MDU0OTkxOH0.2SFgnW4nDEHzh_ZoAfbrI1RNI6QPgCO9PV6XVAdUsM0'
const supabase = createClient('https://ldsjjrfkttvljddvamzj.supabase.co', publicKey)
const CDNURL = 'https://ldsjjrfkttvljddvamzj.supabase.co/storage/v1/object/public/images/'

const Home = () => {
  const [images, setImages] = useState<any [] | null>()
  const dates = ["2023.01.28", "2023.01.29", "2023.01.30"]
  const [now, setNow] = useState(dates[dates.length-1])
  const [viewWindow, setViewWindow] = useState<any [] | null>()

  const getImages = async (date: string) => {
    setImages(null)
    await supabase.storage
    .from('images')
    .list(date, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    })
    .then(res => setImages(res.data))
  }

  useEffect(()=>{
    getImages(now)
  }, [])

  const changeDate = (e: any) => {
    if(e.target.checked){
      setNow(e.target.id)
      getImages(e.target.id)
    }
  }

  const closeViewWindow = () => setViewWindow(null)

  return (
    <main className="Home">
      { viewWindow }
      <nav className="dates">
        {
          dates.map((date, i)=>(
            <div key={i}>
              <input type="radio" name="date" id={date} defaultChecked={date==now? true : false} onChange={changeDate} />
              <label className="btn" htmlFor={date}>{date}</label>
            </div>
          ))
        }
      </nav>
      <ul className="images">
        { !images && <div className="loader"/> }
        {
          images && images.map((img, i) => (
            <li
              className="img_prev"
              style={{ backgroundImage: "url('"+CDNURL+now+"/"+img.name+"')" }}
              key={i}
              onClick={()=>{setViewWindow([<ViewWindow url={CDNURL+now+"/"+img.name} close={closeViewWindow} key={i}/>])}}
            />
          ))
        }
      </ul>
    </main>
  )
}
 
export default Home
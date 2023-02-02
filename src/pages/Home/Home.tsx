// react
import { useEffect, useLayoutEffect, useState } from 'react'
// supabase
import { createClient } from '@supabase/supabase-js'
// components
import ViewWindow from './ViewWindow'

const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2pqcmZrdHR2bGpkZHZhbXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5NzM5MTgsImV4cCI6MTk5MDU0OTkxOH0.2SFgnW4nDEHzh_ZoAfbrI1RNI6QPgCO9PV6XVAdUsM0'
const supabase = createClient('https://ldsjjrfkttvljddvamzj.supabase.co', publicKey)
const CDNURL = 'https://ldsjjrfkttvljddvamzj.supabase.co/storage/v1/object/public/images/'

const Home = () => {
  const [images, setImages] = useState<any[] | null>()
  const [dates, setDates] = useState<any[] | null>()
  const [now, setNow] = useState<string | null>()
  const [viewWindow, setViewWindow] = useState<any[] | null>()

  const getDates = async () => {
    supabase
      .from('table_1')
      .select('date')
      .then(res => {
        let tmp = [] as string[]
        res.data?.forEach(dateObj => {
          tmp.push(dateObj.date)
        })
        return tmp
      })
      .then(datesArr => {
        setDates(datesArr)
        const now = datesArr[datesArr.length-1]
        setNow(now)
        getImages(now)
        // scroll dates to right
        const datesCont = document.querySelector(".Home .dates")
        datesCont?.scrollTo(datesCont.scrollWidth, 0)
      })
  }

  const getImages = async (date: string) => {
    setImages(null)
    await supabase.storage
      .from('images')
      .list(date)
      .then(res => setImages(res.data))
  }

  useLayoutEffect(()=>{
    getDates()
  }, [])


  const changeDate = (e: any) => {
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
      <nav className="dates wrapper">
        {
          dates?.map((date, i)=>(
            <div key={i}>
              <input type="radio" name="date" id={date} defaultChecked={date==now? true : false} onChange={changeDate} />
              <label className="btn" htmlFor={date}>{new Date(date).toLocaleDateString("en-US", {day: 'numeric', month: 'short'})}</label>
            </div>
          ))
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
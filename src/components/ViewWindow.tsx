// react
import { useEffect } from "react"

const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  useEffect(()=>{
    // close on outside click
    document.querySelector(".ViewWindow")?.addEventListener("click", (e)=>{
      if(e.target !== document.querySelector(".ViewWindow img")) close()
    })
  }, [])

  return (
    <div className="ViewWindow">
      <div className="container">
        <img src={url} alt="" />
        <button className="btn light">Close</button>
      </div>
    </div>
  )
}
 
export default ViewWindow
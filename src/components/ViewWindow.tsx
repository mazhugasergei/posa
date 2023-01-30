// react
import { useEffect } from "react"
// images
import downloadBtn from "../images/ui/download.svg"

const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  const downloadImage = async (url: string) => {
    await fetch(url)
      .then(res => {return res.blob()})
      .then(blob =>{
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = ""
        link.click()
      })
  }

  return (
    <div className="ViewWindow">
      <div className="close" onClick={close} />
      <nav className="control">
        <label className="close" onClick={close} />
        <label className="download" onClick={()=>{downloadImage(url)}}><img src={downloadBtn} alt="" /></label>
      </nav>
      <div className="container">
        <img className="img" src={url} alt="" />
      </div>
    </div>
  )
}
 
export default ViewWindow
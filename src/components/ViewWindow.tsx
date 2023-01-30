// react
import { useEffect } from "react"
// images
import download from "../images/ui/download.svg"

const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  return (
    <div className="ViewWindow">
      <div className="close" onClick={close} />
      <nav className="control">
        <label className="close" onClick={close} />
        <label className="download"><img src={download} alt="" /></label>
      </nav>
      <div className="container">
        <img className="img" src={url} alt="" />
      </div>
    </div>
  )
}
 
export default ViewWindow
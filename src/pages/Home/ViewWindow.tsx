// images
import downloadImg from "./images/download.svg"

const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  const downloadImage = async (url: string) => {
    // add loader to download btn
    const downloadBtn = document.querySelector('.ViewWindow .control .download') as HTMLElement
    downloadBtn.innerHTML = ""
    const loader = document.createElement("div")
    loader.classList.add("loader")
    downloadBtn.appendChild(loader)
    // download the image
    await fetch(url)
      .then(res => {return res.blob()})
      .then(blob =>{
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = ""
        link.click()
      })
    // remove loader from download btn
    setTimeout(()=>{
      downloadBtn.innerHTML = ""
      const img = document.createElement("img")
      img.src = downloadImg
      downloadBtn.appendChild(img)
    }, 500)
  }

  return (
    <div className="ViewWindow">
      <div className="close" onClick={close} />
      <nav className="control">
        <label className="close" onClick={close} />
        <label className="download" onClick={()=>{downloadImage(url)}}><img src={downloadImg} alt="" /></label>
      </nav>
      <div className="container">
        <img className="img" src={url} alt="" />
      </div>
    </div>
  )
}
 
export default ViewWindow
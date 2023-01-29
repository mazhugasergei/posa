const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  return (
    <div className="ViewWindow">
      <div className="container">
        <img src={url} alt="" />
        <div className="cont">
          <button className="btn" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}
 
export default ViewWindow
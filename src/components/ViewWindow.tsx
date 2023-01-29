const ViewWindow = ({ url, close }: { url: string, close: ()=>void }) => {
  return (
    <div className="ViewWindow">
      <div className="container">
        <img src={url} alt="" />
        <button className="btn" onClick={close}>Close</button>
      </div>
    </div>
  )
}
 
export default ViewWindow
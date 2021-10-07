import React from "react";
import './index.css'


const Photo =(props)=>{

    
  
    const images = props.images.map((image)=>{
        let url = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_n.jpg`
        let alt = `img id: ${image.id}`;
        return <li key={image.id}><img src={url} key={image.id} alt={alt}/></li>
      }
    )
   
    return( 
      <div className="photo-container">

        {props.loader ? <div className="ui active centered inline loader"></div> : " "}
        {props.disabled ? <h3>{props.query} gifs </h3> : " "}
        <ul>
          {images}
        </ul>
      </div>
    )
}

export default Photo; 
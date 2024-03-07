import React from 'react';
import image from "../../assets/error.svg";
const NotFound = () => {
  return <>
  
    <div className='container d-flex flex-column justify-content-center align-items-center my-4'>
      <h2 className='text-success'>Not Found Page : 404</h2>
      <img src={image} className='w-75 ' alt="Not Found" />
    </div>
  </>;
}

export default NotFound;
import React from 'react';
import "../Brands/Brands.css";

const DetailsCatagory = ({ subcat, catName }) => {
    return <>
        <div className='container my-4 '>
            <div className="row g-3 text-center ">
                <div className="col-md-12 my-2">
                    <h3 className='fw-samibold' style={{ color: "#4fa74f" }}>{catName} subcategories</h3>
                </div>
                {subcat.map((sub, key) => <div className="col-md-4" key={sub._id}>
                    <div className="card tran-card overflow-hidden border-1">
                        <div className="card-body">
                            <h3 className="card-text fw-semibold">{sub.name}</h3>
                        </div>
                    </div>
                </div>)}


            </div>
        </div>
    </>;
}


export default DetailsCatagory;
import React, { useEffect, useState } from 'react';
import "../Brands/Brands.css";
import axiso from "axios";
import Loading from '../Loading/Loading';
import DetailsCatagory from './DetailsCatagory';

const Catagories = () => {
    const [catagorise, setCatagorise] = useState(null);
    const [subcatagory, setSubcatagory] = useState(null);
    const [loading, setloading] = useState(null);
    const [catagoryName, setCatagoryName] = useState(null);
    async function getcatagories() {
        try {
            setloading(true);
            let { data } = await axiso.get("https://ecommerce.routemisr.com/api/v1/categories");
            setCatagorise(data.data);


        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    async function getDetailsCatagory(id, name) {
        try {
            setloading(true);
            setSubcatagory(null);
            setCatagoryName(null)
            let { data } = await axiso.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
            setSubcatagory(data.data);
            setCatagoryName(name);
        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    useEffect(() => {
        getcatagories();
    }, [])
    return <>
        {loading ? <div className='position-sticky top-0 w-100 z-2'>
            <div className="position-absolute w-100 z-2"><Loading /></div>
        </div> : ""}

        <div className='container my-4 '>
            {catagorise === null ? "" : <div className="row g-2 text-center ">
                {catagorise.map((catagory, key) =>
                    <div className="col-md-4" key={catagory._id}>
                        <div className="card tran-card overflow-hidden border-1" onClick={() => {
                            getDetailsCatagory(catagory._id, catagory.name)
                        }}>
                            <img src={catagory.image} style={{ height: "300px", transform: "scale(100%,110%)" }} className="card-img-top w-100 img-fluid" alt="img" />
                            <div className="card-body bg-white border-1 ">
                                <h3 className="card-text fw-semibold z-1 py-2" style={{ color: "#4fa74f" }}>{catagory.name}</h3>
                            </div>
                        </div>
                    </div>
                )}

            </div>}
        </div>

        {subcatagory === null ? "" : <DetailsCatagory subcat={subcatagory} catName={catagoryName} />
        }

    </>;
}



export default Catagories;
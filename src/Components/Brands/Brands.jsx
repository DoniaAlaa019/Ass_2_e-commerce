import React, { useEffect, useState } from 'react';
import "./Brands.css";
import axiso from "axios";
import Loading from '../Loading/Loading';



const Brands = () => {
    const [brands, setBrands] = useState(null);
    const [detailsbrands, setDetailsBrands] = useState(null);
    const [loading, setloading] = useState(null);
    async function getBrands() {
        try {
            setloading(true);
            let { data } = await axiso.get("https://ecommerce.routemisr.com/api/v1/brands");
            setBrands(data.data);


        } catch (error) {
            console.log(error);
        }
        setloading(false);
    }
    async function getDetailsBrands(id) {
        try {
            setDetailsBrands(null);
            setloading(true);
            let { data } = await axiso.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
            setDetailsBrands(data.data);

        } catch (error) {
            console.log(error);
        }
        setloading(false);

    }
    useEffect(() => {
        getBrands();
    }, [])
    return <>

        {loading ? <div className='position-sticky top-0 w-100 z-2'>
            <div className="position-absolute w-100 z-2"><Loading /></div>
        </div> : ""}
        : <div className='container my-4'>
            <div className="row  g-3 text-center">
                <div className="col-md-12 d-flex flex-row justify-content-center">
                    <h2 style={{ color: "#4fa74f" }}>All Brands</h2>
                </div>
                {brands === null ? "" : <>{brands.map((brand, key) =>
                        <div className="col-md-3" key={brand._id}>
                            <div className="card tran-card" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                getDetailsBrands(brand._id)
                            }}>
                                <img src={brand.image} className="card-img-top w-100 p-2" alt="img" />
                                <div className="card-body">
                                    <p className="card-text fw-semibold">{brand.name}</p>
                                </div>
                            </div>
                        </div>
                    )}</>
                    

                }
            </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {detailsbrands === null ? <div className="modal-body">
                    </div> :
                        <div className="modal-body">
                            <div className='d-flex flex-row justify-content-around align-items-center'>
                                <div>
                                    <h2 className='fw-bolder' style={{ color: "#4fa74f" }}>{detailsbrands.name}</h2>
                                    <p>{detailsbrands.slug}</p>
                                </div>
                                <div>
                                    <img src={detailsbrands.image} className='w-100' alt="img" />
                                </div>
                            </div>
                        </div>}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </>;
}


export default Brands;
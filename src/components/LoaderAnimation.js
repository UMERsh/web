import React from 'react'
import logo from 'Assets/images/logo.png'
import 'scss/_loaderAnimation.scss'


export default function LoaderAnimation() {
    return (
        <div className="container loading-animation">
            <div className="row">
                <div className="col ">
                    <img src={logo} width="20%" alt="" />
                    <h3 className='mt-5'>Please Wait</h3>
                </div>
            </div>
        </div>
    )
}

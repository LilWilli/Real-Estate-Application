import React from 'react'

const GoogleMaps = () => {
    return (
        <div className='map-area'>
            <div className='maps'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78182.20630709303!2d-0.9627994505602574!3d52.23986078718514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487704236e4aa273%3A0xcdf495d0d9e86209!2sNorthampton%2C%20UK!5e0!3m2!1sen!2sng!4v1726953219342!5m2!1sen!2sng" width="800" height="1000" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default GoogleMaps
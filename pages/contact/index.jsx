import NavItems from 'Component/NavItems';
import PageHeader from 'Component/PageHeader';
import Image from 'next/image';
import React, { useState } from 'react';
import icon1 from "../../public/assets/images/icon/01.png";
import icon2 from "../../public/assets/images/icon/02.png";
import icon3 from "../../public/assets/images/icon/03.png";
import icon4 from "../../public/assets/images/icon/04.png";
import GoogleMaps from 'Component/GoogleMaps';

const Index = () => {
    const subTitle = "Get in touch with us";
    const title = "We're Always Eager To Hear From You!";
    const conSubTitle = "Get in touch with Contact us";
    const conTitle = "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
    const btnText = "Send Your Message";

    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        subject: '',
        message: ''
    });

    const contactList = [
        { imgUrl: icon1, imgAlt: "contact icon", title: "Office Address", desc: "24 Willow Road, Akala Junction" },
        { imgUrl: icon2, imgAlt: "contact icon", title: "Phone number", desc: "+2349084988744" },
        { imgUrl: icon3, imgAlt: "contact icon", title: "Send email", desc: "demi.adepitan@gmail.com" },
        { imgUrl: icon4, imgAlt: "contact icon", title: "Our website", desc: "https://demiadepitan.wixsite.com/my-site-1" }
    ];

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Detect if mailto is supported
    const isMailtoSupported = () => {
        const a = document.createElement('a');
        a.href = 'mailto:test@example.com';
        return a.protocol === 'mailto:';
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // If mailto is supported, use mailto link
        if (isMailtoSupported()) {
            const mailtoLink = `mailto:demi.adepitan@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.number)}%0A%0AMessage:%0A${encodeURIComponent(formData.message)}`;
            window.location.href = mailtoLink;
        } 
        // Otherwise, submit form data to backend
        else {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Handle success (e.g., display a thank you message)
                    alert('Form submitted successfully');
                } else {
                    // Handle error
                    alert('Error submitting the form');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <NavItems />
            <div>
                <PageHeader title={"Get In Touch With Us"} curPage={"Contact Us"} />
                <div className='map-address-section padding-tb section-bg'>
                    <div className="container">
                        <div className="section-header text-center">
                            <span className='subtitle'>{subTitle}</span>
                            <h3 className='title'>{title}</h3>
                        </div>
                        <div className="section-wrapper">
                            <div className="row flex-row-reverse">
                                <div className="col-xl-4 col-lg-5 col-12">
                                    <div className='contact-wrapper'>
                                        {contactList.map((val, i) => (
                                            <div key={i} className='contact-item'>
                                                <div className='contact-thumb'>
                                                    <Image src={val.imgUrl} width={100} height={100} alt={val.imgAlt} />
                                                </div>
                                                <div className='contact-content'>
                                                    <h6 className='title'>{val.title}</h6>
                                                    <p>{val.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-xl-8 col-lg-7 col-12'>
                                    <GoogleMaps />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='contact-section padding-tb'>
                    <div className="container">
                        <div className="section-header text-center">
                            <span className='subtitle'>{conSubTitle}</span>
                            <h2>{conTitle}</h2>
                        </div>
                        <div className='section-wrapper'>
                            <form className='contact-form' onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        name='name'
                                        id='name'
                                        className='form-control'
                                        placeholder='Your Name *'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        className='form-control'
                                        placeholder='Your Email *'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="number"
                                        name='number'
                                        id='number'
                                        className='form-control'
                                        placeholder='Your Phone Number *'
                                        value={formData.number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        name='subject'
                                        id='subject'
                                        className='form-control'
                                        placeholder='Subject *'
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='form-group w-100'>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={8}
                                        placeholder='Your Messages'
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className='form-group w-100 text-center'>
                                    <button type='submit' className='lab-btn'><span>{btnText}</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

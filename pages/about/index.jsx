import React from 'react'
import icon1 from "../../public/assets/images/about/icon/01.jpg"
import icon2 from "../../public/assets/images/about/icon/02.jpg"
import icon3 from "../../public/assets/images/about/icon/03.jpg"
import NavItems from 'Component/NavItems'
import aboutImg from "../../public/assets/images/about/Coder1.jpeg";
import aboutImg2 from "../../public/assets/images/about/Coder2.jpeg";
import aboutImg3 from "../../public/assets/images/about/Coder3.jpeg";
import aboutImg4 from "../../public/assets/images/about/Coder4.jpeg";
import PageHeader from 'Component/PageHeader'
import Image from 'next/image'
const About = () => {
    const subTitle = "About Our Brand"; const title = "Good Qualification Services And Better Expriences"; const desc = "Distinctively provide acces mutfuncto users whereas transparent proceses somes ncentivize eficient functionalities rather than extensible archtectur communicate leveraged services and cross-platform.";

    const year = "30+"; const expareance = "Years Of Experiences";

    const aboutList = [{ imgUrl: icon1, imgAlt: 'about icon rajibraj91 rajibraj', title: 'Skilled Instructors', desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services', }, { imgUrl: icon2, imgAlt: 'about icon rajibraj91 rajibraj', title: 'Get Certificate', desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services', }, { imgUrl: icon3, imgAlt: 'about icon rajibraj91 rajibraj', title: 'Online Classes', desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services', },]
    return (
        <div>
            <NavItems />
            <div><PageHeader title={"About Our Application"} curPage={"About"} />
                <div className='about-section style-3 padding-tb section-bg'>
                    <div className="container">
                        <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
                            <div className='col'>
                                <div className='about-left'>
                                    <div className="about-thumb">
                                        <Image width={400} height={900} src={aboutImg} alt='Coder1' />
                                    </div>
                                    <div className='abs-thumb'>
                                        <Image src={aboutImg2} width={200} height={400} />
                                    </div>
                                    <div className='about-left-content'>
                                        <h3>{year}</h3>
                                        <p>{expareance}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='about-right'>
                                    <div className='section-header'>
                                        <span className='subtitle'>{subTitle}</span>
                                        <h2 className='title'>{title}</h2>
                                        <p>{desc}</p>
                                    </div>
                                    <div className='section-wrapper'>
                                        <ul className='lab-ul'>
                                            {
                                                aboutList.map((val, i) => {
                                                    return <li key={i}>
                                                        <div className='sr-left'>
                                                            <Image src={val.imgUrl} />
                                                        </div>
                                                        <div className='sr-right'>
                                                            <h5>{val.title}</h5>
                                                            <p>{val.desc}</p>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
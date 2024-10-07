import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import blogList from 'utilis/blogdata'; // Adjust the import path as needed
import PageHeader from 'Component/PageHeader';
import Image from 'next/image';
import NavItems from 'Component/NavItems';
import single1 from "../../public/assets/images/blog/single/01.jpg"
import single2 from "../../public/assets/images/blog/single/02.jpg"
import Tags from 'pages/shop/Tags';
import PopularPost from 'pages/shop/PopularPost';
const SingleBlog = () => {
    const router = useRouter();
    const { singleBlog } = router.query; // Use the correct query parameter name
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (singleBlog) {
            const foundBlog = blogList.find(b => b.id === Number(singleBlog));
            setBlog(foundBlog);
        }
    }, [singleBlog]);

    // Handle loading state or when the blog is not found
    if (!blog) {
        return <div>Loading...</div>; // Or handle not found
    }
    const socialList = [{ link: "#", iconName: "icofont-facebook", className: "facebook", }, { link: "#", iconName: "icofont-twitter", className: "twitter", }, { link: "#", iconName: "icofont-linkedin", className: "linkedin", }, { link: "#", iconName: "icofont-instagram", className: "instagram", }, { link: "#", iconName: "icofont-pinterest", className: "pinterest", },];
    return (
        <div>
            <NavItems />
            <PageHeader title={"Single Blog Pages"} curPage={"Blog / Blog Details"} />
            <div className='blog-section blog-single padding-tb section-bg'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className='col-lg-8 col-12'>
                            <article>
                                <div className='section-wrapper'>
                                    <div className='row row-cols-1 justify-content-center g-4'>
                                        <div className="col">
                                            <div className='post-item style-2'>
                                                <div className="post-inner">
                                                    <div className="post-thumb">
                                                        <Image
                                                            width={600}
                                                            height={400}
                                                            src={blog.imgUrl.src}
                                                            alt={blog.imgAlt}
                                                            className='w-100'
                                                        />
                                                    </div>
                                                    <div className='post-content'>
                                                        <h4>{blog.title}</h4>
                                                        <div className='meta-post'>
                                                            <ul className='lab-ul'>
                                                                {
                                                                    blog.metaList.map((meta, i) => (
                                                                        <li key={i}><i className={meta.iconName}></i>{meta.text}</li>

                                                                    ))
                                                                }
                                                            </ul>

                                                        </div>
                                                        <p>
                                                            In an increasingly interconnected world, learning through real-world projects has become essential for professional growth. This blog explores the significance of hands-on experiences in various countries, showcasing how practical applications can enhance your skills and understanding. We’ll dive into successful case studies from around the globe, highlighting innovative projects that empower individuals to tackle real challenges. Whether you're a student or a seasoned professional, discover how engaging with international projects can broaden your horizons, foster collaboration, and ultimately shape your career path. Join us on this journey to learn how to apply your knowledge in impactful ways!
                                                        </p>
                                                        <blockquote>
                                                            <p>
                                                                Dynamically recaptivating the essence of global learning experiences is crucial in today's educational landscape. This blog post delves into the transformative power of engaging in real-world projects across diverse cultures. By immersing yourself in international initiatives, you not only enhance your skill set but also gain unique insights that challenge conventional thinking. We’ll explore various collaborative projects that demonstrate how cross-border teamwork fosters innovation and creativity. Join us as we uncover practical strategies to harness these experiences, empowering you to make a meaningful impact in your field while cultivating a deeper understanding of global perspectives.
                                                            </p>
                                                            <cite>
                                                                <a href="#">... Alex Crimson</a>
                                                            </cite>
                                                        </blockquote>
                                                        <p>
                                                            Engaging with real-world projects not only enhances your technical abilities but also enriches your cultural awareness. By collaborating with diverse teams, you learn to navigate different viewpoints and approaches, making you a more adaptable professional. This blog will highlight key takeaways from these experiences, showcasing how they can ignite your passion for lifelong learning and professional development in an ever-evolving global landscape.
                                                        </p>
                                                        <Image src={single1} width={400} height={400} alt="Alternate" />
                                                        <p>
                                                            Engaging in collaborative projects across borders is not just about building your resume; it's about enriching your worldview. These hands-on experiences help bridge cultural gaps and foster mutual understanding, making you a more empathetic leader. In this blog post, we’ll highlight inspiring stories from individuals who have transformed their careers through such initiatives, showcasing the profound impact of global collaboration.
                                                        </p>
                                                        <div className='video-thumb'>
                                                            <Image src={single2} width={400} height={400} alt='Alternate for video' />
                                                            <a href="https://youtu.be/mmxVCFceQgU?si=uAcMtIf6JmQPsKs9" className='video-button popover' target='_blank'>
                                                                <i className='icofont-ui-play'></i>
                                                            </a>
                                                        </div>
                                                        <p>Embracing hands-on experiences fosters creativity and innovation, allowing students to tackle real-world challenges with confidence. By engaging in practical projects, learners can develop critical skills that are essential for success in today’s global landscape.</p>
                                                        <div className='tags-section'>
                                                            <ul className='tags lab-ul'>
                                                                <li>
                                                                    <a href="#">Agency</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Business</a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">Personal</a>
                                                                </li>
                                                            </ul>
                                                            <ul className='lab-ul social-icons'>
                                                                {
                                                                    socialList.map((val, i) => {
                                                                        return <li key={i}>
                                                                            <a href="#" className={val.className}>
                                                                                <i className={val.iconName}></i>
                                                                            </a>
                                                                        </li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='navigations-part'>
                                            <div className='left'>
                                                <a href="#" classname="prev">
                                                    <i className='icofont-double-left'></i> Pervious Blog
                                                </a>
                                                <a href="#" className='title'>
                                                    The Power of Collaborative Learning in a Global Context
                                                </a>
                                            </div>
                                            <div className='right'>
                                                <a href="#" classname="next">
                                                    <i className='icofont-double-right'></i> Pervious Blog
                                                </a>
                                                <a href="#" className='title'>
                                                    Embracing Cross-Cultural Collaboration: Unlocking Global Opportunities
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className='col-lg-4 col-12'>
                            <aside>
                                <Tags />
                                <PopularPost />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;

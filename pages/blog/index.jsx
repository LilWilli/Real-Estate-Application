import PageHeader from 'Component/PageHeader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blogList from 'utilis/blogdata';

const BlogPage = () => {
  return (
    <div>
      <PageHeader title="Our Blog Page" curPage="Blog" />
      <div className='blog-section padding-tb section-bg'>
        <div className="container">
          <div className="section-wrapper">
            <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4'>
              {
                blogList.map((blog, i) => (
                  <div className='col' key={i}>
                    <div className='post-item'>
                      <div className='post-inner'>
                        <div className='post-thumb'>
                          <Link href={`/blog/${blog.id}`}> {/* Add href here */}
                            <Image src={blog.imgUrl} alt={blog.imgAlt} width={128} height={128} layout="intrinsic" />
                          </Link>
                        </div>
                        <div className='post-content'>
                          <h4>
                            <Link href={`/blog/${blog.id}`}>{blog.title}</Link> {/* Add href here */}
                          </h4>
                          <div className='meta-post'>
                            <ul className='lab-ul'>
                              {
                                blog.metaList.map((meta, i) => (
                                  <li key={i}><i className={meta.iconName}></i>{meta.text}</li>

                                ))
                              }
                            </ul>
                          </div>
                          <p>{blog.desc}</p>
                        </div>
                        <div className='post-footer'>
                          <div className='pf-left'>
                            <Link href={`/blog/${blog.id}`} className='lab-btn-text'>
                              <i className='icofont-external-link'></i>
                              {blog.btnText}
                            </Link>
                          </div>
                          <div className='pf-right'>
                            <i className='icofont-comment'></i>
                            <span className='comment-count'>{blog.commentCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div >
      </div >
    </div>
  );
};

export default BlogPage;

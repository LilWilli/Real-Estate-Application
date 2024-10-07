import React from 'react';
import Link from 'next/link';

const PageHeader = ({ title, curPage }) => {
  const segments = curPage.split(' / ');

  return (
    <div className='pageheader-section'>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="pageheader-content text-center">
              <h2>{title}</h2>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb justify-content-center'>
                  <li className='breadcrumb-item'>
                    <Link href="/">Home</Link>
                  </li>
                  {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const href = index === 0 ? '/shop' : '#'; // Adjust as needed

                    return (
                      <li
                        key={index}
                        className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {!isLast ? (
                          <Link href={href}>{segment}</Link>
                        ) : (
                          segment
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

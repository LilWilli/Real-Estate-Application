import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Search = ({ products = [] }) => { // Default to empty array if undefined
    const [searchTerm, setSearchTerm] = useState("");

    // Filter products only if products array is defined
    const filterProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='widget widget-search'>
            <form className='search-wrapper mb-3' onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name='search'
                    placeholder='Search Based On our Houses'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type='button'>
                    <i className='icofont-search-2'></i>
                </button>
            </form>
            <div>
                {searchTerm && filterProducts.length > 0 && (
                    <div>
                        {filterProducts.map((product) => (
                            <Link href={`/shop/${product.id}`} key={product.id} passHref>
                                <div className='d-flex gap-3 p-2'>
                                    <div className='pro-thumb h-25'>
                                        <Image
                                            src={product.image}
                                            width={70}
                                            height={70}
                                            alt={product.name}
                                            className='flex-grow-0 flex-shrink-0'
                                        />
                                    </div>
                                    <div>
                                        <h6>{product.name}</h6>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

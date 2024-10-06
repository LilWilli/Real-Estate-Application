import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHeader from 'Component/PageHeader';
import { Autoplay } from 'swiper/modules';
import Review from './Review';
import PopularPost from './PopularPost';
import Tags from './Tags';
import NavItems from 'Component/NavItems';
import ProductDisplay from './ProductDisplay';
import Script from 'next/script';
import { toast } from 'react-toastify';
import Image from 'next/image'; // Import the Image component from next/image

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query, isReady } = useRouter();
  const singleProductId = parseInt(query.singleProduct, 10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        const data = response.data;
        const foundProduct = data.find(p => p.id === singleProductId);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (isReady && singleProductId) {
      fetchProducts();
    }
  }, [isReady, singleProductId]);

  useEffect(() => {
    // Dynamically load Bootstrap JS
    const loadBootstrapJS = async () => {
      if (typeof window !== 'undefined') {
        await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }
    };
    loadBootstrapJS();
  }, []);

  const addToCart = (item, quantity) => {
    if (quantity <= 0) {
      toast.error('Please specify a valid quantity.', { autoClose: 2000 });
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity = quantity;
      toast.success('Cart updated successfully!', { autoClose: 2000 });
    } else {
      cart.push({ ...item, quantity });
      toast.success('Product added to cart!', { autoClose: 2000 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <NavItems />
      <PageHeader title="OUR SHOP SINGLE" curPage="Shop / Single Product" />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className='col-lg-8 col-12'>
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <Swiper
                          spaceBetween={30}
                          slidesPerView={1}
                          loop={true}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                          }}
                          modules={[Autoplay]}
                          navigation={{
                            prevEl: ".pro-single-prev",
                            nextEl: ".pro-single-next"
                          }}
                          className='mySwiper'
                        >
                          {product.image && (
                            <SwiperSlide>
                              <div className='single-thumb'>
                                {/* Replace img with Image */}
                                <Image 
                                  src={product.image} 
                                  alt={product.name} 
                                  layout="responsive" // Automatically adjusts size
                                  width={600} // Set appropriate width
                                  height={400} // Set appropriate height
                                  priority // Optional: Load this image with high priority
                                />
                              </div>
                            </SwiperSlide>
                          )}
                        </Swiper>
                        <div className='pro-single-next'>
                          <i className='icofont-rounded-left'></i>
                        </div>
                        <div className='pro-single-prev'>
                          <i className='icofont-rounded-right'></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          <ProductDisplay key={product.id} item={product} addToCart={addToCart} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review"><Review /></div>
              </article>
            </div>
            <div className='col-lg-4 col-12'>
              <aside className='ps-lg-4'>
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

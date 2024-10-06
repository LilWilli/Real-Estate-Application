import React, { useState } from 'react'; // Importing React

// Importing Components
import NavItems from '../../Component/NavItems'; // Importing NavItems
import PageHeader from '../../Component/PageHeader'; // Importing PageHeader
import Footer from '../../Component/Footer'; // Importing Footer
import ProductCards from './ProductCards'; // Importing ProductCards

// Importing Data
import Data from '../../public/products.json'; // Importing Data

// Importing Other Components
import Pagination from './Pagination'; // Importing Pagination
import Search from './Search'; // Importing Search
import EstateCategory from './EstateCategory'; // Importing EstateCategory
import PopularPost from './PopularPost'; // Importing PopularPost
import Tags from './Tags'; // Importing Tags

// Initializing estateResults
const estateResults = "Showing 01 - 12 of 139 Results";

// EstatePage Component
const EstatePage = () => {
  // State Variables
  const [gridList, setGridList] = useState(true); // gridList State
  const [products, setProducts] = useState(Data); // products State
  const [currentPage, setCurrentPage] = useState(1); // currentPage State
  const [selectedCategory, setSelectedCategory] = useState("All"); // selectedCategory State

  // Calculating productPerPage
  const productPerPage = 9;

  // Calculating indexOfLastProduct and indexOfFirstProduct
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;

  // Slicing products based on currentPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination Function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ensuring 'All' is only once in menuItems
  const menuItems = ["All", ...new Set(Data.map((val) => val.category))];

  // Filtering products based on category
  const filterItems = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setProducts(Data);
    } else {
      const filteredItems = Data.filter((item) => item.category === category);
      setProducts(filteredItems);
    }
  };

  // Rendering EstatePage
  return (
    <div>
      <NavItems /> {/* Rendering NavItems */}
      <div className='min-vh-100'>
        <PageHeader title="Our Estate Page" curPage="Estate" /> {/* Rendering PageHeader */}
        <div className='shop-page padding-tb'>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-12">
                <article>
                  <div className="shop-title d-flex flex-wrap justify-content-between">
                    <p>{estateResults}</p> {/* Rendering estateResults */}
                    <div className={`product-view-mode ${gridList ? "gridActive" : "listActive"}`}>
                      {/* Rendering grid and list icons */}
                      <a className='grid' onClick={() => setGridList(true)}><i className='icofont-ghost'></i></a> {/* Rendering grid */}
                      <a className='list' onClick={() => setGridList(false)}><i className='icofont-listine-dots'></i></a> {/* Rendering list */}
                    </div>
                  </div>
                  <ProductCards gridList={gridList} products={currentProducts} /> {/* Rendering ProductCards */}
                  <Pagination
                    productPerPage={productPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                    activePage={currentPage}
                  /> {/* Rendering Pagination */}
                </article>
              </div>
              <div className="col-lg-4 col-12">
                <aside>
                  <Search products={products} gridList={gridList} /> {/* Rendering Search */}
                  <EstateCategory
                    filterItems={filterItems}
                    setProducts={setProducts}
                    menuItems={menuItems}
                    selectedCategory={selectedCategory}
                    Data={Data}
                  /> {/* Rendering EstateCategory */}
                  <PopularPost /> {/* Rendering PopularPost */}
                  <Tags /> {/* Rendering Tags */}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Rendering Footer */}
    </div>
  );
};

export default EstatePage;


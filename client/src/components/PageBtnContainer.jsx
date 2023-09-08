import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext(); // data take from all jobs.
  //   console.log(numOfPages, currentPage); it will show the undefined values

  // callback function to make undefined to defined  pagination logic -1
  // const pages = Array.from({ length: numOfPages }, (_, index) => {
  //   return index + 1;
  // }); // index passed as argument.

  //console.log(pages); above condition setup the values for undefined objects.

  // useLocation hook react-router-dom
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  //console.log(search, pathname); ex: 1,2,3 and pathUrl: /dashboard/all-jobs/pending

  // pagination (Logic) - 1 with button button array mapping the pageNumber.
  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber); // pageNumber key of our array. btn-container class
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // pagination 2 - complex approach

  const addPageButton = ({ pageNumber, activeClass }) => {
    // this code is copy from the button container below.
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        // className is targeted for the active teh class with that defined number ex: {1,2,3,4}
        key={pageNumber} // key setup as pageNumber and invoked below.
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // current page added.
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    // one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }
    // dots after
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ....
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages, // numOfPages because we don't know how page it takes. it coming from array.
      }) // last page button.
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1; // prev page functionality
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">
        {/* Pagination logic -2 with array with customButton functions*/}
        {renderPageButtons()}
        {/* Pagination logic -1 with mapping the array*/}
        {/* {pages.map((pageNumber) => { 
          //this array map through the pages array with pageNumber value
            return (
              <button
                className={`btn page-btn $ {   
                    activeClass  && 'active
                }`} // className is targeted for the active teh class with that defined number ex: {1,2,3,4}
                key={pageNumber} // key setup as pageNumber and invoked below.
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
        })} */}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1; // next page functionality
          // if (nextPage >  numOfPages) nextPage = numOfPages;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;

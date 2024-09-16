const notFoundImg = require('../../resources/img/not-found-404.jpeg');

const PageNotFound = () => {
    return (
        <div className='not-found_wrapper'>
            <h2>Page not found...</h2>
            <div className="not-found">
                <img src={notFoundImg} alt="page not found" />
            </div>
        </div>

    );

}

export default PageNotFound;
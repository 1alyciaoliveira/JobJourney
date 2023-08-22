import "../style/PageNotFound.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function PageNotFound() {
    return (
        <div className="content">
            <div className="page-nf1">
            <div className="page-nf2">
                    <h1 className="not-found">Page Not Found!</h1>
                    <br></br>
                    <div className="mb-5" >
                        <p>
                            This must be a mistake, please make sure you're in the correct page.
                        </p>
                    </div>
                    <a href="https://ancient-everglades-97703-e6a603057067.herokuapp.com/" className="btn btn-primary go-homepage">
                        Go to Home Page
                    </a>
            </div>
            </div>
        </div>
    );
}

export default PageNotFound;

import "../style/Success.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function PageNotFound() {
    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 className="not-found">Page Not Found!</h1>
                    <div className="mb-5" >
                        <p>
                            This must be a mistake, please make sure you're in the correct page.
                        </p>
                    </div>
                    <button className="btn btn-primary go-home">
                        HomePage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;

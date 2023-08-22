import "../style/Cancel.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Cancel() {
    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 style={{ color: 'red' }} className="title-thanks">We understand...</h1>

                    <div  className="mb-5" >
                        <p>
                            We're sorry to hear that you've decided not to make a donation at this time.
                            We invite you to continue using the app and making the most of all the features we have to offer. If you ever decide to reconsider the possibility of supporting us, we'll be here with open arms. In the meantime, we're here to assist you every step of your professional journey and to make your experience with Jobjourney as beneficial as possible.
                        </p>
                    </div>
                    <div>
                        <p>
                            Thank you again for being part of our community.
                        </p>
                    </div>

                    <div>
                        <p>
                            Best regards,
                            Jobjourney Team
                        </p>
                    </div>
                    <a href="http://ancient-everglades-97703-e6a603057067.herokuapp.com/dashboard" className="btn btn-primary go-home">
                    Go to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Cancel;
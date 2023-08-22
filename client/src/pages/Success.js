import "../style/Success.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Success() {
    return (
        <div className="content">
            <div className="wrapper-1">
                <div className="wrapper-2">
                    <h1 className="title-thanks">Thank you !</h1>
                    <div className="mb-5" >
                        <p>
                            We want to express our heartfelt gratitude for your generous donation and for supporting, Jobjourney! Your contribution is a significant step in our journey to assist individuals in maintaining a more organized and efficient record of their job applications.

                            We are excited about the positive impact Jobjourney will have on people's lives and how it will streamline their job search process.
                        </p>
                    </div>
                    <div>
                        <p>
                            Thank you once again for believing in us and being a part of this exciting journey. Your support makes a difference and motivates us to keep moving forward.
                        </p>
                    </div>

                    <div>
                        <p>
                            Warm regards,
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

export default Success;


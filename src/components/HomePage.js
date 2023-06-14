import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function HomePage() {

    return(
        <div className="home-page">
            <div className="contents">
                <img src="/images/delta-icon.png" alt="logo"/>
                <div className="title">Welcome to Delta</div>
                <div className="subtitle">The Document Retrieval and Evaluation App</div>
                <div className="buttons">
                   <Link to={`/rfp_inbox_page`} className="button-signin">
                        <Button variant="contained" sx={{ textTransform: 'none' }}>&gt;&gt;</Button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
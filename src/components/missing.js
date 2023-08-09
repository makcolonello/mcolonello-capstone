import { Link } from "react-router-dom";

const Missing = () => {
    return (
    <article style={{ padding: "100px" }}>
        <h1>ERROR</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
            <Link to="/home">Home</Link>
        </div>
    </article>
    )
}

export default Missing
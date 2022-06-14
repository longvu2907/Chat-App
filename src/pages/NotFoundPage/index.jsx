import { Link } from "react-router-dom";
import Button from "../../components/Button";
import "./index.scss";

export default function NotFoundPage() {
  return (
    <div className='notfound'>
      <div className='notfound-404'>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
      <Button>
        <Link to='/'>Homepage</Link>
      </Button>
    </div>
  );
}

import Error from "../../components/Error/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
        <Error/>
        <p>404 page a not found</p>
        <Link to='/'>back to main page</Link>
    </div>
  )
}

export default Page404
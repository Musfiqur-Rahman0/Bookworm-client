
import { Link } from 'react-router'

export const unauthozied = () => {
  return (
    <div>
        <h2>Unauthozied access</h2>
        <Link to={"/"}> Back Home</Link>
    </div>
  )
}

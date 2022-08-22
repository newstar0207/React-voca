import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <div>
      <h2>404...</h2>
      <Link to="/">back...</Link>
    </div>
  );
}

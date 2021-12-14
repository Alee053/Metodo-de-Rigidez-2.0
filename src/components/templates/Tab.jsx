import {Link} from "react-router-dom";

export default function Tab({to = "/", children = "tab"}) {
  return (
    <li className='inline-block p-10 '>
      <Link
        to={to}
        className='text-white rounded-xl p-6 text-lg hover:bg-gray-200 hover:bg-opacity-10 hover:text-white hover:shadow-md'>
        {children}
      </Link>
    </li>
  );
}

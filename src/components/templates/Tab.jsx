import {Link} from "react-router-dom";

export default function Tab({to = "/", children = "tab"}) {
  return (
    <li className='inline-block mx-10'>
      <Link
        to={to}
        className='text-white rounded-xl sm:p-2 xl:p-6 xl:text-lg sm:text-sm hover:bg-gray-200 hover:bg-opacity-10 hover:text-white hover:shadow-md'>
        {children}
      </Link>
    </li>
  );
}

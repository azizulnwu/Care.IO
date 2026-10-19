import Link from 'next/link';
import { BiSolidErrorCircle } from 'react-icons/bi';

const PageNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <BiSolidErrorCircle className="mb-4 text-7xl text-primary" />

      <h1 className="text-3xl font-bold md:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-2 max-w-md text-base-content/60">
        Sorry, the page you are looking for does not exist or may have been
        moved.
      </p>

      <Link href="/" className="btn btn-primary mt-6">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
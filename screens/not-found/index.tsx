import Link from "next/link";

import { Routes } from "@/constants/routes";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="text-center my-auto py-24 relative">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-8 flex items-center justify-center gap-x-6">
        <Link href={Routes.HOME}>
          <Button>Go back home</Button>
        </Link>
        <Link href={Routes.BOOK}>
          <Button variant="secondary">Book a Session</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto mt-24 text-center">
      <h1 className="text-5xl">404</h1>
      <h3 className="text-3xl text-amber-400">Not Found Page</h3>
      <Link href="/">go home 👈</Link>
    </div>
  );
};

export default NotFoundPage;

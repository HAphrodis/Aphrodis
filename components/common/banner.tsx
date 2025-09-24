import Image from 'next/image';
import Link from 'next/link';

interface BannerProps {
  currentPage: string;
  backgroundImage?: string;
}

export default function Banner({
  currentPage,
  backgroundImage = '/placeholder.svg?height=400&width=1200'
}: BannerProps) {
  const formattedPage =
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="relative h-[200px] w-full overflow-hidden md:h-[350px]">
      <Image
        src={backgroundImage}
        alt={`${formattedPage} banner`}
        width={1200}
        height={400}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#001D23]/80"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{formattedPage}</h1>
        <nav className="text-sm md:text-base" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link className="hover:underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li aria-current="page">{formattedPage}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

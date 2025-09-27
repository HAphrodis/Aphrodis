import Image from 'next/image';

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
        <h1 className="mb-4 text-2xl leading-tight font-bold text-white md:text-3xl">{formattedPage}</h1>
      </div>
    </div>
  );
}

interface HeadingProps {
  title: string;
}

export const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
    </div>
  );
};

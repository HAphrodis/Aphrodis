import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface AuthorBioProps {
  publishedAt: string;
}

export default function AuthorBio({ publishedAt }: AuthorBioProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12 border-2 border-white/10">
        <AvatarImage src={`/profile.jpg`} />
        <AvatarFallback>HB</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-white font-medium">Ishimwe Jean Baptiste</div>
        <div className="text-white/60 text-sm">{formatDate(publishedAt)}</div>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ShareButtons from "./ShareButtons"

interface CompactAuthorCardProps {
  author: {
    name: string
    profilePhoto: {
      url: string
    }
  }
  date: string
  readingTime: string
  tags: string[]
  title: string
  url: string
}

export function BlogFooterCard({
  author,
  date,
  readingTime,
  title
}: CompactAuthorCardProps) {
  return (
    <div className="flex flex-col border p-2 rounded-2xl 4 mb-6 border-emerald-500/20 sm:flex-row sm:items-center bg-slate-50/50 justify-start  sm:justify-between w-full">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage src={author.profilePhoto.url} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-900">{author.name}</span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
      <ShareButtons
        title={title}
        url={
          typeof window !== 'undefined' ? window.location.href : ''
        }
      />
    </div>
  )
}


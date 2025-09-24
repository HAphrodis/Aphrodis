import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LinkedinIcon as LinkedIn, Twitter, Globe, Instagram, Mail } from 'lucide-react'

interface AuthorProps {
  name: string
  bio: string
  email: string
  id: string
  profilePhoto: {
    url: string
    width: number
    height: number
  }
  linkedInUrl?: string
  twitterXHandle?: string
  portfolio?: string
  instagramHandle?: string
}

export function AuthorCard({
  name,
  bio,
  email,
  profilePhoto,
  linkedInUrl,
  twitterXHandle,
  portfolio,
  instagramHandle
}: AuthorProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={profilePhoto.url} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">{bio}</p>
        <div className="flex space-x-2">
        {portfolio && (
            <Button variant="outline" size="icon" asChild>
              <a href={portfolio} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
              </a>
            </Button>
          )}
          {email && (
            <Button variant="outline" size="icon" asChild>
                <a href={`mailto:${email}`}>
                    <Mail className="h-4 w-4" />
                </a>
            </Button>
            )}
          {linkedInUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <LinkedIn className="h-4 w-4" />
              </a>
            </Button>
          )}
          {twitterXHandle && (
            <Button variant="outline" size="icon" asChild>
              <a href={`${twitterXHandle}`} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
      
          {instagramHandle && (
            <Button variant="outline" size="icon" asChild>
              <a href={`${instagramHandle}`} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
          )}
        
        </div>
      </CardContent>
    </Card>
  )
}

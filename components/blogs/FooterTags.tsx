import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tag } from 'lucide-react'
import ViewCounter from "./viewCounter"

interface FooterTagsProps {
  tags: string[]
  slug: string
}

export function FooterTags({ tags, slug }: FooterTagsProps) {
  return (
    <div className="border-t border-b border-gray-200 py-6">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-gray-700">Tags:</p>
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Badge 
                variant="outline" 
                className="text-sm border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>
        <ViewCounter slug={slug} />
      </div>
    </div>
  )
}


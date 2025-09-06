export interface JobListing {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description?: {
    markdown: string;
  };
  location: string;
  department?: {
    name: string;
    slug: string;
  };
  employmentType: string;
  salaryRange?: string;
  applicationDeadline: string;
  publishedDate: string;
}

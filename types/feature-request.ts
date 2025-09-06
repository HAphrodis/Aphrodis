export interface FeatureRequest {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "rejected";
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureRequestFormValues {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  requestedBy: string;
}

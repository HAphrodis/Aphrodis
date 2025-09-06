export interface Donation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  amount: number;
  frequency: "onetime" | "monthly";
  message?: string;
  status: "pending" | "completed" | "failed";
  paymentMethod?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

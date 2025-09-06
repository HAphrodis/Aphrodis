export interface Member {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  phone: string;
  student_id: string;
  level: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  profile_picture?: string;
}

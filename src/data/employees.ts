import { Employee } from "src/api/v1/models/employeeModel";

export const employees: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    position: "Branch Manager",
    department: "Management",
    email: "alice.johnson@pixell-river.com",
    phone: "604-555-0148",
    branchId: 1,
  },
  {
    id: "2",
    name: "Amandeep Singh",
    position: "Customer Service Representative",
    department: "Customer Service",
    email: "amandeep.singh@pixell-river.com",
    phone: "780-555-0172",
    branchId: 2,
  },
  {
    id: "3",
    name: "Maria Garcia",
    position: "Loan Officer",
    department: "Loans",
    email: "maria.garcia@pixell-river.com",
    phone: "204-555-0193",
    branchId: 3,
  },
];

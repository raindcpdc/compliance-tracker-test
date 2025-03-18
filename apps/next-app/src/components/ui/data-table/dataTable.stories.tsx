
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable as UIDataTable } from '@/components/ui/data-table';

import { ColumnDef } from '@tanstack/react-table';

type EmployeeData = {
  employeeId: string;
  name: string;
  department: string;
  training: string;
  status: string;
  startDate: string | null;
  completionDate: string | null;
};

const columns: ColumnDef<EmployeeData>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "training",
    header: "Training",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
{
  accessorKey: "startDate",
  header: "Start Date",
  cell: ({ row }: { row: { original: { startDate: string | null } } }) => (row.original.startDate ? row.original.startDate : "N/A"),
},
  {
    accessorKey: "completionDate",
    header: "Completion Date",
    cell: ({ row }: { row: { original: { completionDate: string | null } } }) =>
      row.original.completionDate ? row.original.completionDate : "N/A",
  },
]

const data = [
  {
    employeeId: "E001",
    name: "John Doe",
    department: "Sales",
    training: "Workplace Safety",
    status: "Completed",
    startDate: "2024-01-01",
    completionDate: "2024-01-15",
  },
  {
    employeeId: "E002",
    name: "Jane Smith",
    department: "Marketing",
    training: "Code of Conduct",
    status: "In Progress",
    startDate: "2024-01-10",
    completionDate: null,
  },
  {
    employeeId: "E003",
    name: "Sam Wilson",
    department: "IT",
    training: "Cybersecurity Awareness",
    status: "Not Started",
    startDate: null,
    completionDate: null,
  },
];

const meta: Meta<typeof UIDataTable> = {
  title: "UI/DataTable",
  component: UIDataTable,
  parameters: {
    layout: "centered",
  },
  args: {
    columns: columns as ColumnDef<unknown, unknown>[],
    data: data
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DataTable: Story = {}

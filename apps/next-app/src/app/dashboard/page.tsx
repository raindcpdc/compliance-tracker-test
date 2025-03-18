import { Employee } from "@/types"

import Dashboard from "@/features/dashboard"

import { employeeData } from "@/features/dashboard/mocks"

async function getData(): Promise<Employee[]> {
  // Fetch data from your API here.
  return employeeData as Employee[]
}

const DashboardPage = async () => {
  const data = await getData()

  return (
    <div className="container mx-auto px-2 py-10 space-y-4">
      <Dashboard data={data} />
    </div>
  )
}

export default DashboardPage
import SkeletonManageUsers from "@/components/ui/skeleton/skeleton-manage-users"

const ManageLoadingPage = () => {
  return (
    <div className="flex items-start justify-center min-h-screen">
      <SkeletonManageUsers />
    </div>
  )
}

export default ManageLoadingPage

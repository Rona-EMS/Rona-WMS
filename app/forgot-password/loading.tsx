import { LoadingSpinner } from "@/components/loading-spinner"

export default function ForgotPasswordLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-600">Loading password recovery...</p>
      </div>
    </div>
  )
}

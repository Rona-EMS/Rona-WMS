interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LoadingSpinner({ size = "md", color = "#6366f1" }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeMap[size]}`}
        style={{ borderColor: color }}
      ></div>
    </div>
  )
}

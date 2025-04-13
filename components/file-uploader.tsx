"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, AlertCircle } from "lucide-react"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxFileSizeMB?: number
  disabled?: boolean
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 5,
  acceptedFileTypes = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx", ".txt"],
  maxFileSizeMB = 10,
  disabled = false,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList) return

    processFiles(Array.from(fileList))
  }

  const processFiles = (files: File[]) => {
    setError(null)

    // Check if adding these files would exceed the max files limit
    if (selectedFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`)
      return
    }

    const validFiles: File[] = []

    for (const file of files) {
      // Check file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setError(`File "${file.name}" exceeds the maximum size of ${maxFileSizeMB}MB.`)
        continue
      }

      // Check file type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
      if (!acceptedFileTypes.includes(fileExtension) && acceptedFileTypes.length > 0) {
        setError(`File "${file.name}" has an unsupported file type. Accepted types: ${acceptedFileTypes.join(", ")}`)
        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      const newFiles = [...selectedFiles, ...validFiles]
      setSelectedFiles(newFiles)
      onFilesSelected(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
    onFilesSelected(newFiles)
    setError(null)
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const openFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={disabled ? undefined : handleDrop}
        onClick={disabled ? undefined : openFileDialog}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
          disabled={disabled}
        />
        <div className="flex flex-col items-center justify-center py-3">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">Drag and drop files here, or click to select files</p>
          <p className="text-xs text-gray-500 mt-1">Accepted file types: {acceptedFileTypes.join(", ")}</p>
          <p className="text-xs text-gray-500">
            Maximum file size: {maxFileSizeMB}MB (Max {maxFiles} files)
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">
            Selected Files ({selectedFiles.length}/{maxFiles}):
          </p>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded"
              >
                <span className="truncate max-w-[80%]">{file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

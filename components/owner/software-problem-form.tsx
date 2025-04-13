"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/file-uploader"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, FileText, Send } from "lucide-react"

interface SoftwareProblemFormProps {
  onSubmit?: (data: FormData) => Promise<void>
}

export function SoftwareProblemForm({ onSubmit }: SoftwareProblemFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      files.forEach((file, index) => {
        formData.append(`file-${index}`, file)
      })

      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setIsSuccess(true)
      toast({
        title: "Report Submitted",
        description: "Your software problem report has been submitted successfully.",
      })

      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("")
        setDescription("")
        setFiles([])
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Report Software Problem
        </CardTitle>
        <CardDescription>Report any software issues or bugs you encounter while using the platform.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Issue Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting || isSuccess}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Please provide steps to reproduce the issue and any error messages you received"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isSubmitting || isSuccess}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments (Optional)</label>
            <FileUploader
              onFilesSelected={setFiles}
              maxFiles={3}
              acceptedFileTypes={[".jpg", ".jpeg", ".png", ".pdf", ".txt"]}
              maxFileSizeMB={5}
              disabled={isSubmitting || isSuccess}
            />
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Selected Files:</p>
                <ul className="text-sm">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setTitle("")
              setDescription("")
              setFiles([])
            }}
            disabled={isSubmitting || isSuccess}
          >
            Clear
          </Button>
          <Button type="submit" disabled={isSubmitting || isSuccess} className="gap-2">
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Submitting...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Submitted
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Report
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

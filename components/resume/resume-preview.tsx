"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"
import { Button } from "@/components/ui/button"
import { ProfessionalTemplate } from "./templates/professional-template"
import { ModernTemplate } from "./templates/modern-template"
import { MinimalTemplate } from "./templates/minimal-template"

interface ResumePreviewProps {
  template: string
}

export function ResumePreview({ template }: ResumePreviewProps) {
  const { resumeData } = useResumeContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const resumeContentRef = useRef<HTMLDivElement>(null)

  // Calculate total pages based on content height
  useEffect(() => {
    if (resumeContentRef.current) {
      const contentHeight = resumeContentRef.current.scrollHeight
      const pageHeight = 1123 // A4 height in pixels at 96 DPI (297mm)
      const calculatedPages = Math.ceil(contentHeight / pageHeight)
      setTotalPages(calculatedPages > 0 ? calculatedPages : 1)

      // Reset to page 1 if current page is beyond total pages
      if (currentPage > calculatedPages) {
        setCurrentPage(1)
      }
    }
  }, [resumeData, template, currentPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Render the appropriate template
  const renderTemplate = () => {
    const templateProps = {
      resumeData,
      resumeContentRef,
      totalPages,
      currentPage,
    }

    switch (template) {
      case "professional":
        return <ProfessionalTemplate {...templateProps as any} />
      case "modern":
        return <ModernTemplate {...templateProps as any} />
      default:
        return <MinimalTemplate {...templateProps as any} />
    }
  }

  return (
    <div className="flex flex-col">
      {/* A4 Container with fixed dimensions */}
      <div
        className="relative overflow-hidden bg-white shadow-md mx-auto"
        style={{
          width: "794px", // A4 width in pixels at 96 DPI (210mm)
          height: "1123px", // A4 height in pixels at 96 DPI (297mm)
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        {renderTemplate()}

        {/* Page number indicator */}
        {totalPages > 1 && (
          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}


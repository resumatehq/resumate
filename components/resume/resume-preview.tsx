"use client"

import { Phone, Mail, MapPin, Globe, Linkedin } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface ResumePreviewProps {
  template: string
}

export function ResumePreview({ template }: ResumePreviewProps) {
  const { resumeData } = useResumeContext()

  if (template === "professional") {
    return (
      <div className="bg-white text-black p-6 min-h-[600px] text-sm scale-[0.8] origin-top">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{resumeData.personal.fullName || "Your Name"}</h1>
          <p className="text-lg text-gray-600">{resumeData.personal.jobTitle || "Your Job Title"}</p>

          <div className="flex justify-center flex-wrap gap-3 mt-2 text-gray-600">
            {resumeData.personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{resumeData.personal.phone}</span>
              </div>
            )}
            {resumeData.personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{resumeData.personal.email}</span>
              </div>
            )}
            {resumeData.personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{resumeData.personal.location}</span>
              </div>
            )}
            {resumeData.personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>{resumeData.personal.website}</span>
              </div>
            )}
            {resumeData.personal.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                <span>{resumeData.personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700">
            {resumeData.personal.summary ||
              "Add a professional summary to highlight your key strengths and experience."}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
          <div className="space-y-4">
            {resumeData.experience.length > 0 ? (
              resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.position || "Position"}</h3>
                    <span className="text-gray-600">
                      {exp.startDate
                        ? new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "Start Date"}{" "}
                      -{" "}
                      {exp.current
                        ? "Present"
                        : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                          : "End Date"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{exp.company || "Company"}</span>
                    <span>{exp.location || "Location"}</span>
                  </div>
                  <p className="mt-1 text-gray-700">
                    {exp.description || "Describe your responsibilities and achievements..."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Add your work experience</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
          <div className="space-y-4">
            {resumeData.education.length > 0 ? (
              resumeData.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {edu.degree || "Degree"} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </h3>
                    <span className="text-gray-600">
                      {edu.startDate
                        ? new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "Start Date"}{" "}
                      -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "End Date"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{edu.institution || "Institution"}</span>
                    <span>{edu.location || "Location"}</span>
                  </div>
                  {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Add your education</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.technical.length > 0 && (
              <div>
                <h3 className="font-semibold">Technical Skills</h3>
                <p className="text-gray-700">{resumeData.skills.technical.join(", ")}</p>
              </div>
            )}
            {resumeData.skills.soft.length > 0 && (
              <div>
                <h3 className="font-semibold">Soft Skills</h3>
                <p className="text-gray-700">{resumeData.skills.soft.join(", ")}</p>
              </div>
            )}
            {resumeData.skills.languages.length > 0 && (
              <div>
                <h3 className="font-semibold">Languages</h3>
                <p className="text-gray-700">{resumeData.skills.languages.join(", ")}</p>
              </div>
            )}
            {resumeData.skills.technical.length === 0 &&
              resumeData.skills.soft.length === 0 &&
              resumeData.skills.languages.length === 0 && <p className="text-gray-500 italic">Add your skills</p>}
          </div>
        </div>
      </div>
    )
  }

  if (template === "modern") {
    return (
      <div className="bg-white text-black min-h-[600px] text-sm scale-[0.8] origin-top">
        {/* Header with sidebar layout */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="bg-gray-100 p-6 md:w-1/3">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">{resumeData.personal.fullName || "Your Name"}</h1>
              <p className="text-gray-600">{resumeData.personal.jobTitle || "Your Job Title"}</p>
            </div>

            <div className="space-y-2 text-gray-700 mb-6">
              {resumeData.personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{resumeData.personal.phone}</span>
                </div>
              )}
              {resumeData.personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{resumeData.personal.email}</span>
                </div>
              )}
              {resumeData.personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{resumeData.personal.location}</span>
                </div>
              )}
              {resumeData.personal.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span>{resumeData.personal.website}</span>
                </div>
              )}
              {resumeData.personal.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-gray-500" />
                  <span>{resumeData.personal.linkedin}</span>
                </div>
              )}
            </div>

            {/* Skills in sidebar */}
            <div className="mb-6">
              <h2 className="text-base font-bold mb-2 text-gray-800">Skills</h2>
              <div className="space-y-3">
                {resumeData.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700">Technical</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resumeData.skills.technical.map((skill, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {resumeData.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700">Soft Skills</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resumeData.skills.soft.map((skill, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {resumeData.skills.languages.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700">Languages</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {resumeData.skills.languages.map((language, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {resumeData.skills.technical.length === 0 &&
                  resumeData.skills.soft.length === 0 &&
                  resumeData.skills.languages.length === 0 && (
                    <p className="text-gray-500 italic text-sm">Add your skills</p>
                  )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:w-2/3">
            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
              <p className="text-gray-700">
                {resumeData.personal.summary ||
                  "Add a professional summary to highlight your key strengths and experience."}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.length > 0 ? (
                  resumeData.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{exp.position || "Position"}</h3>
                        <span className="text-gray-600 text-xs">
                          {exp.startDate
                            ? new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                            : "Start Date"}{" "}
                          -{" "}
                          {exp.current
                            ? "Present"
                            : exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                              : "End Date"}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <span>
                          {exp.company || "Company"}
                          {exp.location ? `, ${exp.location}` : ""}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        {exp.description || "Describe your responsibilities and achievements..."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Add your work experience</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
              <div className="space-y-4">
                {resumeData.education.length > 0 ? (
                  resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">
                          {edu.degree || "Degree"} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                        </h3>
                        <span className="text-gray-600 text-xs">
                          {edu.startDate
                            ? new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                            : "Start Date"}{" "}
                          -{" "}
                          {edu.endDate
                            ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                            : "End Date"}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <span>
                          {edu.institution || "Institution"}
                          {edu.location ? `, ${edu.location}` : ""}
                        </span>
                      </div>
                      {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Add your education</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default minimal template
  return (
    <div className="bg-white text-black p-6 min-h-[600px] text-sm scale-[0.8] origin-top">
      <h1 className="text-xl font-bold mb-1">{resumeData.personal.fullName || "Your Name"}</h1>
      <p className="text-gray-600 mb-2">{resumeData.personal.jobTitle || "Your Job Title"}</p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
        {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
        {resumeData.personal.email && resumeData.personal.phone && <span>•</span>}
        {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
        {(resumeData.personal.email || resumeData.personal.phone) && resumeData.personal.location && <span>•</span>}
        {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
      </div>

      <p className="mb-4 text-gray-700">
        {resumeData.personal.summary || "Add a professional summary to highlight your key strengths and experience."}
      </p>

      <h2 className="text-base font-bold mb-2">Experience</h2>
      <div className="space-y-3 mb-4">
        {resumeData.experience.length > 0 ? (
          resumeData.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <span className="font-semibold">
                  {exp.position || "Position"} {exp.company ? `| ${exp.company}` : ""}
                </span>
                <span className="text-gray-600 text-xs">
                  {exp.startDate
                    ? new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                    : "Start Date"}{" "}
                  -{" "}
                  {exp.current
                    ? "Present"
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                      : "End Date"}
                </span>
              </div>
              <p className="text-gray-700">{exp.description || "Describe your responsibilities and achievements..."}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Add your work experience</p>
        )}
      </div>

      <h2 className="text-base font-bold mb-2">Education</h2>
      <div className="space-y-2 mb-4">
        {resumeData.education.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <span className="font-semibold">
                  {edu.degree || "Degree"} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}{" "}
                  {edu.institution ? `| ${edu.institution}` : ""}
                </span>
                <span className="text-gray-600 text-xs">
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} -{" "}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Add your education</p>
        )}
      </div>

      <h2 className="text-base font-bold mb-2">Skills</h2>
      {resumeData.skills.technical.length > 0 ? (
        <p className="text-gray-700">{resumeData.skills.technical.join(", ")}</p>
      ) : (
        <p className="text-gray-500 italic">Add your skills</p>
      )}
    </div>
  )
}


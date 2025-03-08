"use client"

import { Phone, Mail, MapPin, Globe, Linkedin, ExternalLink } from "lucide-react"
import { useResumeContext } from "@/context/resume-context"

interface ResumePreviewProps {
  template: string
}

export function ResumePreview({ template }: ResumePreviewProps) {
  const { resumeData } = useResumeContext()

  // Helper function to check if a section has content
  const hasContent = {
    summary: () => !!resumeData.personal.summary?.trim(),
    experience: () =>
      resumeData.experience.some((exp) => exp.company?.trim() || exp.position?.trim() || exp.description?.trim()),
    education: () => resumeData.education.some((edu) => edu.institution?.trim() || edu.degree?.trim()),
    skills: () =>
      resumeData.skills.technical.length > 0 ||
      resumeData.skills.soft.length > 0 ||
      resumeData.skills.languages.length > 0,
    projects: () => resumeData.projects.some((proj) => proj.title?.trim() || proj.description?.trim()),
    certifications: () => resumeData.certifications.some((cert) => cert.name?.trim() || cert.issuer?.trim()),
    awards: () => resumeData.awards.some((award) => award.title?.trim() || award.issuer?.trim()),
  }

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
        {hasContent.summary() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
            <p className="text-gray-700">{resumeData.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasContent.experience() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  {(exp.position || exp.company || exp.description) && (
                    <>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasContent.education() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  {(edu.institution || edu.degree) && (
                    <>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasContent.projects() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Projects</h2>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index}>
                  {(project.title || project.description) && (
                    <>
                      <div className="flex justify-between">
                        <h3 className="font-semibold flex items-center gap-1">
                          {project.title || "Project Title"}
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </h3>
                        <span className="text-gray-600">
                          {project.startDate
                            ? new Date(project.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })
                            : ""}{" "}
                          {project.startDate && "-"}{" "}
                          {project.current
                            ? "Present"
                            : project.endDate
                              ? new Date(project.endDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })
                              : ""}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="mt-1 text-gray-600 text-xs">
                          <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasContent.certifications() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Certifications</h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <div key={index}>
                  {(cert.name || cert.issuer) && (
                    <>
                      <div className="flex justify-between">
                        <h3 className="font-semibold flex items-center gap-1">
                          {cert.name || "Certification Name"}
                          {cert.url && (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </h3>
                        <span className="text-gray-600">
                          {cert.date
                            ? new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                            : ""}
                        </span>
                      </div>
                      <div className="text-gray-600">{cert.issuer || "Issuing Organization"}</div>
                      {cert.description && <p className="mt-1 text-gray-700 text-xs">{cert.description}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors & Awards */}
        {hasContent.awards() && (
          <div className="mb-6">
            <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Honors & Awards</h2>
            <div className="space-y-3">
              {resumeData.awards.map((award, index) => (
                <div key={index}>
                  {(award.title || award.issuer) && (
                    <>
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{award.title || "Award Title"}</h3>
                        <span className="text-gray-600">
                          {award.date
                            ? new Date(award.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                            : ""}
                        </span>
                      </div>
                      <div className="text-gray-600">{award.issuer || "Issuing Organization"}</div>
                      {award.description && <p className="mt-1 text-gray-700 text-xs">{award.description}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasContent.skills() && (
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
            </div>
          </div>
        )}
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
            {hasContent.skills() && (
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
                </div>
              </div>
            )}

            {/* Certifications in sidebar */}
            {hasContent.certifications() && (
              <div className="mb-6">
                <h2 className="text-base font-bold mb-2 text-gray-800">Certifications</h2>
                <div className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index}>
                      {(cert.name || cert.issuer) && (
                        <div className="text-sm">
                          <div className="font-medium flex items-center gap-1">
                            {cert.name}
                            {cert.url && (
                              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <div className="text-gray-600 text-xs">{cert.issuer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="p-6 md:w-2/3">
            {/* Summary */}
            {hasContent.summary() && (
              <div className="mb-6">
                <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                <p className="text-gray-700">{resumeData.personal.summary}</p>
              </div>
            )}

            {/* Experience */}
            {hasContent.experience() && (
              <div className="mb-6">
                <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index}>
                      {(exp.position || exp.company || exp.description) && (
                        <>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{exp.position || "Position"}</h3>
                            <span className="text-gray-600 text-xs">
                              {exp.startDate
                                ? new Date(exp.startDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : "Start Date"}{" "}
                              -{" "}
                              {exp.current
                                ? "Present"
                                : exp.endDate
                                  ? new Date(exp.endDate).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                    })
                                  : "End Date"}
                            </span>
                          </div>
                          <div className="text-gray-600">
                            <span>
                              {exp.company || "Company"}
                              {exp.location ? `, ${exp.location}` : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-700">{exp.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {hasContent.education() && (
              <div className="mb-6">
                <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      {(edu.institution || edu.degree) && (
                        <>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">
                              {edu.degree || "Degree"} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                            </h3>
                            <span className="text-gray-600 text-xs">
                              {edu.startDate
                                ? new Date(edu.startDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })
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
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {hasContent.projects() && (
              <div className="mb-6">
                <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Projects</h2>
                <div className="space-y-4">
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      {(project.title || project.description) && (
                        <>
                          <div className="flex justify-between">
                            <h3 className="font-semibold flex items-center gap-1">
                              {project.title || "Project Title"}
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </h3>
                            <span className="text-gray-600 text-xs">
                              {project.startDate
                                ? new Date(project.startDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : ""}{" "}
                              {project.startDate && "-"}{" "}
                              {project.current
                                ? "Present"
                                : project.endDate
                                  ? new Date(project.endDate).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                    })
                                  : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-700">{project.description}</p>
                          {project.technologies.length > 0 && (
                            <div className="mt-1 text-gray-600 text-xs">
                              <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Honors & Awards */}
            {hasContent.awards() && (
              <div>
                <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">Honors & Awards</h2>
                <div className="space-y-3">
                  {resumeData.awards.map((award, index) => (
                    <div key={index}>
                      {(award.title || award.issuer) && (
                        <>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{award.title || "Award Title"}</h3>
                            <span className="text-gray-600 text-xs">
                              {award.date
                                ? new Date(award.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                                : ""}
                            </span>
                          </div>
                          <div className="text-gray-600">{award.issuer || "Issuing Organization"}</div>
                          {award.description && <p className="mt-1 text-gray-700 text-xs">{award.description}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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

      {hasContent.summary() && <p className="mb-4 text-gray-700">{resumeData.personal.summary}</p>}

      {hasContent.experience() && (
        <>
          <h2 className="text-base font-bold mb-2">Experience</h2>
          <div className="space-y-3 mb-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index}>
                {(exp.position || exp.company || exp.description) && (
                  <>
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
                    <p className="text-gray-700">{exp.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {hasContent.education() && (
        <>
          <h2 className="text-base font-bold mb-2">Education</h2>
          <div className="space-y-2 mb-4">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                {(edu.institution || edu.degree) && (
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
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {hasContent.projects() && (
        <>
          <h2 className="text-base font-bold mb-2">Projects</h2>
          <div className="space-y-3 mb-4">
            {resumeData.projects.map((project, index) => (
              <div key={index}>
                {(project.title || project.description) && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-semibold flex items-center gap-1">
                        {project.title}
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {project.startDate ? new Date(project.startDate).getFullYear() : ""}{" "}
                        {project.startDate && project.endDate && "-"}{" "}
                        {project.current ? "Present" : project.endDate ? new Date(project.endDate).getFullYear() : ""}
                      </span>
                    </div>
                    <p className="text-gray-700">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="text-gray-600 text-xs">
                        <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {hasContent.certifications() && (
        <>
          <h2 className="text-base font-bold mb-2">Certifications</h2>
          <div className="space-y-2 mb-4">
            {resumeData.certifications.map((cert, index) => (
              <div key={index}>
                {(cert.name || cert.issuer) && (
                  <div className="flex justify-between">
                    <span className="font-semibold flex items-center gap-1">
                      {cert.name}
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {cert.issuer && <span className="font-normal"> | {cert.issuer}</span>}
                    </span>
                    <span className="text-gray-600 text-xs">{cert.date ? new Date(cert.date).getFullYear() : ""}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {hasContent.awards() && (
        <>
          <h2 className="text-base font-bold mb-2">Honors & Awards</h2>
          <div className="space-y-2 mb-4">
            {resumeData.awards.map((award, index) => (
              <div key={index}>
                {(award.title || award.issuer) && (
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {award.title} {award.issuer && <span className="font-normal">| {award.issuer}</span>}
                    </span>
                    <span className="text-gray-600 text-xs">
                      {award.date ? new Date(award.date).getFullYear() : ""}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {hasContent.skills() && (
        <>
          <h2 className="text-base font-bold mb-2">Skills</h2>
          {resumeData.skills.technical.length > 0 ? (
            <p className="text-gray-700">{resumeData.skills.technical.join(", ")}</p>
          ) : resumeData.skills.soft.length > 0 ? (
            <p className="text-gray-700">{resumeData.skills.soft.join(", ")}</p>
          ) : (
            resumeData.skills.languages.length > 0 && (
              <p className="text-gray-700">{resumeData.skills.languages.join(", ")}</p>
            )
          )}
        </>
      )}
    </div>
  )
}


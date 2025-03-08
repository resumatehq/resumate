import { Phone, Mail, MapPin, Globe, Linkedin, ExternalLink } from "lucide-react"
import { type TemplateProps, createHasContent } from "./types"

export function ProfessionalTemplate({ resumeData, resumeContentRef, totalPages, currentPage }: TemplateProps) {
  const hasContent = createHasContent(resumeData)

  return (
    <div
      ref={resumeContentRef}
      className="bg-white text-black p-6 text-sm"
      style={{
        height: `${totalPages * 1123}px`, // A4 height in pixels at 96 DPI
        width: "100%",
        position: "relative",
        top: `-${(currentPage - 1) * 1123}px`,
      }}
    >
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


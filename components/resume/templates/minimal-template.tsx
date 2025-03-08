import { ExternalLink } from "lucide-react"
import { type TemplateProps, createHasContent } from "./types"

export function MinimalTemplate({ resumeData, resumeContentRef, totalPages, currentPage }: TemplateProps) {
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


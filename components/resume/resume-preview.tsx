"use client";

import {
  IResume,
  IResumeSection,
  IPersonalInfoContent,
  IWorkExperienceContent,
  IEducationContent,
  ISkillContent,
  IProjectContent,
} from "@/schemas/resume.schema";

interface ResumePreviewProps {
  resume: IResume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  if (!resume) {
    return <div>Loading...</div>;
  }

  // Find specific sections
  const personalSection = resume.sections.find((s) => s.type === "personal");
  const summarySection = resume.sections.find((s) => s.type === "summary");
  const experienceSection = resume.sections.find(
    (s) => s.type === "experience"
  );
  const educationSection = resume.sections.find((s) => s.type === "education");
  const skillsSection = resume.sections.find((s) => s.type === "skills");
  const projectsSection = resume.sections.find((s) => s.type === "projects");
  const certificationsSection = resume.sections.find(
    (s) => s.type === "certifications"
  );
  const awardsSection = resume.sections.find((s) => s.type === "awards");

  // Helper function to render section content based on type
  const renderSectionContent = (section: IResumeSection) => {
    if (!section || !section.content) {
      return <div>No content available</div>;
    }

    switch (section.type) {
      case "personal":
        // Get personal info content
        let personalContent: IPersonalInfoContent;
        if (Array.isArray(section.content) && section.content.length > 0) {
          personalContent = section.content[0] as IPersonalInfoContent;
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          personalContent = section.content as unknown as IPersonalInfoContent;
        } else {
          personalContent = {} as IPersonalInfoContent;
        }

        return (
          <div className="text-center mb-6">
            {personalContent.profilePicture && (
              <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-3">
                <img
                  src={personalContent.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">
              {personalContent.fullName || "Full Name"}
            </h1>
            <p className="text-lg text-gray-600">
              {personalContent.jobTilte ||
                personalContent.jobTitle ||
                "Job Title"}
            </p>
            <div className="flex items-center justify-center mt-2 space-x-4 text-sm text-gray-600">
              {personalContent.email && <div>{personalContent.email}</div>}
              {personalContent.phone && <div>{personalContent.phone}</div>}
              {personalContent.location && (
                <div>{personalContent.location}</div>
              )}
            </div>
            {personalContent.website && (
              <div className="mt-1 text-sm text-blue-600">
                {personalContent.website}
              </div>
            )}
          </div>
        );

      case "summary":
        // Get summary content
        let summaryContent: any;
        if (Array.isArray(section.content) && section.content.length > 0) {
          summaryContent = section.content[0];
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          summaryContent = section.content;
        } else {
          summaryContent = {};
        }

        return (
          <div className="mb-4">
            <p className="text-gray-700">
              {summaryContent.content ||
                summaryContent.professionalSummary ||
                "Professional summary"}
            </p>
          </div>
        );

      case "experience":
        // Ensure experience content is an array
        const experienceContent = Array.isArray(section.content)
          ? (section.content as IWorkExperienceContent[])
          : ([] as IWorkExperienceContent[]);

        return (
          <div className="space-y-4">
            {experienceContent.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {exp.position || "Position"}
                    </h3>
                    <h4 className="text-gray-700">
                      {exp.company || "Company"}
                    </h4>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <div>{exp.location || "Location"}</div>
                    <div>
                      {exp.startDate || "Start Date"} -{" "}
                      {exp.isCurrentPosition
                        ? "Present"
                        : exp.endDate || "End Date"}
                    </div>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
                {exp.achievements &&
                  Array.isArray(exp.achievements) &&
                  exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j}>{achievement}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        );

      case "education":
        // Ensure education content is an array
        const educationContent = Array.isArray(section.content)
          ? (section.content as IEducationContent[])
          : ([] as IEducationContent[]);

        return (
          <div className="space-y-4">
            {educationContent.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.institution || "Institution"}
                    </h3>
                    <h4 className="text-gray-700">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                    </h4>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <div>{edu.location || ""}</div>
                    <div>
                      {edu.startDate || "Start Date"} -{" "}
                      {edu.endDate || "End Date"}
                    </div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
                  </div>
                </div>
                {edu.achievements &&
                  Array.isArray(edu.achievements) &&
                  edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {edu.achievements.map((achievement, j) => (
                        <li key={j}>{achievement}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        );

      case "skills":
        // Get skills content
        let skillsContent: ISkillContent;
        if (Array.isArray(section.content) && section.content.length > 0) {
          skillsContent = section.content[0] as ISkillContent;
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          skillsContent = section.content as unknown as ISkillContent;
        } else {
          skillsContent = {
            technical: [],
            soft: [],
            languages: [],
          } as ISkillContent;
        }

        return (
          <div>
            {skillsContent.technical &&
              Array.isArray(skillsContent.technical) &&
              skillsContent.technical.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsContent.technical.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {skillsContent.soft &&
              Array.isArray(skillsContent.soft) &&
              skillsContent.soft.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsContent.soft.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {skillsContent.languages &&
              Array.isArray(skillsContent.languages) &&
              skillsContent.languages.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsContent.languages.map((language, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        );

      case "projects":
        // Ensure projects content is an array
        const projectsContent = Array.isArray(section.content)
          ? (section.content as IProjectContent[])
          : ([] as IProjectContent[]);

        return (
          <div className="space-y-4">
            {projectsContent.map((project, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {project.title || "Project Title"}
                    </h3>
                    {project.role && (
                      <h4 className="text-gray-700">{project.role}</h4>
                    )}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-right text-gray-600 text-sm">
                      {project.startDate || ""} - {project.endDate || "Present"}
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-gray-700">{project.description}</p>
                )}
                {project.technologies &&
                  Array.isArray(project.technologies) &&
                  project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Technologies:{" "}
                      </span>
                      <span className="text-sm text-gray-700">
                        {project.technologies.join(", ")}
                      </span>
                    </div>
                  )}
                {project.url && (
                  <div className="mt-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Project Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-gray-500 italic">
            Content for this section type is not yet supported in preview
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-white p-8 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Personal section always at the top */}
        {personalSection && personalSection.enabled && (
          <div className="mb-6">{renderSectionContent(personalSection)}</div>
        )}

        {/* Summary section */}
        {summarySection && summarySection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {summarySection.title}
            </h2>
            {renderSectionContent(summarySection)}
          </div>
        )}

        {/* Experience section */}
        {experienceSection && experienceSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {experienceSection.title}
            </h2>
            {renderSectionContent(experienceSection)}
          </div>
        )}

        {/* Education section */}
        {educationSection && educationSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {educationSection.title}
            </h2>
            {renderSectionContent(educationSection)}
          </div>
        )}

        {/* Skills section */}
        {skillsSection && skillsSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {skillsSection.title}
            </h2>
            {renderSectionContent(skillsSection)}
          </div>
        )}

        {/* Projects section */}
        {projectsSection && projectsSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {projectsSection.title}
            </h2>
            {renderSectionContent(projectsSection)}
          </div>
        )}

        {/* Certifications section */}
        {certificationsSection && certificationsSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {certificationsSection.title}
            </h2>
            {renderSectionContent(certificationsSection)}
          </div>
        )}

        {/* Awards section */}
        {awardsSection && awardsSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {awardsSection.title}
            </h2>
            {renderSectionContent(awardsSection)}
          </div>
        )}

        {/* Other sections that don't have special handling */}
        {resume.sections
          .filter(
            (s) =>
              s.enabled &&
              ![
                "personal",
                "summary",
                "experience",
                "education",
                "skills",
                "projects",
                "certifications",
                "awards",
              ].includes(s.type)
          )
          .map((section) => (
            <div key={section._id} className="mb-6">
              <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
                {section.title}
              </h2>
              {renderSectionContent(section)}
            </div>
          ))}
      </div>
    </div>
  );
}

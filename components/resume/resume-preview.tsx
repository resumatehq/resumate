"use client";

import {
  IResume,
  IResumeSection,
  IPersonalInfoContent,
  IWorkExperienceContent,
  IEducationContent,
  ISkillContent,
  IProjectContent,
  IAwardContent,
  ICertificationContent,
  IPublicationContent,
  ILanguageContent,
  IInterestsContent,
  IVolunteerContent,
  ICustomSectionContent,
} from "@/schemas/resume.schema";

interface ResumePreviewProps {
  resume: IResume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  if (!resume) {
    return <div>Loading...</div>;
  }

  // Ensure resume.sections exists and is an array
  if (!resume.sections || !Array.isArray(resume.sections)) {
    return <div>No sections available</div>;
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

  // Helper function to safely get content
  const getSafeContent = (content: any) => {
    if (!content) return null;
    if (typeof content === "string") return content;
    if (typeof content === "object" && content !== null) {
      // Check if it's an object with category and skills
      if (content.category && content.skills) {
        return `${content.category}: ${
          Array.isArray(content.skills)
            ? content.skills.join(", ")
            : content.skills
        }`;
      }
    }
    return content;
  };

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
              {getSafeContent(summaryContent.content) ||
                getSafeContent(summaryContent.professionalSummary) ||
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
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(exp.description)}
                  </p>
                )}
                {exp.achievements &&
                  Array.isArray(exp.achievements) &&
                  exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {exp.achievements.map((achievement, j) => (
                        <li key={j}>{getSafeContent(achievement)}</li>
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
                      {edu.institution || edu.school || "Institution"}
                    </h3>
                    <h4 className="text-gray-700">
                      {edu.degree || "Degree"}
                      {edu.fieldOfStudy || edu.field
                        ? `, ${edu.fieldOfStudy || edu.field}`
                        : ""}
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
                        <li key={j}>{getSafeContent(achievement)}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        );

      case "skills":
        // Get skills content
        let skillsContent: ISkillContent | any;
        if (Array.isArray(section.content) && section.content.length > 0) {
          skillsContent = section.content[0];
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          skillsContent = section.content;
        } else {
          skillsContent = { technical: [], soft: [], languages: [] };
        }

        // Handle different possible formats of skills data
        let technicalSkills: string[] = [];
        let softSkills: string[] = [];
        let languageSkills: string[] = [];

        // Format 1: {technical: [], soft: [], languages: []}
        if (Array.isArray(skillsContent.technical)) {
          technicalSkills = skillsContent.technical;
        }
        if (Array.isArray(skillsContent.soft)) {
          softSkills = skillsContent.soft;
        }
        if (Array.isArray(skillsContent.languages)) {
          languageSkills = skillsContent.languages;
        }

        // Format 2: {skills: [{category: "Technical", items: []}, ...]}
        if (skillsContent.skills && Array.isArray(skillsContent.skills)) {
          skillsContent.skills.forEach((skillGroup: any) => {
            if (
              skillGroup.category &&
              skillGroup.items &&
              Array.isArray(skillGroup.items)
            ) {
              const category = skillGroup.category.toLowerCase();
              if (category.includes("technical")) {
                technicalSkills = [...technicalSkills, ...skillGroup.items];
              } else if (category.includes("soft")) {
                softSkills = [...softSkills, ...skillGroup.items];
              } else if (category.includes("language")) {
                languageSkills = [...languageSkills, ...skillGroup.items];
              } else {
                // Default to technical if unknown
                technicalSkills = [...technicalSkills, ...skillGroup.items];
              }
            }
          });
        }

        return (
          <div>
            {technicalSkills.length > 0 && (
              <div className="mb-3">
                <h3 className="font-semibold mb-1">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {typeof skill === "string"
                        ? skill
                        : JSON.stringify(skill)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {softSkills.length > 0 && (
              <div className="mb-3">
                <h3 className="font-semibold mb-1">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {typeof skill === "string"
                        ? skill
                        : JSON.stringify(skill)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languageSkills.length > 0 && (
              <div className="mb-3">
                <h3 className="font-semibold mb-1">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languageSkills.map((language, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {typeof language === "string"
                        ? language
                        : JSON.stringify(language)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {technicalSkills.length === 0 &&
              softSkills.length === 0 &&
              languageSkills.length === 0 && (
                <div className="text-gray-500 italic">No skills added yet</div>
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
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(project.description)}
                  </p>
                )}
                {project.technologies &&
                  Array.isArray(project.technologies) &&
                  project.technologies.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Technologies:{" "}
                      </span>
                      <span className="text-sm text-gray-700">
                        {project.technologies
                          .map((tech) =>
                            typeof tech === "string"
                              ? tech
                              : JSON.stringify(tech)
                          )
                          .join(", ")}
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

      case "awards":
        // Ensure awards content is an array
        const awardsContent = Array.isArray(section.content)
          ? (section.content as IAwardContent[])
          : ([] as IAwardContent[]);

        return (
          <div className="space-y-4">
            {awardsContent.map((award, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {award.title || "Award Title"}
                    </h3>
                    <h4 className="text-gray-700">
                      {award.issuingOrganization || "Organization"}
                    </h4>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    {award.dateReceived || "Date"}
                  </div>
                </div>
                {award.description && (
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(award.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        );

      case "publications":
        // Ensure publications content is an array
        const publicationsContent = Array.isArray(section.content)
          ? (section.content as IPublicationContent[])
          : ([] as IPublicationContent[]);

        return (
          <div className="space-y-4">
            {publicationsContent.map((publication, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {publication.title || "Publication Title"}
                    </h3>
                    <h4 className="text-gray-700">
                      {publication.publisher || "Publisher"}
                    </h4>
                    {publication.authors &&
                      Array.isArray(publication.authors) && (
                        <p className="text-sm text-gray-600">
                          Authors: {publication.authors.join(", ")}
                        </p>
                      )}
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    {publication.publicationDate || "Date"}
                  </div>
                </div>
                {publication.description && (
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(publication.description)}
                  </p>
                )}
                {publication.url && (
                  <div className="mt-1">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Publication Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "languages":
        // Ensure languages content is an array
        const languagesContent = Array.isArray(section.content)
          ? (section.content as ILanguageContent[])
          : ([] as ILanguageContent[]);

        return (
          <div className="space-y-2">
            {languagesContent.map((language, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div>
                  <span className="font-medium">
                    {language.language || "Language"}
                  </span>
                </div>
                <div className="text-gray-600">
                  {language.proficiency || "Proficiency"}
                </div>
                {language.certifications &&
                  Array.isArray(language.certifications) &&
                  language.certifications.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {language.certifications.join(", ")}
                    </div>
                  )}
              </div>
            ))}
          </div>
        );

      case "interests":
        // Get interests content
        let interestsContent: IInterestsContent;
        if (Array.isArray(section.content) && section.content.length > 0) {
          interestsContent = section.content[0] as IInterestsContent;
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          interestsContent = section.content as unknown as IInterestsContent;
        } else {
          interestsContent = {} as IInterestsContent;
        }

        const professionalInterests = Array.isArray(
          interestsContent.professional
        )
          ? interestsContent.professional
          : [];

        const personalInterests = Array.isArray(interestsContent.personal)
          ? interestsContent.personal
          : [];

        return (
          <div className="space-y-4">
            {professionalInterests.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Professional Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {professionalInterests.map((interest, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {personalInterests.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Personal Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {personalInterests.map((interest, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "volunteer":
        // Ensure volunteer content is an array
        const volunteerContent = Array.isArray(section.content)
          ? (section.content as IVolunteerContent[])
          : ([] as IVolunteerContent[]);

        return (
          <div className="space-y-4">
            {volunteerContent.map((volunteer, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {volunteer.organization || "Organization"}
                    </h3>
                    <h4 className="text-gray-700">
                      {volunteer.role || "Role"}
                    </h4>
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <div>{volunteer.location || ""}</div>
                    <div>
                      {volunteer.startDate || "Start Date"} -{" "}
                      {volunteer.endDate || "Present"}
                    </div>
                  </div>
                </div>
                {volunteer.description && (
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(volunteer.description)}
                  </p>
                )}
                {volunteer.achievements &&
                  Array.isArray(volunteer.achievements) &&
                  volunteer.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {volunteer.achievements.map((achievement, j) => (
                        <li key={j}>{getSafeContent(achievement)}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        );

      case "custom":
        // Handle custom section content
        let customContent: ICustomSectionContent;
        if (Array.isArray(section.content) && section.content.length > 0) {
          customContent = section.content[0] as ICustomSectionContent;
        } else if (
          typeof section.content === "object" &&
          section.content !== null
        ) {
          customContent = section.content as unknown as ICustomSectionContent;
        } else {
          customContent = {} as ICustomSectionContent;
        }

        // Handle sections array if it exists
        if (customContent.sections && Array.isArray(customContent.sections)) {
          return (
            <div className="space-y-6">
              {customContent.sections.map((subsection, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold mb-2">
                    {subsection.title || "Section"}
                  </h3>

                  {Array.isArray(subsection.items) && (
                    <div className="space-y-2">
                      {subsection.items.map(
                        (item: string | Record<string, any>, j: number) => (
                          <div key={j} className="text-gray-700">
                            {typeof item === "string" ? (
                              <div>{item}</div>
                            ) : (
                              <div className="mb-2">
                                {item.title && (
                                  <div className="font-medium">
                                    {item.title}
                                  </div>
                                )}
                                {item.event && (
                                  <div className="font-medium">
                                    {item.event}
                                  </div>
                                )}
                                {item.topic && <div>{item.topic}</div>}
                                {item.date && (
                                  <div className="text-sm text-gray-600">
                                    {item.date}
                                  </div>
                                )}
                                {item.patentNumber && (
                                  <div className="text-sm">
                                    Patent: {item.patentNumber} (
                                    {item.status || "Filed"})
                                  </div>
                                )}
                                {item.filingDate && (
                                  <div className="text-sm text-gray-600">
                                    Filed: {item.filingDate}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }

        // Fallback for other custom content formats
        return (
          <div className="text-gray-700">
            {typeof customContent === "string"
              ? customContent
              : "Custom section content"}
          </div>
        );

      case "certifications":
        // Ensure certifications content is an array
        const certificationsContent = Array.isArray(section.content)
          ? (section.content as ICertificationContent[])
          : ([] as ICertificationContent[]);

        return (
          <div className="space-y-4">
            {certificationsContent.map((cert, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {cert.name || "Certification"}
                    </h3>
                    <h4 className="text-gray-700">
                      {cert.issuingOrganization || "Organization"}
                    </h4>
                    {cert.credentialId && (
                      <p className="text-sm text-gray-600">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <div>Issued: {cert.issueDate || "Date"}</div>
                    {cert.expiryDate && <div>Expires: {cert.expiryDate}</div>}
                  </div>
                </div>
                {cert.description && (
                  <p className="mt-2 text-gray-700">
                    {getSafeContent(cert.description)}
                  </p>
                )}
                {cert.credentialUrl && (
                  <div className="mt-1">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Verify Credential
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

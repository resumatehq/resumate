"use client";

import {
  IResume,
  IResumeSection,
  IPersonalInfoContent,
  IWorkExperienceContent,
  IEducationContent,
  ISkillContent,
  IProjectContent,
  ICertificationContent,
  IAwardContent,
  ILanguageContent,
  IInterestContent,
  IVolunteerContent,
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
  const languagesSection = resume.sections.find((s) => s.type === "languages");
  const interestsSection = resume.sections.find((s) => s.type === "interests");
  const volunteerSection = resume.sections.find((s) => s.type === "volunteer");

  // Helper function to render section content based on type
  const renderSectionContent = (section: IResumeSection) => {
    if (!section.content) {
      return null;
    }

    switch (section.type) {
      case "personal":
        return renderPersonalInfo(section.content as IPersonalInfoContent);
      case "summary":
        const summaryContent = section.content as unknown as {
          summary: string;
          highlights: string[];
        };
        return renderSummary(summaryContent);
      case "experience":
        try {
          const experienceContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderExperience(
            experienceContent as IWorkExperienceContent[]
          );
        } catch (error) {
          console.error("Error rendering experience section:", error);
          return (
            <div>There was an error displaying the experience section</div>
          );
        }
      case "education":
        try {
          const educationContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderEducation(educationContent as IEducationContent[]);
        } catch (error) {
          console.error("Error rendering education section:", error);
          return <div>There was an error displaying the education section</div>;
        }
      case "skills":
        try {
          console.log(
            "Skills content:",
            JSON.stringify(section.content, null, 2)
          );

          // Handle the complex skills format from the JSON example
          if (
            section.content &&
            typeof section.content === "object" &&
            "technical" in section.content &&
            Array.isArray(section.content.technical)
          ) {
            console.log("Using complex skills format");
            return renderComplexSkillsFormat(section.content);
          }

          console.log("Using standard skills format");
          // Standard ISkillContent format as a fallback
          const skillsContent = Array.isArray(section.content)
            ? section.content[0]
            : section.content;
          return renderSkills(skillsContent as ISkillContent);
        } catch (error) {
          console.error("Error rendering skills section:", error);
          return <div>There was an error displaying the skills section</div>;
        }
      case "projects":
        try {
          const projectsContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderProjects(projectsContent as IProjectContent[]);
        } catch (error) {
          console.error("Error rendering projects section:", error);
          return <div>There was an error displaying the projects section</div>;
        }
      case "certifications":
        try {
          const certificationsContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderCertifications(
            certificationsContent as ICertificationContent[]
          );
        } catch (error) {
          console.error("Error rendering certifications section:", error);
          return (
            <div>There was an error displaying the certifications section</div>
          );
        }
      case "awards":
        try {
          const awardsContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderAwards(awardsContent as IAwardContent[]);
        } catch (error) {
          console.error("Error rendering awards section:", error);
          return <div>There was an error displaying the awards section</div>;
        }
      case "languages":
        try {
          const languagesContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderLanguages(languagesContent as ILanguageContent[]);
        } catch (error) {
          console.error("Error rendering languages section:", error);
          return <div>There was an error displaying the languages section</div>;
        }
      case "interests":
        try {
          const interestsContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderInterests(interestsContent as IInterestContent[]);
        } catch (error) {
          console.error("Error rendering interests section:", error);
          return <div>There was an error displaying the interests section</div>;
        }
      case "volunteer":
        try {
          const volunteerContent = Array.isArray(section.content)
            ? section.content
            : [section.content];
          return renderVolunteer(volunteerContent as IVolunteerContent[]);
        } catch (error) {
          console.error("Error rendering volunteer section:", error);
          return <div>There was an error displaying the volunteer section</div>;
        }
      default:
        return renderCustomSection(section);
    }
  };

  const renderPersonalInfo = (personalInfo: IPersonalInfoContent) => {
    return (
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          {personalInfo.fullName || "Full Name"}
        </h1>
        <p className="text-lg text-gray-600">
          {personalInfo.jobTilte || personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex items-center justify-center mt-2 space-x-4 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
        {personalInfo.website && (
          <div className="mt-1 text-sm text-blue-600">
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {personalInfo.website}
            </a>
          </div>
        )}
        {personalInfo.socialLinks && (
          <div className="flex items-center justify-center mt-2 space-x-4">
            {personalInfo.socialLinks.linkedin && (
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.socialLinks.github && (
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                GitHub
              </a>
            )}
            {personalInfo.socialLinks.twitter && (
              <a
                href={personalInfo.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Twitter
              </a>
            )}
            {personalInfo.socialLinks.medium && (
              <a
                href={personalInfo.socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:underline"
              >
                Medium
              </a>
            )}
          </div>
        )}
        {personalInfo.professionalSummary && (
          <div className="mt-4 text-gray-700">
            <p>{personalInfo.professionalSummary}</p>
          </div>
        )}
      </div>
    );
  };

  const renderSummary = (summary: {
    summary: string;
    highlights: string[];
  }) => {
    return (
      <div className="mb-4">
        {summary.summary && (
          <p className="text-gray-700 mb-4">{summary.summary}</p>
        )}
        {summary.highlights && summary.highlights.length > 0 && (
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {summary.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderExperience = (experience: IWorkExperienceContent[]) => {
    return (
      <div className="space-y-4">
        {experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{exp.position || "Position"}</h3>
                <h4 className="text-gray-700">{exp.company || "Company"}</h4>
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
  };

  const renderEducation = (education: IEducationContent[]) => {
    return (
      <div className="space-y-4">
        {education.map((edu, i) => (
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
                  {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
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
  };

  const renderSkills = (skills: ISkillContent) => {
    if (!skills) return null;

    const technicalSkills = skills.technical || [];
    const softSkills = skills.soft || [];
    const languages = skills.languages || [];

    return (
      <div>
        {technicalSkills.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold mb-1">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {skill}
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
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold mb-1">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProjects = (projects: IProjectContent[]) => {
    return (
      <div className="space-y-4">
        {projects.map((project, i) => (
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
                  <span className="text-sm font-medium">Technologies: </span>
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
  };

  const renderCertifications = (certifications: ICertificationContent[]) => {
    return (
      <div className="space-y-4">
        {certifications.map((cert, i) => (
          <div key={i} className="space-y-2">
            <div className="font-medium">{cert.title}</div>
            {cert.issuingOrganization && (
              <div className="text-gray-600">{cert.issuingOrganization}</div>
            )}
            {cert.issueDate && (
              <div className="text-gray-600">{cert.issueDate}</div>
            )}
            {cert.expirationDate && (
              <div className="text-gray-600">{cert.expirationDate}</div>
            )}
            {cert.credentialID && (
              <div className="text-gray-600">{cert.credentialID}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAwards = (awards: IAwardContent[]) => {
    return (
      <div className="space-y-4">
        {awards.map((award, i) => (
          <div key={i} className="space-y-2">
            <div className="font-medium">{award.title}</div>
            {award.issuingOrganization && (
              <div className="text-gray-600">{award.issuingOrganization}</div>
            )}
            {award.year && <div className="text-gray-600">{award.year}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguages = (languages: ILanguageContent[]) => {
    if (!languages || !Array.isArray(languages) || languages.length === 0) {
      return null;
    }

    return (
      <div className="space-y-2">
        {languages.map((lang, index) => {
          // Handle different possible formats of language data
          if (typeof lang === "object") {
            // If it's an object with language and proficiency properties
            if ("language" in lang && "proficiency" in lang) {
              return (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
              );
            }
            // If it's some other object format, render a fallback
            return (
              <div key={index} className="text-gray-600">
                {JSON.stringify(lang)}
              </div>
            );
          }
          // If it's a simple string
          return (
            <div key={index} className="font-medium">
              {String(lang)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderInterests = (interests: IInterestContent[]) => {
    if (!Array.isArray(interests)) {
      return null;
    }

    return (
      <div className="space-y-2">
        {interests.map((interest, index) => (
          <div key={index}>
            <div className="font-medium">{interest.interest}</div>
            {interest.description && (
              <div className="text-sm text-gray-600">
                {interest.description}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderVolunteer = (volunteer: IVolunteerContent[]) => {
    return (
      <div className="space-y-4">
        {volunteer.map((exp, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{exp.role}</div>
                <div className="text-gray-600">{exp.organization}</div>
              </div>
              <div className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
            </div>
            {exp.description && (
              <div className="text-sm">{exp.description}</div>
            )}
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCustomSection = (section: IResumeSection) => {
    return (
      <div className="text-gray-500 italic">
        Content for this section type is not yet supported in preview
      </div>
    );
  };

  // Function to render the complex skills format from the JSON
  const renderComplexSkillsFormat = (content: any) => {
    console.log("Complex skills content:", JSON.stringify(content, null, 2));

    if (!content || !content.technical || !Array.isArray(content.technical)) {
      console.log("Invalid technical skills data");
      return null;
    }

    return (
      <div>
        {content.technical.map((skillCategory: any, i: number) => {
          console.log("Processing skill category:", skillCategory);

          if (
            !skillCategory ||
            typeof skillCategory !== "object" ||
            !skillCategory.category ||
            !skillCategory.skills
          ) {
            console.log("Invalid skill category:", skillCategory);
            return null;
          }

          return (
            <div key={i} className="mb-3">
              <h3 className="font-semibold mb-1">{skillCategory.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.skills &&
                  Array.isArray(skillCategory.skills) &&
                  skillCategory.skills.map((skill: string, j: number) => (
                    <span
                      key={j}
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}

        {/* Render soft skills if they exist */}
        {content.soft &&
          Array.isArray(content.soft) &&
          content.soft.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold mb-1">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {content.soft.map((skill: string, i: number) => (
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

        {/* Render languages section if it exists */}
        {content.languages &&
          Array.isArray(content.languages) &&
          content.languages.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold mb-1">Languages</h3>
              <div className="space-y-2">
                {content.languages.map((lang: any, i: number) => {
                  if (
                    typeof lang === "object" &&
                    lang !== null &&
                    "language" in lang &&
                    "proficiency" in lang
                  ) {
                    return (
                      <div key={i} className="flex justify-between">
                        <span className="font-medium">{lang.language}</span>
                        <span className="text-gray-600">
                          {lang.proficiency}
                        </span>
                      </div>
                    );
                  } else if (typeof lang === "string") {
                    return (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {lang}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="max-w-[850px] mx-auto bg-white p-8 shadow-lg">
      <div className="space-y-6">
        {/* Personal Info section */}
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

        {/* Languages section */}
        {languagesSection && languagesSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {languagesSection.title}
            </h2>
            {renderSectionContent(languagesSection)}
          </div>
        )}

        {/* Interests section */}
        {interestsSection && interestsSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {interestsSection.title}
            </h2>
            {renderSectionContent(interestsSection)}
          </div>
        )}

        {/* Volunteer section */}
        {volunteerSection && volunteerSection.enabled && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-1 border-b border-gray-300">
              {volunteerSection.title}
            </h2>
            {renderSectionContent(volunteerSection)}
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
                "languages",
                "interests",
                "volunteer",
                "publications",
                "custom",
              ].includes(s.type) &&
              s.title !== "Publications" &&
              s.title !== "Additional Information"
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

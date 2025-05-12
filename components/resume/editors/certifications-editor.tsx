"use client";

import { useResume } from "@/context/resume-context";
import { IResumeSection, ICertificationContent } from "@/schemas/resume.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface CertificationsEditorProps {
  section: IResumeSection;
}

export function CertificationsEditor({ section }: CertificationsEditorProps) {
  const { updateSectionContent } = useResume();

  // Ensure content is always an array
  const content = Array.isArray(section.content)
    ? (section.content as ICertificationContent[])
    : [];

  // Initialize content if it's empty
  useEffect(() => {
    if (
      !section.content ||
      !Array.isArray(section.content) ||
      section.content.length === 0
    ) {
      const initialCertification: ICertificationContent = {
        name: "",
        issuingOrganization: "",
        issueDate: "",
        credentialUrl: "",
        description: "",
      };
      updateSectionContent(section._id!, [initialCertification]);
    }
  }, [section._id, section.content, updateSectionContent]);

  const handleChange = (
    index: number,
    field: keyof ICertificationContent,
    value: string
  ) => {
    const updatedContent = [...content];
    updatedContent[index] = {
      ...updatedContent[index],
      [field]: value,
    };
    updateSectionContent(section._id!, updatedContent);
  };

  const handleAddCertification = () => {
    const newCertification: ICertificationContent = {
      name: "",
      issuingOrganization: "",
      issueDate: "",
      credentialUrl: "",
      description: "",
    };
    updateSectionContent(section._id!, [...content, newCertification]);
  };

  const handleRemoveCertification = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    updateSectionContent(section._id!, updatedContent);
  };

  // If content is still empty after initialization attempt, show a loading state
  if (content.length === 0) {
    return (
      <div className="space-y-4">
        <Button onClick={handleAddCertification} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add First Certification
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.map((certification, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Certification {index + 1}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCertification(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`name-${index}`}>Certification Name</Label>
            <Input
              id={`name-${index}`}
              value={certification.name || ""}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`organization-${index}`}>
              Issuing Organization
            </Label>
            <Input
              id={`organization-${index}`}
              value={certification.issuingOrganization || ""}
              onChange={(e) =>
                handleChange(index, "issuingOrganization", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`issueDate-${index}`}>Issue Date</Label>
            <Input
              id={`issueDate-${index}`}
              type="month"
              value={certification.issueDate || ""}
              onChange={(e) => handleChange(index, "issueDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`credentialUrl-${index}`}>Credential URL</Label>
            <Input
              id={`credentialUrl-${index}`}
              value={certification.credentialUrl || ""}
              onChange={(e) =>
                handleChange(index, "credentialUrl", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description</Label>
            <Textarea
              id={`description-${index}`}
              value={certification.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button onClick={handleAddCertification} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}

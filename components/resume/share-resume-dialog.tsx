"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useGetResumeByIdQuery } from "@/queries/useResume";
import resumeApiRequest from "@/apiRequest/resume.api";
import type { ShareResumeType } from "@/schemas/resume.schema";

interface ShareResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string;
}

export function ShareResumeDialog({
  isOpen,
  onClose,
  resumeId,
}: ShareResumeDialogProps) {
  const [expiryDays, setExpiryDays] = useState("30");
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowFeedback, setAllowFeedback] = useState(true);
  const [allowEmbed, setAllowEmbed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const { refetch } = useGetResumeByIdQuery(resumeId);

  const handleShare = async () => {
    try {
      setIsLoading(true);

      const shareData: ShareResumeType = {
        expiresAt: new Date(
          Date.now() + parseInt(expiryDays) * 24 * 60 * 60 * 1000
        ).toISOString(),
        allowDownload,
        allowFeedback,
        allowEmbed,
      };

      const response = await resumeApiRequest.createShareResume(
        resumeId,
        shareData
      );

      if (response.payload?.data?.shareableLink) {
        setShareableLink(response.payload.data.shareableLink);
        toast({
          title: "Success",
          description: "Resume shared successfully",
        });
        refetch();
      } else {
        throw new Error("Failed to get shareable link");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to share resume",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast({
        title: "Success",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy link",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Resume</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="expiryDays">Expiry Days</Label>
            <Input
              id="expiryDays"
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              min="1"
              max="365"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allowDownload">Allow Download</Label>
            <Switch
              id="allowDownload"
              checked={allowDownload}
              onCheckedChange={setAllowDownload}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allowFeedback">Allow Feedback</Label>
            <Switch
              id="allowFeedback"
              checked={allowFeedback}
              onCheckedChange={setAllowFeedback}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allowEmbed">Allow Embed</Label>
            <Switch
              id="allowEmbed"
              checked={allowEmbed}
              onCheckedChange={setAllowEmbed}
            />
          </div>
          {shareableLink && (
            <div className="grid gap-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input value={shareableLink} readOnly />
                <Button onClick={copyToClipboard} variant="outline">
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={isLoading}>
            {isLoading ? "Sharing..." : "Share"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

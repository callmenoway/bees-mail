"use client";

import { useState, useRef } from "react";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AvatarCropper } from "@/components/avatar-cropper";
import {
  Upload,
  User,
  Shield,
  Smartphone,
  Lock,
  Camera,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import trpc from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { TwoFactorSetup } from "@/components/two-factor-setup";

interface AccountSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userEmail: string;
  currentAvatar?: string | null;
}

export function AccountSettings({
  open,
  onOpenChange,
  userId,
  userEmail,
  currentAvatar,
}: AccountSettingsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(currentAvatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, update: updateSession } = useSession();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  React.useEffect(() => {
    setAvatarPreviewUrl(currentAvatar || null);
  }, [currentAvatar]);

  React.useEffect(() => {
    if (open && userId) {
      fetchTwoFactorStatus();
    }
  }, [open, userId]);

  const fetchTwoFactorStatus = async () => {
    if (!userId) {
      setIsLoadingStatus(false);
      return;
    }
    
    try {
      setIsLoadingStatus(true);
      const result = await trpc.twoFactor.getStatus.query({ userId });
      setTwoFactorEnabled(result.enabled);
    } catch (err) {
      setTwoFactorEnabled(false);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const username = userEmail.split(":")[0];
  const domain = userEmail.split(":")[1];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError("Please select a JPG, PNG, or WebP image");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
      }
    };
    reader.onerror = () => {
      setError("Failed to load image");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (blob: Blob) => {
    setSelectedImage(null);
    setIsUploading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
      const result = await trpc.user.updateAvatar.mutate({
        userId,
        image: base64,
      });

      console.log('[Account Settings] Upload result:', result);

      if (result.success) {
        setAvatarPreviewUrl(result.image);
        setSuccess("Avatar updated successfully!");
        
        console.log('[Account Settings] Updating session with image:', result.image);
        
        await updateSession();
        
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancelCrop = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-bold">Account Settings</DialogTitle>
          <DialogDescription>
            Manage your account preferences and security settings
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Avatar Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold">Profile Picture</h3>
              </div>
              
              {selectedImage ? (
                <AvatarCropper
                  image={selectedImage}
                  onCropComplete={handleCropComplete}
                  onCancel={handleCancelCrop}
                />
              ) : (
                <div className="flex items-center gap-6 p-4 rounded-lg border bg-card">
                  <Avatar className="h-24 w-24 border-2 border-amber-500">
                    <AvatarImage src={avatarPreviewUrl || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white text-3xl font-bold">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Upload a profile picture (max 5MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Username Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold">Username</h3>
                <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
              </div>
              <div className="space-y-2 opacity-50 pointer-events-none">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={username}
                    disabled
                    className="flex-1"
                  />
                  <Input
                    value={`:${domain}`}
                    disabled
                    className="w-32"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your full email address: {userEmail}
                </p>
              </div>
            </div>

            <Separator />

            {/* Two-Factor Authentication Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
              </div>
              {isLoadingStatus ? (
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-sm text-muted-foreground">Loading 2FA status...</p>
                </div>
              ) : (
                <TwoFactorSetup
                  userId={userId}
                  isEnabled={twoFactorEnabled}
                  onStatusChange={fetchTwoFactorStatus}
                />
              )}
            </div>

            <Separator />

            {/* SMS OTP Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold">SMS Verification</h3>
                <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
              </div>
              <div className="p-4 rounded-lg border bg-card opacity-50 pointer-events-none">
                <p className="text-sm text-muted-foreground mb-3">
                  Receive one-time passwords via SMS for additional security
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="+1 (555) 000-0000"
                    disabled
                    className="flex-1"
                  />
                  <Button variant="outline" disabled>
                    Add Phone
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

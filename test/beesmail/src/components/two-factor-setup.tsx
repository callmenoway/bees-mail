"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import trpc from "@/utils/trpc";
import Image from "next/image";

interface TwoFactorSetupProps {
  userId: string;
  isEnabled: boolean;
  onStatusChange: () => void;
}

export function TwoFactorSetup({ userId, isEnabled, onStatusChange }: TwoFactorSetupProps) {
  const [step, setStep] = useState<"initial" | "setup" | "verify" | "disable">("initial");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSecret = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await trpc.twoFactor.generateSecret.mutate({ userId });
      
      if (result.success) {
        setQrCode(result.qrCode);
        setSecret(result.secret);
        setStep("setup");
      }
    } catch (err) {
      setError("Failed to generate 2FA secret");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otpValue.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await trpc.twoFactor.verifyAndEnable.mutate({
        userId,
        token: otpValue,
      });

      if (result.success) {
        setSuccess("2FA enabled successfully!");
        setStep("initial");
        setQrCode(null);
        setSecret(null);
        setOtpValue("");
        onStatusChange();
        
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      setOtpValue("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (otpValue.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await trpc.twoFactor.disable.mutate({
        userId,
        token: otpValue,
      });

      if (result.success) {
        setSuccess("2FA disabled successfully");
        setStep("initial");
        setOtpValue("");
        onStatusChange();
        
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      setOtpValue("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setStep("initial");
    setQrCode(null);
    setSecret(null);
    setOtpValue("");
    setError(null);
  };

  if (step === "setup" && qrCode && secret) {
    return (
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-4">
          <h4 className="font-semibold">Scan this QR code with your authenticator app</h4>
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <Image src={qrCode} alt="2FA QR Code" width={200} height={200} />
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Or enter this secret manually:</p>
            <code className="text-sm font-mono break-all">{secret}</code>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => setStep("verify")}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
            >
              Next: Verify Code
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="w-full mt-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-4">
          <h4 className="font-semibold">Enter the 6-digit code from your app</h4>
          
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleVerifyCode}
              disabled={otpValue.length !== 6 || isLoading}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
            >
              {isLoading ? "Verifying..." : "Enable 2FA"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "disable") {
    return (
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-4">
          <h4 className="font-semibold">Enter your 6-digit code to disable 2FA</h4>
          
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDisable2FA}
              disabled={otpValue.length !== 6 || isLoading}
              variant="destructive"
              className="flex-1"
            >
              {isLoading ? "Disabling..." : "Disable 2FA"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Initial state
  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${isEnabled ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Shield className={`h-5 w-5 ${isEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              {isEnabled && (
                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                  Enabled
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {isEnabled 
                ? "Your account is protected with 2FA. You'll need your authenticator app to sign in."
                : "Add an extra layer of security to your account with time-based one-time passwords (TOTP)."}
            </p>
            
            {isEnabled ? (
              <Button
                variant="outline"
                onClick={() => setStep("disable")}
                disabled={isLoading}
                className="w-full"
              >
                Disable 2FA
              </Button>
            ) : (
              <Button
                onClick={handleGenerateSecret}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
              >
                <Shield className="mr-2 h-4 w-4" />
                {isLoading ? "Generating..." : "Enable 2FA"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

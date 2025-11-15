"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface CodeSnippetProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  className?: string;
  wrapped?: boolean;
}

export function CodeSnippet({
  code,
  language = "typescript",
  showLineNumbers = true,
  title,
  className = "",
  wrapped = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Evita flash durante il caricamento
  if (!mounted) {
    return null;
  }

  const content = (
    <>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
          <span className="text-sm font-medium">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute top-2 right-2 h-8 px-2 z-10"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: "0.875rem",
            padding: "1rem",
            backgroundColor: "transparent",
          }}
          wrapLongLines={true}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </>
  );

  if (!wrapped) {
    return content;
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      {content}
    </Card>
  );
}

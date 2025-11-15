"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Inbox,
  Send,
  Archive,
  Trash2,
  Star,
  AlertCircle,
  Tag,
  Settings,
  PenSquare,
  LogOut,
  ChevronDown,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { AccountSettings } from "@/components/account-settings";

// Mock data per le email
const mockEmails = [
  {
    id: 1,
    from: "john:beesmail",
    subject: "Welcome to BeesMail!",
    preview: "Thanks for joining us. Here's how to get started with the Honeycomb Protocol...",
    date: "10:30 AM",
    read: false,
    starred: true,
    tags: ["important"],
  },
  {
    id: 2,
    from: "sarah:techcorp",
    subject: "Project Update - Q4 2025",
    preview: "Hi team, I wanted to share the latest updates on our Q4 roadmap...",
    date: "Yesterday",
    read: true,
    starred: false,
    tags: ["work"],
  },
  {
    id: 3,
    from: "notifications:github",
    subject: "[callmenoway/bees-mail] New PR #42",
    preview: "A new pull request has been opened for your repository...",
    date: "2 days ago",
    read: true,
    starred: false,
    tags: ["github"],
  },
  {
    id: 4,
    from: "marketing:beesmail",
    subject: "🎉 Premium Features Now Available",
    preview: "Unlock custom domains and advanced features with BeesMail Premium...",
    date: "Nov 10",
    read: false,
    starred: false,
    tags: ["promotions"],
  },
];

interface MailClientProps {
  userId: string;
  userEmail: string;
  userAvatar?: string | null;
}

export function MailClient({ userId, userEmail, userAvatar }: MailClientProps) {
  const [selectedEmail, setSelectedEmail] = useState<typeof mockEmails[0] | null>(null);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const { theme, setTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const { data: session, status } = useSession();
  
  const currentAvatar = session?.user?.image;
  
  console.log('[MailClient] Session status:', status);
  console.log('[MailClient] Session avatar:', session?.user?.image);
  console.log('[MailClient] Current avatar:', currentAvatar);

  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: 2 },
    { id: "starred", label: "Starred", icon: Star, count: 1 },
    { id: "sent", label: "Sent", icon: Send, count: 0 },
    { id: "archive", label: "Archive", icon: Archive, count: 0 },
    { id: "spam", label: "Spam", icon: AlertCircle, count: 0 },
    { id: "trash", label: "Trash", icon: Trash2, count: 0 },
  ];

  const tags = [
    { id: "important", label: "Important", color: "bg-red-500" },
    { id: "work", label: "Work", color: "bg-blue-500" },
    { id: "personal", label: "Personal", color: "bg-green-500" },
    { id: "github", label: "GitHub", color: "bg-purple-500" },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="border-r shadow-lg" collapsible="icon">
          <SidebarContent>
            {/* Compose Button */}
            <div className="p-4">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700">
                <PenSquare className="mr-2 h-4 w-4" />
                Compose
              </Button>
            </div>

            <Separator />

            {/* Folders */}
            <SidebarGroup>
              <SidebarGroupLabel>Folders</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveFolder(folder.id)}
                        isActive={activeFolder === folder.id}
                        className="cursor-pointer"
                      >
                        <folder.icon className="h-4 w-4" />
                        <span>{folder.label}</span>
                        {folder.count > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100"
                          >
                            {folder.count}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Tags */}
            <SidebarGroup>
              <SidebarGroupLabel>Tags</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tags.map((tag) => (
                    <SidebarMenuItem key={tag.id}>
                      <SidebarMenuButton className="cursor-pointer">
                        <div className={cn("h-2 w-2 rounded-full", tag.color)} />
                        <span>{tag.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Settings */}
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          {/* Sidebar Footer - Profile */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentAvatar || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white font-semibold">
                          {userEmail.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">
                          {userEmail.split(":")[0]}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {userEmail}
                        </span>
                      </div>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="end" className="w-56">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute ml-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span>Toggle Theme</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 dark:text-red-400"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Email List */}
            <ResizablePanel defaultSize={selectedEmail ? 50 : 100} minSize={30}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="border-b p-4 bg-background shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SidebarTrigger className="-ml-1">
                        <Menu className="h-5 w-5" />
                      </SidebarTrigger>
                      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-400">
                        {folders.find((f) => f.id === activeFolder)?.label}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Email List */}
                <ScrollArea className="flex-1">
                  <div className="divide-y">
                    {mockEmails.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        className={cn(
                          "p-4 cursor-pointer hover:bg-accent transition-colors shadow-sm hover:shadow-md",
                          selectedEmail?.id === email.id && "bg-accent shadow-md",
                          !email.read && "bg-amber-50/50 dark:bg-amber-950/20"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white">
                              {email.from.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "font-medium truncate",
                                    !email.read && "font-bold"
                                  )}
                                >
                                  {email.from}
                                </span>
                                {email.starred && (
                                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {email.date}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "text-sm mb-1",
                                !email.read && "font-semibold"
                              )}
                            >
                              {email.subject}
                            </div>
                            <div className="text-sm text-muted-foreground truncate">
                              {email.preview}
                            </div>
                            {email.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {email.tags.map((tagId) => {
                                  const tag = tags.find((t) => t.id === tagId);
                                  return tag ? (
                                    <Badge
                                      key={tagId}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <div
                                        className={cn(
                                          "h-2 w-2 rounded-full mr-1",
                                          tag.color
                                        )}
                                      />
                                      {tag.label}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            {/* Email Detail */}
            {selectedEmail && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="flex flex-col h-full">
                    {/* Email Header */}
                    <div className="border-b p-6 bg-background shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">
                            {selectedEmail.subject}
                          </h3>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white">
                                {selectedEmail.from.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{selectedEmail.from}</div>
                              <div className="text-sm text-muted-foreground">
                                to {userEmail}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Star
                              className={cn(
                                "h-4 w-4",
                                selectedEmail.starred &&
                                  "fill-yellow-500 text-yellow-500"
                              )}
                            />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedEmail.date}
                      </div>
                    </div>

                    {/* Email Body */}
                    <ScrollArea className="flex-1">
                      <div className="p-6 prose dark:prose-invert max-w-none">
                        <p>{selectedEmail.preview}</p>
                        <p className="mt-4">
                          This is a longer email body that would contain the full
                          content of the message. The Honeycomb Protocol ensures
                          fast, secure, and reliable message delivery.
                        </p>
                        <p className="mt-4">
                          With BeesMail, you get type-safe email delivery, custom
                          domains for premium users, and seamless integration with
                          modern development workflows.
                        </p>
                        <p className="mt-4">Best regards,</p>
                        <p className="font-semibold">
                          {selectedEmail.from.split(":")[0]}
                        </p>
                      </div>
                    </ScrollArea>

                    {/* Reply Section */}
                    <div className="border-t p-4 bg-background">
                      <div className="flex gap-2">
                        <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700">
                          Reply
                        </Button>
                        <Button variant="outline">Reply All</Button>
                        <Button variant="outline">Forward</Button>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </SidebarInset>
      </div>

      {/* Account Settings Dialog */}
      <AccountSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        userId={userId}
        userEmail={userEmail}
        currentAvatar={currentAvatar}
      />
    </SidebarProvider>
  );
}

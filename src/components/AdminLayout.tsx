import { ReactNode, useEffect, useState } from "react";
import { AppSidebar } from './AppSidebar';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Bell } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName("Admin");
    }
  }, []);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "A";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <div className="bg-[#0A4338] text-white">
          <AppSidebar/>
        </div>

        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 border-b border-border bg-white px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Menu className="w-5 h-5 text-[#0A4338]" />
              </SidebarTrigger>
              <h1 className="text-2xl font-bold text-[#0A4338]">{title}</h1>
            </div>

            {/* notification */}
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer">
                <Bell className="w-5 h-5 text-[#0A4338]" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-muted rounded-full transition">
                    <Avatar>
                      <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem asChild>
                    <a href="/profile">Profile</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/settings">Settings</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("userName");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

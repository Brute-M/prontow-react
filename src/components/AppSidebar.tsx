import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Product Management", href: "/products" },
  { name: "Order Management", href: "/orders" },
  { name: "Inventory Tracking", href: "/inventory" },
  { name: "Customer Relationship", href: "/customers" },
  { name: "Games", href: "/games" },
  { name: "Payments & Settlements", href: "/payments-and-settlements" },
  { name: "Support", href: "/support" },
  { name: "Settings", href: "/settings"}
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
     <Sidebar className="border-r-0">
      <SidebarContent className="px-2 py-8">
        <div
          className={cn(
            "mb-12 flex items-center justify-center transition-all",
            open ? "gap-3" : "flex-col"
          )}
        >
          <img
            src="/src/images/Prontow-logo.png" 
            alt="Prontow Logo"
            className={cn(
              "transition-all duration-300",
              open ? "w-10 h-10" : "w-8 h-8"
            )}
          />
          <h1
            className={cn(
              "text-4xl font-bold text-white-500 transition-all",
              open ? "opacity-100" : "opacity-0 w-0"
            )}
          >
            Prontow
          </h1>
        </div>

        <SidebarGroup className="border-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-6 py-3 text-lg font-bold transition-all rounded-[20px]",
                        isActive
                          ? "bg-white text-[#119D82] shadow-sm" // Active: White background, green text
                          : "text-white hover:bg-white hover:text-[#119D82]" // Inactive: White text, changes to white bg and green text on hover
                      )
                    }
                  >
                    {open ? item.name : item.name[0]}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

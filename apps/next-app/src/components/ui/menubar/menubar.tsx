"use client"
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { cn } from "@/lib/utils"

interface MenubarProps extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> {
  className?: string;
  children?: React.ReactNode;
}

const Menubar = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Root>, MenubarProps>(
  ({ className, children, ...props }, ref) => (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn("flex bg-transparent", className)}
      {...props}
    >
      {children}
    </MenubarPrimitive.Root>
  )
)
Menubar.displayName = "Menubar"

const MenubarMenu: React.FC<{ children: React.ReactNode }> = ({ children, ...props }) => (
  <MenubarPrimitive.Menu {...props}>
    {children}
  </MenubarPrimitive.Menu>
)

const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> & { className?: string; children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {

  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex items-center px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </MenubarPrimitive.Trigger>
  );
});
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> & { className?: string }
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Content
    ref={ref}
    className={cn(
      "absolute mt-2 min-w-[150px] rounded-md bg-background p-2 shadow-md transition-all",
      className
    )}
    align="start"
    sideOffset={5}
    {...props}
  />
));
MenubarContent.displayName = "MenubarContent";

const MenubarItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn("block px-4 py-2 text-sm hover:bg-gray-100", className)}
    {...props}
  />
))
MenubarItem.displayName = "MenubarItem"

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem }

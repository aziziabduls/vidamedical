"use client";

import { useRouter } from "next/navigation";

import { LogOut, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAdmin } from "@/lib/api";
import { getInitials } from "@/lib/utils";

import { useAuthUser } from "../auth-guard";

export function AccountSwitcher() {
  const router = useRouter();
  const user = useAuthUser();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.replace("/auth/v2/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger nativeButton={false} render={<Avatar className="size-8 cursor-pointer rounded-lg" />}>
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 space-y-1 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">{user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <ShieldCheck />
          <span className="capitalize">{user.role}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

// import { useAppStore } from '@/components/app-provider'
import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Những page sau sẽ không check refesh token
const UNAUTHENTICATED_PATH = [
  "/",
  "/r",
  "/auth/login",
  "/auth/sign-up",
  "/auth/logout",
  "/refresh-token",
];

export default function RefreshToken() {
  console.log("jshdfjhsdjf123");

  const pathname = usePathname();
  const router = useRouter();
  // const { setToken } = useAppStore()

  useEffect(() => {
    // Kiểm tra nếu pathname bắt đầu bằng bất kỳ path nào trong UNAUTHENTICATED_PATH
    if (UNAUTHENTICATED_PATH.some((path) => pathname.startsWith(path))) return;

    let interval: any = null;
    const onRefreshToken = (force?: boolean) => {
      checkAndRefreshToken({
        onError: () => {
          clearInterval(interval);
          router.push("/auth/login");
        },
        force,
      });
    };

    onRefreshToken();

    // Timeout interval phải bé hơn thời gian hết hạn của access token
    // Ví dụ thời gian hết hạn access token là 10s thì 1s mình sẽ cho check 1 lần
    const TIMEOUT = 1000;
    interval = setInterval(onRefreshToken, TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [pathname]);
  return null;
}

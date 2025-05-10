"use client";

import { toast } from "@/hooks/use-toast";
import { useSetTokenToCookieMutation } from "@/queries/useAuth";
import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useContext } from "react";
import { UserContext } from "@/context/profileContext";

export const metadata: Metadata = {
  title: "Google Login Redirect",
  description: "Google Login Redirect",
  robots: {
    index: false,
  },
};

export default function Oauth() {
  const { mutateAsync } = useSetTokenToCookieMutation();
  const router = useRouter();
  const count = useRef(0);
  const { setUser } = useContext(UserContext) || {};

  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  const userParam = searchParams.get("user");

  useEffect(() => {
    if (access_token && refresh_token) {
      if (count.current === 0) {
        mutateAsync({ access_token, refresh_token })
          .then(() => {
            if (userParam && setUser) {
              try {
                const decodedUserParam = decodeURIComponent(userParam);
                const userData = JSON.parse(decodedUserParam);
                setUser(userData);
              } catch (error) {
                console.error("Failed to parse user data", error);
              }
            }
            router.push("/app");
          })
          .catch((e) => {
            toast({
              description: e.message || "Có lỗi xảy ra",
            });
          });
        count.current++;
      }
    } else {
      if (count.current === 0) {
        setTimeout(() => {
          toast({
            description: "Có lỗi xảy ra",
          });
        });
        count.current++;
      }
    }
  }, [access_token, refresh_token, router, mutateAsync, userParam, setUser]);
  return null;
}

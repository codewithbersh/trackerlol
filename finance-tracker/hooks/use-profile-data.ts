import { Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchProfile = async () => {
  const res = await fetch("/api/profile");
  const data: Profile | null = await res.json();
  return data;
};

const useProfileData = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });
};

export default useProfileData;

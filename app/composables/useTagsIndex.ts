import { useQuery } from "@tanstack/vue-query";

export const useTagsIndex = () => {
  const response = useQuery({
    queryKey: ["tagsIndex"],
    queryFn: () => $fetch("/api/tags"),
  });

  return response;
};

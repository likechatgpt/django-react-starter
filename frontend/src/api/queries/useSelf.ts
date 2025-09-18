// File: frontend/src/api/queries/useSelf.ts
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { ApiError } from "../types";
import { apiGet } from "../utils";
export type Self = {
id: number;
firstName: string;
lastName: string;
email: string;
};
export type ApiSelf = {
id: number;
first_name: string;
last_name: string;
email: string;
};
type UseSelfReturn = {
isPending: boolean;
isError: boolean;
error: ApiError | null;
data?: Self;
};
export const deserializeSelf = (data: ApiSelf): Self => ({
id: data.id,
firstName: data.first_name,
lastName: data.last_name,
email: data.email,
});
// Helper: treat 401 as an unauthenticated state
const isUnauthorized = (err: ApiError | undefined) =>
typeof err?.status === "number" && err.status === 401;
export const useSelf = (): UseSelfReturn => {
const { isPending, isError, error, data } = useQuery<ApiSelf, ApiError, Self>({
queryKey: ["self"],
queryFn: () => apiGet("/self/account/"),
select: deserializeSelf,
// Don't retry on 401; limit other errors to a couple of retries
retry: (failureCount: number, err: ApiError) =>
!isUnauthorized(err) && failureCount < 2,
// Prevent an extra retry when the component remounts
retryOnMount: false,
});
return useMemo(
() => ({
isPending,
isError,
error: error ?? null,
data,
}),
[isPending, isError, error, data],
);
};
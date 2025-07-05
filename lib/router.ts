import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export let router: AppRouterInstance;

export const setRouter = (_router: AppRouterInstance) => {
  router = _router;
};

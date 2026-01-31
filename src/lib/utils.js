// shadcn-style utility for merging tailwind classes
// prevents class conflicts when combining conditional styles

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

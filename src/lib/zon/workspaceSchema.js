import { z } from "zod";

export const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace's name cannot be empty!"),
});

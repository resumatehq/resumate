import { Mastra } from "@mastra/core";
import myAgent from "./agents";
 
export const mastra = new Mastra({
  agents: { myAgent },
});

// Also export the agent directly for easier access
export { myAgent };
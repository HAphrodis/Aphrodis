import { LoopsClient } from "loops";

if (!process.env.LOOPS_API_KEY) {
  throw new Error("LOOPS_API_KEY is not defined in the environment variables.");
}

const loops = new LoopsClient(process.env.LOOPS_API_KEY);

export default loops;

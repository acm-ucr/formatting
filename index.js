import { getInput, setOutput, setFailed } from "@actions/core";
import { context } from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  setOutput("time", time);
  console.log(
    `The event payload: ${JSON.stringify(context.payload.repository.git_url)}`
  );
} catch (error) {
  setFailed(error.message);
}

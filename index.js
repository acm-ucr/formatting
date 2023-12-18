import { getInput } from "@actions/core";
import { payload } from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  console.log(`The event payload: ${JSON.stringify(payload.base)}`);
} catch (error) {
  core.setFailed(error.message);
}

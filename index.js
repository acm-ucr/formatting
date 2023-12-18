import { getInput, setOutput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import { execSync } from "child_process";

try {
  const gitUrl = context.payload.repository.git_url;
  const name = context.payload.repository.name;

  execSync(`git clone ${gitUrl} && cd ${name}`);
  execSync(`npm i prettier -D`);
  const output = execSync(`npm run format`);
  console.log(output);
} catch (error) {
  setFailed(error.message);
}

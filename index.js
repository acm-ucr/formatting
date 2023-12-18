import { setFailed, info, getInput } from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import { context } from "@actions/github";

const prettier = async () => {
  const token = getInput("token");

  if (!token)
    setFailed("No available token. Please provide the GITHUB_TOKEN variable");

  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    await exec("npx prettier --write .");
    // await exec(`git config --global user.name "your username"`);
    // await exec(`git config --global user.email "your email"`);
    await exec("git add .");
    await exec(`git commit -m "automated formatting"`);
    await exec("git push");
    setFailed("Your code is not formatted correctly. Please format your code.");
  }
};

await prettier();

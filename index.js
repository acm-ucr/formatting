import { setFailed, info, getInput } from "@actions/core";
import { exec, getExecOutput } from "@actions/exec";
import { context } from "@actions/github";

const prettier = async () => {
  // const token = getInput("token");

  // if (!token)
  //   setFailed("No available token. Please provide the GITHUB_TOKEN variable");

  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    const branch = context.payload.pull_request.head.ref;
    const commit = context.payload.after;

    await exec(`git checkout ${commit}`);

    await exec("npx prettier --write .");
    await exec(`git config --global user.name "acm-ucr"`);
    await exec(`git config --global user.email "contact.acmucr@gmail.com"`);

    await exec(`git add .`);
    await exec(`git commit -m "automated formatting"`);
    await exec(` git push origin ${branch}`);

    setFailed("Your code is not formatted correctly. Please format your code.");
  }
};

await prettier();

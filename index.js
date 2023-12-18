import { getInput, setOutput, setFailed, error, info } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getExecOutput } from "@actions/exec";

try {
  const token = getInput("token");

  if (!token)
    error(
      "There is no Github Token provided. Please refer to the Prettier-Action Documentation for reference."
    );

  let myOutput = "";

  const options = {};
  options.listeners = {
    stdout: (data) => {
      myOutput += data.toString();
    },
  };
  options.cwd = "./lib";

  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    setFailed(
      "Your code does not meet Prettier Standards. Please format your code."
    );
  }

  console.log("RESULT", result);

  const octokit = getOctokit(token);

  // const owner = context.payload.repository.owner;
  const name = context.payload.repository.name;
  const number = context.payload.repository.number;
  const owner = context.payload.repository.owner.login;

  const { data } = await octokit.rest.pulls.get({
    owner: owner,
    repo: name,
    pull_number: number,
  });

  console.log("DATA", data);
} catch (error) {
  console.log(error);
  setFailed(error.message);
}

import { getInput, setOutput, setFailed, error } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { exec, getExecOutput } from "@actions/exec";

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

  await exec("npm i prettier -D");
  const result = await getExecOutput("prettier --check .");
  console.log(result);

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

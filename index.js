import { getInput, setFailed, info } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { getExecOutput } from "@actions/exec";

const Prettier = async () => {
  const token = getInput("token");

  if (!token)
    setFailed(
      "There is no Github Token provided. Please refer to the Prettier-Action Documentation for reference."
    );

  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    const octokit = getOctokit(token);

    const name = context.payload.repository.name;
    const number = context.payload.repository.number;
    const owner = context.payload.repository.owner.login;

    await octokit.rest.pulls.createReview({
      owner: owner,
      repo: name,
      pull_number: number,
      event: "REQUEST_CHANGES",
      body: "The code is not formatted correctly, please format your code and push your changes again.",
    });
    setFailed("Your code is not formatted correctly. Please format your code.");
  }
};

await Prettier();

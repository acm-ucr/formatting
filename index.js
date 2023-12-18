import { setFailed, info } from "@actions/core";
import { getExecOutput } from "@actions/exec";

const prettier = async () => {
  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    setFailed("Your code is not formatted correctly. Please format your code.");
  }
};

await prettier();

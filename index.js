import { setFailed, info, error } from "@actions/core";
import { getExecOutput } from "@actions/exec";

const formatting = async () => {
  const { stdout } = await getExecOutput("npm i prettier -D");
  info(stdout);

  try {
    const { stdout } = await getExecOutput("npx prettier --check .");
    info(stdout);
  } catch (err) {
    error(err);
    setFailed(
      "Your code is not formatted correctly. Please format using `npm run format` or `npx prettier --write .`"
    );
  }
};

await formatting();

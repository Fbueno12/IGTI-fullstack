import readline from "readline";

const getUF = (quest) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(quest, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

export { getUF };

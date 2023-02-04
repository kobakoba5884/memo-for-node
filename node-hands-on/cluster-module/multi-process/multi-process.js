import { fork, setupMaster } from "cluster";
import os from 'os'

console.log("main process", process.pid);

const __dirname = process.cwd()

setupMaster({ exec: `${__dirname}/web-app` });

const cpuCount = os.cpus().length;

for (let i = 0; i < cpuCount; i++) {
  const sub = fork();
  console.log("sub process", sub.process.pid);
}

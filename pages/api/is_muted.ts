import type { NextApiRequest, NextApiResponse } from "next";
const { exec } = require("child_process");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const command = 'osascript -e "output muted of (get volume settings)"';
  return new Promise<void>((resolve, reject) => {
    exec(command, (error: boolean, stdout: string, stderr: string) => {
      if (error) {
        res.status(500).json({ status: stdout });
        reject();
      } else {
        res.status(200).json({ status: stdout.split("\n")[0] });
      }
    });
  });
}

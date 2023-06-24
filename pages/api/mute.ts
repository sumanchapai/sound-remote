import type { NextApiRequest, NextApiResponse } from "next";
const { exec } = require("child_process");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const command = 'osascript -e "set volume with output muted"';
  return new Promise<void>((resolve, reject) => {
    exec(command, (error: boolean, stdout: string, stderr: string) => {
      if (error) {
        res.status(500).json({ msg: stderr });
        reject();
      } else {
        res.status(200).json({ msg: stdout });
      }
    });
  });
}

import type { NextApiRequest, NextApiResponse } from "next";
const { exec } = require("child_process");

type Error = {
  message: string;
};

type Data = {
  currentVolume: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const newVolume = req.body?.newVolume;
  const command = "~/binary-scripts/vol";
  const commandWithOptions = newVolume ? `${command} ${newVolume}` : command;
  return new Promise<Data | void>((resolve, reject) => {
    exec(
      commandWithOptions,
      (error: boolean, stdout: string, stderr: string) => {
        if (error) {
          res.status(500).json({ message: stderr });
          reject();
        } else {
          res.status(200).json({ message: stdout });
          resolve();
        }
      }
    );
  });
}

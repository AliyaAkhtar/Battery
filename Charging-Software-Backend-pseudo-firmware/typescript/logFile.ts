
import * as fs from 'fs';

const logFilePath = 'logData.json';

function readLogs(): { timestamp: string; message: string }[] {
  try {
    const data = fs.readFileSync(logFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

function writeLogs(logs: { timestamp: string; message: string }[]): void {
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
}

export { readLogs, writeLogs };

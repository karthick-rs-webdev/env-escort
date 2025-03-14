import fs from "fs";
import path from "path";

/**
 * Reads and parses a .env file.
 * @param filePath - Path to the .env file.
 * @returns A set of environment variable keys.
 */
const parseEnvFile = (filePath: string): Set<string> => {
  if (!fs.existsSync(filePath)) return new Set();
  return new Set(
    fs
      .readFileSync(filePath, "utf-8")
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"))
      .map((line) => line.split("=")[0])
  );
};

/**
 * Checks if all required environment variables from `.env.example` exist in `.env`.
 */
const checkEnv = (): void => {
  const envExamplePath = path.resolve(process.cwd(), "env.example");
  const envPaths = [
    // can add more env paths to check
    path.resolve(process.cwd(), ".env"),
  ];

  if (!fs.existsSync(envExamplePath)) {
    console.error("ERROR: `env.example` file is missing.");
    process.exit(1);
  }

  const requiredVars = parseEnvFile(envExamplePath);
  const actualVars = new Set(
    envPaths.flatMap((envPath) => Array.from(parseEnvFile(envPath)))
  );

  const missingVars = Array.from(requiredVars).filter(
    (key) => !actualVars.has(key)
  );

  if (missingVars.length > 0) {
    console.error(
      `ERROR: Missing environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }

  console.log("All required environment variables are set.");
};

export default checkEnv;

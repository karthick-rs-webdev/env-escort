# env-escort

## Overview

`env-escort` is a simple CLI tool that ensures all required environment variables are correctly set before running your application. It compares the `.env` file(s) with `env.example` and throws an error if any required variables are missing.

## Features

- **Automatic Environment Validation**: Ensures all necessary variables exist.
- **Checks .env File**: Checks across `.env`.
- **Easy Integration**: Can be added to the build pipeline to prevent missing environment configurations.

## Installation

You can install `env-escort` locally in your project:

```sh
npm install env-escort --save-dev
```

Or install it globally:

```sh
npm install -g env-escort
```

## Usage

### 1. Add an `env.example` File

Ensure your project has an `env.example` file listing all required environment variables:

```
DATABASE_URL=postgres://user:pass@localhost:5432/dbname
API_KEY=your-api-key
PORT=3000
```

### 2. Run `env-escort` in Your Project

Run the following command to check if all required environment variables are present:

```sh
npx env-escort check
```

If any required variables are missing, `env-escort` will throw an error and exit with status `1`.

### 3. Add to `package.json` Scripts

To automatically check environment variables before building, update your `package.json`:

```json
{
  "scripts": {
    "build": "env-escort check && your-build-command"
  }
}
```

Now, running `npm run build` will first validate environment variables.

## Example Output

✅ **When all environment variables are set:**

```sh
All required environment variables are set.
```

❌ **When some environment variables are missing:**

```sh
ERROR: Missing environment variables: API_KEY, DATABASE_URL
```

## How It Works

1. Reads `env.example` to determine required environment variables.
2. Checks `.env` for actual values.
3. If any variables from `env.example` are missing, an error is thrown.

## Contributing

We welcome contributions! To contribute:

1. Fork this repository.
2. Create a new branch (`feature/my-feature`).
3. Make your changes and commit them.
4. Open a pull request.

## License

This project is licensed under the MIT License.

---

For any issues or suggestions, please open an issue.

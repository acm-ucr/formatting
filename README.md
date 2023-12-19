# Formatting

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## Description

A custom Github Action for `acm-ucr` repositories which uses Prettier to check formatting.

## Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Running Prettier
    uses: acm-ucr/formatting@v2
```

## Node.js

Formatting runs on Node.js Version 20.10.0 and higher. Please ensure you have Node.js installed via the [official website](https://nodejs.org/en).

## Commands

### Dependencies

```bash
# Install dependencies
npm i

# Add dependency
npm i <dependency>

# Remove dependency
npm un <dependency>
```

### Formatting Code via Prettier

```bash
# Rewrite code recursively with proper formatting
npm run format

# Show formatting differences recursively
npm run check
```

### Linting Code via Eslint

```bash
npm run eslint
```

### Build the Action

```bash
npm run build
```

### Create a New Tag

```bash
git tag -a -m "message" vX.XX
```

### Push Tag

```bash
git push --follow-tags
```

## Update Primary Tag

```bash
git tag -fa -m "message" v2
```

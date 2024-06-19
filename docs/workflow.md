# Project Workflow

This document describes the workflow for the HiveFive project. It is intended for developers who want to contribute to the project.

## Table of contents
- [Git Workflow](#git-workflow)
- [Branches](#branches)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Code Review](#code-review)
- [Continuous Integration](#continuous-integration)

## Git Workflow

We use the **[Rebase & Merge Workflow](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)** for our git workflow. This means that we rebase our feature branches on top of the `staging` branch before merging them.

## Branches

We have the following branches in our repository:
- **`main`: The main branch.** It contains the latest stable version of the project and the code that is currently in production.

- **`staging`: The staging branch.** It contains the code that is currently in testing. Feature branches are rebased on top of this branch before merging.

- any other branch: Feature/dev branches. They are created from the `staging` branch and contain the code for a specific feature or bug fix.

## Commits

We follow the **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** specification for our commit messages. This means that we use a specific format for our commit messages that allows us to automatically generate the changelog. This is also **enforced by husky hooks**.

This looks like:
```
feat: add new feature
fix: fix a bug
docs: update documentation
style: fix formatting
...
```

## Pull Requests

When you have finished working on a feature or bug fix, you should create a pull request from your feature branch to the `staging` branch. The pull request should have a descriptive title and description that explains what the changes are and why they are needed.

We also enforce a specific format for PR titles following the format:
```
[<type>] <description>
or
[<type>/<scope>] <description>

<type> can be any of the following:
- FRONT
- BACK
- DEVOPS
- TEST
- DOCS
- FIX
- REFACTOR
- STYLE
- CHORE
- CI
- BUILD
- PERF
- REVERT
- WIP

<scope> should be the name of the module or component that the PR affects (but it can be anything as long as it's only capitalized words without numbers or special characters).

<description> should be a short description of the changes in the PR.

```

## Code Review

All pull requests must be reviewed by at least one other developer before they can be merged. The reviewer should check the code for correctness, readability, and adherence to the project's coding standards.

For opened discussions, or requests for changes, the reviewer should be the **only** one to close them. 

> [!IMPORTANT]
> The author should **not** close them, but instead make the requested changes and ask for a new review.

## Continuous Integration

We use **GitHub Actions** for our continuous integration. This means that every time a pull request is opened, GitHub will run a series of tests to check that the code is correct and that it doesn't introduce any regressions. If the tests pass, the pull request can be merged.

We also have a **CodeQL** analysis that checks for security vulnerabilities in the code.

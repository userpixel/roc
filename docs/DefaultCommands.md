# Commands for `roc`

## General Information
All commands can be called with some additional options as can be seen below.

### General options

| Name            | Description                                                                                                   | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| -c, --config    | Path to configuration file, will default to roc.config.js in current working directory.                       | No       |
| -d, --directory | Path to working directory, will default to the current working directory. Can be either absolute or relative. | No       |
| -h, --help      | Output usage information.                                                                                     | No       |
| -V, --verbose   | Enable verbose mode.                                                                                          | No       |
| -v, --version   | Output version number.                                                                                        | No       |

## Commands
* [init](#init)
* [markdown-commands](#markdown-commands)
* [new](#new)

## init
__Init a new project.__

```
roc init [template] [version]
```
The __init__ command can be used to initiate a new Roc project and currently expects that it's run inside an empty directory. As can be seen above it takes two optional arguments, template and version. If no template is given a prompt will be shown with the possible alternatives that exists. Currently these alternatives are coded into Roc and matches `web-app` and `web-app-react`.

__template__
Template can either be a short name for a specific template, currently it accepts `web-app` and `web-app-react` that will be converted internally to `rocjs/roc-template-web-app` and `rocjs/roc-template-web-app-react`. As can be seen here the actual template reference is a Github repo and can be anything matching that pattern `USERNAME/PROJECT`.

It will also expect that the template has a folder named `template` and that inside of it there is `package.json` file with at least one dependency to a Roc module following the pattern `roc-package-*` or that it has a `roc.config.js` file (this file is then expected to have some [packages](/docs/config/packages.md) defined but this is not checked immediately).

__version__
Versions should match a tag on the Github repo and will default to master if none exists. When giving an input on the command line Roc will automatically add `v` in front of versions that starts with a number to match Github default that have versions tags that start with `v` like `v1.0.0`. `master` is also always available as an option.

### Arguments

| Name        | Description                                                       | Required | Type       | Default |
| ----------- | ----------------------------------------------------------------- | -------- | ---------- | ------- |
| template    | The template to use. Matches Github structure with Username/Repo. | No       | `Filepath` |         |
| version     | The version to use.                                               | No       | `String`   |         |

### Command options

| Name        | Description                                                       | Required | Type       | Default |
| ----------- | ----------------------------------------------------------------- | -------- | ---------- | ------- |
| -f, --force | Ignore non empty directory warning.                               | No       | `Boolean`  |         |
| -l, --list  | List the available versions of a template.                        | No       | `Boolean`  |         |

## markdown-commands
__Create markdown documentation for the commands.__

```
roc markdown-commands [settings-link]
```

### Arguments

| Name            | Description                                                                  | Required | Type       | Default |
| --------------- | ---------------------------------------------------------------------------- | -------- | ---------- | ------- |
| settings-link   | A link that should be used when generation to link to the settings location. | No       | `String`   |         |

### Command options

| Name            | Description                                                                  | Required | Type       | Default |
| --------------- | ---------------------------------------------------------------------------- | -------- | ---------- | ------- |
| --hide-commands | A list of commands that should be hidden form the generated markdown.        | No       | `[String]` | `[]`    |

## new
__Create a new project.__

```
roc new <name>  [template] [version]
```
Alias for "init" that always will try to create a new directory.

### Arguments

| Name        | Description                                                       | Required | Type       | Default |
| ----------- | ----------------------------------------------------------------- | -------- | ---------- | ------- |
| name        | Name for a new directory to create the project in.                | Yes      | `String`   |         |
| template    | The template to use. Matches Github structure with Username/Repo. | No       | `Filepath` |         |
| version     | The version to use.                                               | No       | `String`   |         |

### Command options

| Name        | Description                                                       | Required | Type       | Default |
| ----------- | ----------------------------------------------------------------- | -------- | ---------- | ------- |
| -f, --force | Ignore non empty directory warning.                               | No       | `Boolean`  |         |
| -l, --list  | List the available versions of a template.                        | No       | `Boolean`  |         |


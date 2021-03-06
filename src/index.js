export roc from './roc';

export {
    merge,
    getConfig,
    appendConfig,
    getSettings,
    appendSettings
} from './configuration';

export { generateMarkdownDocumentation, generateTextDocumentation } from './documentation';

export { runCli, initCli } from './cli';

export { validate } from './validation';

export { execute, executeSync } from './cli/execute';

export { getAbsolutePath, fileExists } from './helpers';

export { defaultPrompt } from './commands/helpers/default-prompt';

export {
    runHook,
    runHookDirectly,
    registerHooks
} from './hooks';

export {
    registerAction,
    registerActions,
    removeActions
} from './hooks/actions';

export generateMarkdownHooks from './hooks/documentation/generate-markdown-hooks';
export generateMarkdownActions from './hooks/documentation/generate-markdown-actions';

export generateMarkdownCommands from './commands/markdown-commands';

export getConfiguration from './cli/get-configuration';

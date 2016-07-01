import { bold } from 'chalk';

import log from '../../log/default/large';
import isValid from '../../validation/helpers/isValid';
import throwValidationError from '../../validation/helpers/throwValidationError';
import automatic from '../../converters/automatic';

/**
 * Parses arguments and validates them.
 *
 * @param {string} command - The command to parse arguments for.
 * @param {Object} commands - commands from {@link rocMetaConfig}.
 * @param {Object[]} args - Arguments parsed by minimist.
 *
 * @returns {Object} - Parsed arguments.
 * @property {object[]} options - The parsed arguments that was matched against the meta configuration for the command.
 * @property {object[]} rest - The rest of the arguments that could not be matched against the configuration.
 */
export default function parseArguments(command, commands = {}, args) {
    // If the command supports options
    if (commands[command] && commands[command].arguments) {
        let parsedArguments = {};
        commands[command].arguments.forEach((argument, index) => {
            let value = args[index];

            if (value === undefined && argument.default) {
                value = argument.default;
            }

            const converter =
                argument.converter ||
                argument.validator && argument.validator(null, true).converter ||
                argument.default !== undefined && automatic(argument.default);

            if (value !== undefined && converter) {
                value = converter(value);
            }

            if (argument.validator) {
                const validationResult = isValid(value, argument.validator);
                if (validationResult !== true) {
                    try {
                        throwValidationError(argument.name, validationResult, value, 'argument');
                    } catch (err) {
                        log.error(
                            'An argument was not valid.\n\n' +
                                err.message,
                            'Arguments Problem'
                        );
                    }
                }
            }

            parsedArguments[argument.name] = value;
        });

        return {
            arguments: parsedArguments,
            rest: args.splice(Object.keys(parsedArguments).length)
        };
    }

    return {
        arguments: {},
        rest: args
    };
}

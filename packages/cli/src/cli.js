import arg from 'arg';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        skipPromts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
}

export function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    console.log(options);
}

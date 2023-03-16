#! /usr/bin/env node
import * as _ from 'lodash';
import * as prompts from 'prompts';
const yargs = require('yargs/yargs');

const argv = yargs(process.argv.slice(2)).options({
    command: { type: 'string', alias: 'command', describe: 'what you want to run', default: "" },
    args: { type: 'string', alias: 'args', describe: 'input params for the command', default: "" },
}).argv;

const flags = argv;

/**
 * Switch para parsear input y rutear al comando solicitado
 */
const main = async () => {
    const questions: prompts.PromptObject[] = [
        {
            type: 'text',
            name: 'usr',
            message: 'Enter your username'
        },
        {
            type: 'text',
            name: 'pwd',
            message: 'Enter your password'
        }
    ];

    const response = await prompts(questions);

    const allowed = response.usr === 'gantonioid' && response.pwd === '123'
    if (allowed) {
        switch (flags.command) {
            case 'sum':
                if (flags.args !== "") {
                    try {
                        console.log(_.sum(JSON.parse(flags.args)));
                    } catch (err) {
                        console.log("could not parse overArgs, must be an array of numbers");
                    }
                }
                break;
            case 'mult':
                if (flags.args !== "") {
                    try {
                        let items = JSON.parse(flags.args);
                        let res = items[0];
                        for (let i = 1; i < items.length; i++) {
                            res *= items[i];
                        }
                        console.log(res);
                    } catch (err) {
                        console.log("could not parse overArgs, must be an array of numbers");
                    }
                }
                break;
            case "salute":
                console.log("hello world");
                break;
            default:
                console.error('Unrecognized command');
                break;
        }
    } else {
        console.error('unauthorized')
    }
}

main()
    .then(() => {
        console.log('done');
        process.exit(0);
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
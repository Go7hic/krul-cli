'use strict';

const inquirer = require('inquirer');
const validateNpmName = require('validate-npm-package-name');

const config = require('./config');

module.exports = async (opts) => {
  const {
    skipPrompts,
    ...rest
  } = opts;

  if (opts.name && !validateNpmName(opts.name).validForNewPackages) {
    throw new Error(`invalid package name "${opts.name}"`);
  }

  if (skipPrompts) {
    if (!opts.name) {
      throw new Error('invalid input; you must pass a package name with --skip-prompts');
    }
    const info = {};

    Object.keys(rest).forEach((key) => {
      const value = rest[key];
      if (typeof value === 'function') {
        info[key] = value(rest);
      } else {
        info[key] = value;
      }
    });

    return info;
  } else {
    let inputArr = [
      {
        type: 'input',
        name: 'name',
        message: 'Package Name',
        validate: (name) => {
          return name && validateNpmName(name).validForNewPackages;
        },
        default: opts.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package Description',
        default: opts.description
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: opts.author
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Github Repo Path',
        default: opts.repo
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: opts.license
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Package Manager',
        choices: [ 'npm', 'yarn' ],
        default: opts.manager
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: [ 'next-app', 'react-library', 'typescript-library' ],
        default: opts.template
      },
    ]
    let info = await inquirer.prompt(inputArr);
    if (info.template == 'react-library') {
      const jsTs = await inquirer.prompt([
        {
          type: 'list',
          name: 'language',
          message: 'Language?',
          choices: [ 'TypeScript', 'JavaScript' ],
          default: opts.typescript ? 'TypeScript' : 'JavaScript'
        }
      ]);
      info.language = jsTs.language;
    }

    
    info.typescript = (info.language === 'TypeScript');

    config.set('author', info.author);
    config.set('license', info.license);
    config.set('manager', info.manager);
    config.set('typescript', info.typescript);

    return {
      ...info,
      git: opts.git
    };
  }
};

# Jailbreak Bot

A moderation and multi purpose bot by the Jailbreak Discord staff team, for use by everyone.

## Getting Started

###### Before you host your own version, please consider using our hosted version. (_coming soon_)

### Prerequisites

- An instance of postgres running locally
- A discord bot token
- The latest stable version of Node, and either yarn or npm (yarn is preferred)

### Installing

1. `git clone git@github.com:jailbreakdiscord/bot.git`
2. `yarn install`
3. Copy `src/Config.example.ts` to `src/Config.ts` and configure accordingly
4. :tada:

### Development

1. Follow instructions from installing
2. Run `yarn dev` to run the bot

### Prettier configuration

- We use [Prettier](https://prettier.io/) to format our code.
- The `prettify` script will format all \*.ts files in the project according to some predefined rules (see [.prettierrc](.prettierrc))
- The `dev` script will also format all files.

### Deploying

A docker-compose configuration file will be provided at a later date, to ease production deployments.

## Contributing

This repo makes use of gitflow, please see [this](https://nvie.com/posts/a-successful-git-branching-model/) and [this](https://medium.com/@muneebsajjad/git-flow-explained-quick-and-simple-7a753313572f) for a guide to gitflow.

All pull-requests must be approved by a [Bot Leader](https://github.com/orgs/jailbreakdiscord/teams/bot-leaders/members) before being merged into develop. We do also ask that you come and chat with us in our [development discord](https://discord.gg/k6yPPVB) before starting work on a pull-request, as we may already be working on something similar.

### Roadmap

You can see the [currently open issues](https://github.com/jailbreakdiscord/bot/issues) or [our GitHub project](https://github.com/jailbreakdiscord/bot/projects/1) to get an idea of what currently needs working on.

## Authors

Initial code and updates have mainly been developed by the [core developers](https://github.com/orgs/jailbreakdiscord/teams/bot-developers). However, you can also see [external contributors](https://github.com/jailbreakdiscord/bot/graphs/contributors) that have been awesome too :)

## License

jailbreakbot is licensed under the GNU GPL 3.0 license, please see LICENSE for more information. In addition, we ask that you refrain from using our branding and reiterate that appropitate credit must be provided to maintain respect for the authors who have dedicated large amounts of time to this project.

## Acknowledgments

We would like to thank the following opensource libraries, for their much appreciated work:

- [discord.js](https://discord.js.org/) for an amazing Discord library
- [BotKit](https://github.com/dynastic/BotKit) for doing all the heavy-lifting with the command framework

<p align="center">
<img src="https://i.redd.it/1j1v387z9gqx.png" style="border-radius: 50%; width: 140px; height: 140px;" alt="clank">
</p>

**Berserk** is the Discord Bot for LosChidos Discord server 😎. Never stable enough but always funner.

## Requirements

- Nodejs 12.16.2 or higher.
- Docker.
- Docker compose.
- A Discord bot application.
- A Discord server.

## Enviroment setup

Copy and paste the `.env.example` file and rename to `.env`. The below table contains the description of all environment keys.

| **Key**                        | **Type**  | **Description**                                                            |
| ------------------------------ | --------- | -------------------------------------------------------------------------- |
| **TOKEN_BOT**                  | `string`  | Discord bot token.                                                         |
| **TOKEN_OWNER**                | `number`  | User ID of owner's server.                                                 |
| **TENOR_GIF_KEY**              | `string`  | Tenor API key. see more: https://tenor.com/gifapi/documentation#quickstart |
| **POSTGRES_DB**                | `string`  | Name of Postgresql's database. Used by Docker compose.                     |
| **POSTGRES_USER**              | `string`  | Username of Postgresql's database. Used by Docker compose.                 |
| **POSTGRES_PASSWORD**          | `string`  | Password of Postgresql's database. Used by Docker compose.                 |
| **POSTGRES_PORT**              | `number`  | Port of Postgresql's database. Used by Docker compose.                     |
| **POSTGRES_ENTRYPOINT_INITDB** | `string`  | Folder of Postgresql settings. Used by Docker compose.                     |
| **TYPEORM_CONNECTION**         | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_HOST**               | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_USERNAME**           | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_PASSWORD**           | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_DATABASE**           | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_PORT**               | `number`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_SYNCHRONIZE**        | `boolean` | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_LOGGING**            | `boolean` | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |
| **TYPEORM_ENTITIES**           | `string`  | see more: https://typeorm.io/#/using-ormconfig/using-environment-variables |

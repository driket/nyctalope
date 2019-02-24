//eslint-disable import/first
/**
 * importer
 * Import react module from library:
 * - By preserving hot module reload in dev
 * - By loading compiled components in prod
 */

export const importer = () => {
  return process.env.NODE_ENV == 'development'
    ? require('../../../react/src/index')
    : require('@nyctalope/react')
}

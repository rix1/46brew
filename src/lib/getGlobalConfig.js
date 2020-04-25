// @flow
import { env } from '../../next.config';

function getGlobalConfig(): Brew$AppConfig {
  /**
   * Should only be called server side or at build time
   */
  return env;
}

export default getGlobalConfig;

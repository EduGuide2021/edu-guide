import { PubSub } from 'apollo-server';

import * as MESSAGE_EVENTS from './message.js';
import * as COMMUNITY_EVENTS from './community.js'
import * as TEST_DONE from './specialtest.js'

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
  COMMUNITY: COMMUNITY_EVENTS,
  SPECIALTEST: TEST_DONE
};

export default new PubSub();

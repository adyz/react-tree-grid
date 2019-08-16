import { configure } from '@storybook/react';

import { configureActions } from '@storybook/addon-actions';
configureActions()

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
import React from 'react';
import { storiesOf } from '@storybook/react';

// Addons
import { withInfo } from "@storybook/addon-info";
import { action } from '@storybook/addon-actions';


// Components 
import VirtualTree from '../src/components/VirtualTree/VirtualTree'
import { data as originalNodes } from '../src/components/VirtualTree/data/customData';


const VirtualTreeStories = storiesOf("VirtualTree", module).addDecorator(withInfo);

VirtualTreeStories.add(
  "VirtualTree",
  () => (
    <VirtualTree nodes={originalNodes} allExpanded={true}>
      {({ style, node, index, selectNode, expandOrCollapse }) => {
          return (
            <div style={style} onClick={() => action()('Row clicked')}>Row</div>
          )
      }}
    </VirtualTree>
  )
)
import React from 'react';
import { storiesOf } from '@storybook/react';

// Addons
import { withInfo } from "@storybook/addon-info";
import { action } from '@storybook/addon-actions';


// Components 
import Button from '../src/components/Button/Button';
import Banner from '../src/components/Banner/Banner'
import Select from '../src/components/Select/Select'
import VirtualTree from '../src/components/VirtualTree/VirtualTree'
import { data as originalNodes } from '../src/components/VirtualTree/data/customData';

const ButtonStories = storiesOf("Button", module).addDecorator(withInfo);

ButtonStories.add(
  "Button",
  () => <Button onClick={() => {action()('clicked');}}>Test Button</Button>
)

const BannerStories = storiesOf("Banner", module).addDecorator(withInfo);;

BannerStories.add(
  "Banner",
  () => <Banner name="World" />
)

const SelectStories = storiesOf("Select", module).addDecorator(withInfo);

SelectStories.add(
  "Select",
  () => <Select />
)

const VirtualTreeStories = storiesOf("VirtualTree", module).addDecorator(withInfo);

VirtualTreeStories.add(
  "VirtualTree",
  () => (
    <VirtualTree nodes={originalNodes} allExpanded={true}>
      {({ style, node, index, selectNode, expandOrCollapse }) => {
          return (
            <div style={style}>Row</div>
          )
      }}
    </VirtualTree>
  )
)
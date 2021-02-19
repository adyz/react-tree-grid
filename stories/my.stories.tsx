import * as React from 'react';
import { storiesOf } from '@storybook/react';

// Addons
import { withInfo } from "@storybook/addon-info";
import { action } from '@storybook/addon-actions';


// Components 
import VirtualTree from '../src/components/VirtualTree/VirtualTree'
import { data as originalNodes } from '../src/components/VirtualTree/data/customData';


const VirtualTreeStories = storiesOf("VirtualTree", module).addDecorator(withInfo);

const buttonStyle = {
  border: 0,
  fontSize: '14px',
  marginRight: '10px',
  height: '24px',
  width: '24px',
  lineHeight: '24px',
  background: '#E7D3AF',
  borderRadius: '50%',
  fontFamily: 'PT Mono, monospace'
}

VirtualTreeStories.add( 
  "VirtualTree",
  () => (
    <VirtualTree nodes={originalNodes}>
      {({ style, node, index, selectNode, expandOrCollapse }) => {
          return (
            <div style={style}>
              <div
              style={{
                overflow: 'auto',
                borderBottom: '1px solid #fff',
                fontFamily: 'sans-serif',
                fontSize: '15px',
                color: '#775E32',
              }}
              >
                <p
                  style={{
                    padding: '10px 0',
                    paddingLeft: node.nesting * 20 + 'px',
                    background: '#FFF1F1',
                    margin: '0',
                    display: 'block',
                    lineHeight: '24px'
                    
                  }}
                >
                  {node.hasChildren ? (
                    <button
                      style={buttonStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        action('a')('Row clicked')
                        expandOrCollapse(node.path);
                      }}
                    >
                      {node.expanded ? '-' : '+'}
                    </button>
                  ) : (
                      <button style={{...buttonStyle, background: '#fff'}}>-</button>
                    )}
                  <label htmlFor={node.path}>
                    Path: {node.path} / i: {node.i} / Name: {node.name}
                  </label>
                </p>
              </div>
            </div>
          )
      }}
    </VirtualTree>
  )
)
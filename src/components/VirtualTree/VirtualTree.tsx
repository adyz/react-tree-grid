import * as React from 'react';
import flattenObject, { Tree } from './flatten';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { DragDropContext, Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, DragStart, Droppable, DroppableProvided, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { findDOMNode } from 'react-dom';

import * as _ from 'lodash';

// In this example, average cell height is assumed to be about 50px.
// This value will be used for the initial `Grid` layout.
// Width is not dynamic.
const cache = new CellMeasurerCache({
  defaultHeight: 40,
  fixedWidth: true
});

function startsWith(haystack: string, needle: string) {
  return haystack.lastIndexOf(needle, 0) === 0;
}

type WtfProps = {
  node: Tree,
  isDragging: boolean,
  provided: DraggableProvided,
  isClone?: boolean,
  isGroupedOver?: boolean,
  style?: Object,
  index?: number,
  isCombined?: string;
};

function getStyle(provided: DraggableProvided, style: any) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

//@ts-ignore
function Wtf(props: WtfProps) {
  //@ts-ignore
  const { node, isDragging, isGroupedOver, provided, style, isClone, index } = props;
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
  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided, style)}
      >
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
                }}
              >
                {node.expanded ? '-' : '+'}
              </button>
            ) : (
                <button style={{ ...buttonStyle, background: '#fff' }}>-</button>
              )}
            <label htmlFor={node.path}>
              {props.isCombined} Path: {node.path} / i: {node.i}
            </label>
          </p>
        </div>
      </div>
    </>
  )
}

type Spread<T> = T & Tree;
interface Props<T> {
  nodes: T[];
  allExpanded?: boolean;
  children: (props: {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    // tslint:disable-next-line:no-any
    parent: any;
    // tslint:disable-next-line:no-any
    style: any;
    node: Spread<T>;
    expandOrCollapse: (key: string) => void;
    selectNode: (key: string, newCheckState: 0 | 1 | 2) => void;

  }) => React.ReactNode;
}

interface State<T> {
  visibleKeys: string[];
  newNodes: { [key: string]: Spread<T> };
  wasActiveDragItemExpanded: boolean;
}
export default class VirtualTree<T extends {}> extends React.Component<Props<T>, State<T>> {
  // tslint:disable-next-line:no-any
  list: any;
  objectKeys: string[] = [];
  // tslint:disable-next-line:no-any
  memo: { [key: string]: string[] } = {};
  constructor(props: Props<T>) {
    super(props);

    this.state = {
      visibleKeys: [],
      newNodes: {},
      wasActiveDragItemExpanded: false
    };

    this.expandOrCollapse = this.expandOrCollapse.bind(this);
    this.onSelectNode = this.onSelectNode.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }
  componentDidMount() {
    const flatNodes = flattenObject(this.props.nodes, this.props.allExpanded);
    const visibleKeys = this.getVisibleNodeKeys(flatNodes);

    this.setState({
      visibleKeys,
      newNodes: flatNodes
    });
  }

  public getVisibleNodeKeys(nodes: { [key: string]: Spread<T> }, keyToStartFrom?: string) {
    let visibleNodes: string[] = [];
    // let collapsedNodes: string[] = [];

    let myCollapsedNodes: { [key: string]: string[] } = {};

    function pushTheNodes(expanded: boolean, path: string) {
      const mySplit = path.split('-');
      const myPath = mySplit[1];
      let found = false;

      if (myCollapsedNodes[myPath] && myCollapsedNodes[myPath].length > 0) {
        for (let i = 0; i < myCollapsedNodes[myPath].length; i++) {
          // if current node path starts with any of the collapsed items
          if (startsWith(path, myCollapsedNodes[myPath][i])) {
            found = true;
            break;
          }
        }
      }

      if (!found) {
        if (expanded) {
          visibleNodes.push(path);
        } else {
          if (myCollapsedNodes[myPath] && myCollapsedNodes[myPath].length > 0) {
            myCollapsedNodes[myPath].push(path);
          } else {
            myCollapsedNodes[myPath] = [path];
          }
        }
      }
    }

    const objectKeys = Object.keys(nodes);
    let foundAtLeaseAChildren = false;

    for (let keyI = 0; keyI < objectKeys.length; keyI++) {
      const { expanded, path } = nodes[objectKeys[keyI]];
      if (keyToStartFrom !== undefined) {
        if (path !== keyToStartFrom && startsWith(path, keyToStartFrom)) {
          pushTheNodes(expanded, path);
          foundAtLeaseAChildren = true;
        } else {
          if (foundAtLeaseAChildren) {
            console.log('Will break here', keyI);
            break;
          }
        }

      } else {
        pushTheNodes(expanded, path);
      }

    }

    // tslint:disable-next-line: forin
    for (const key in myCollapsedNodes) {
      visibleNodes.push(...myCollapsedNodes[key]);
    }
    visibleNodes.sort();
    return visibleNodes;
  }

  public expandOrCollapse(key: string) {

    this.setState((prevState: State<T>) => {
      const { newNodes } = { ...prevState };
      const newExpanded = !newNodes[key].expanded;
      newNodes[key].expanded = newExpanded;
      if (newExpanded) {
        // tslint:disable-next-line:no-any
        const pickedVisibleKeys = this.getVisibleNodeKeys(newNodes, key);
        const mergedVisibleKeys = [...pickedVisibleKeys, ...prevState.visibleKeys];
        mergedVisibleKeys.sort();
        return {
          visibleKeys: mergedVisibleKeys,
          newNodes
        };
      } else {
        console.log('I should show hide the kids to this: ', key);
        // tslint:disable-next-line:max-line-length
        const visibleKeys = prevState.visibleKeys.filter((visibleKey: string) => !visibleKey.startsWith(key) || visibleKey === key);
        return {
          visibleKeys,
          newNodes
        };
      }

    });
  }

  public collapse(key: string) {
    this.setState((prevState: State<T>) => {
      const { newNodes } = prevState;
      newNodes[key].expanded = false;
      const visibleKeys = prevState.visibleKeys.filter((visibleKey: string) => !visibleKey.startsWith(key) || visibleKey === key);
      return {
        visibleKeys,
        newNodes
      };

    });
  }

  public expand(key: string) {
    this.setState((prevState: State<T>) => {
      const { newNodes } = prevState;
      newNodes[key].expanded = true;

      const pickedVisibleKeys = this.getVisibleNodeKeys(newNodes, key);
        const mergedVisibleKeys = [...pickedVisibleKeys, ...prevState.visibleKeys];
        mergedVisibleKeys.sort();
        return {
          visibleKeys: mergedVisibleKeys,
          newNodes
        };
    });
  }

  public onSelectNode(key: string, newCheckState: 0 | 1 | 2) {
    console.log('onSelect', key, newCheckState);
    this.setState((prevState: State<T>) => {
      const { newNodes } = { ...prevState };
      newNodes[key].checkedState = newCheckState;

      if (newNodes[key].hasChildren) {
        for (let newNodeKey in newNodes) {
          if (startsWith(newNodeKey, key)) {
            newNodes[newNodeKey].checkedState = newCheckState;
          }
        }
      }

      return {
        ...prevState,
        newNodes
      };
    }, () => this.list.forceUpdateGrid());
  }

  public handleMove(source: string, destination: string) {
    console.log({ source, destination });

    let sourcePath = '0';
    let destinationPath = '1'
    const cloneNodes = this.props.nodes;

    console.log(cloneNodes);

    // //Copy data to be moved
    const toMove = _.get(cloneNodes, sourcePath);

    // //Remove the data that should be moved
    _.unset(cloneNodes, sourcePath);

    console.log({ data: JSON.parse(JSON.stringify(cloneNodes)) });

    //Set copied data to destination
    if (_.has(cloneNodes, destinationPath + '.children')) {
      console.log('Has children');
      const data = _.get(cloneNodes, destinationPath).children
      data.push(toMove);
    } else {
      _.set(cloneNodes, destinationPath + '.children', [toMove]);
    }

    const flatNodes = flattenObject(cloneNodes);
    const visibleKeys = this.getVisibleNodeKeys(flatNodes);

  

    this.setState({
      newNodes: flatNodes,
      visibleKeys: visibleKeys
    });

    setTimeout(() => {
      console.log('Force be with you');
      this.list.forceUpdateGrid()
    }, 1000)

  }

  _noRowsRenderer() {
    return <p>No rows</p>;
  }

  _rowRenderer({
    index,
    key,
    parent,
    style,
    isScrolling,
    isVisible
  }: {
    isScrolling: boolean;
    isVisible: boolean;
    key: string;
    index: number;
    // tslint:disable-next-line:no-any
    parent: any;
    // tslint:disable-next-line:no-any
    style: any;
  }) {
    const node = this.state.newNodes[this.state.visibleKeys[index]]
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <Draggable draggableId={node.path} index={index} key={node.path}>
          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <Wtf
              provided={provided}
              node={node}
              isDragging={snapshot.isDragging}
              isCombined={snapshot.combineTargetFor}
              style={{ margin: 0, ...style }}
              index={index}
            />
          )}
        </Draggable>
      </CellMeasurer>
    );
  }

  public dragStart(initial: DragStart, provided: ResponderProvided){
    console.log('Start', {initial});

    const nodeKey = initial.draggableId;
    const node = this.state.newNodes[nodeKey]
    const isExpanded = node.expanded;
    this.setState({
      wasActiveDragItemExpanded: isExpanded
    });
    this.collapse(initial.draggableId);
  }

  public dragEnd(result: DropResult, provided: ResponderProvided){
    console.log('End', {result});
    console.log('Combined', result.combine);

    const nodeKey = result.draggableId;
    if(this.state.wasActiveDragItemExpanded) {
        this.expand(nodeKey)
    }
  }

  public render() {
    console.log('Render length', this.state.visibleKeys.length);
    return (
      this.state.visibleKeys.length > 0 && (
        <>
          <DragDropContext onDragStart={this.dragStart} onDragEnd={this.dragEnd}>
            <Droppable
              droppableId="droppable"
              mode="virtual"
              isCombineEnabled={true}
              renderClone={(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot,
                rubric: DraggableRubric,
              ) => (
                <Wtf
                  provided={provided}
                  isDragging={snapshot.isDragging}
                  node={this.state.newNodes[this.state.visibleKeys[rubric.source.index]]}
                  style={{ margin: 0 }}
                  index={rubric.source.index}
                />
              )}
            >
              {(droppableProvided: DroppableProvided) => (
                <List
                  height={540}
                  overscanRowCount={5}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={this.state.visibleKeys.length}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  ref={(ref) => {
                    // react-virtualized has no way to get the list's ref that I can so
                    // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                    if (ref) {
                      // eslint-disable-next-line react/no-find-dom-node
                      const whatHasMyLifeComeTo = findDOMNode(ref);
                      if (whatHasMyLifeComeTo instanceof HTMLElement) {
                        droppableProvided.innerRef(whatHasMyLifeComeTo);
                      }
                    }
                  }}
                  rowRenderer={this._rowRenderer}
                  width={800}
                />
              )}
            </Droppable>
          </DragDropContext>
        </>

      )
    );
  }
}

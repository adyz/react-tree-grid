export type NodeState = 0 | 1 | 2;

export type Tree= {
  path: string;
  parent: string;
  nesting: number;
  hasChildren: boolean;
  // The two props are required
  // tslint:disable-next-line:no-any
  children: any[]; 
  expanded: boolean;
  checkedState: 0 | 1 | 2,
  i: number
};

let characterLimitWarnShown = false;
const CHARS_LIMIT = 65536;
const CHAR_START = 97;
function idOf(i: number): string {
  if (i > CHARS_LIMIT && characterLimitWarnShown === false) {
    // TODO: Fix this
    console.warn('You have to many root nodes for a browser to possibly compute, the order of nodes might not be good');
    characterLimitWarnShown = true;
  }
  return String.fromCharCode(i + CHAR_START);
}

function flattenObject<T>(nodes: T[], allExpanded?: boolean) {
  const toReturn = {} as { [key: string]: T & Tree };
  function rec(restNodes: T[], prevIndex: string, nesting: number = 0) {
    restNodes.forEach((node: T & Tree, i: number) => {
      const myKey = prevIndex + '-' + idOf(i);
      const newNesting = nesting + 1;
      if (node.children && node.children.length > 0) {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: true,
          parent: prevIndex,
          children: [],
          checkedState: 0,
          i,
          expanded: typeof allExpanded !== 'undefined' ? 
            allExpanded : 
            typeof node.expanded !== 'undefined' ? 
              node.expanded : 
              true,

        };

        rec(node.children, myKey, newNesting);
      } else {
        toReturn[myKey] = {
          ...node,
          nesting: newNesting,
          path: myKey,
          hasChildren: false,
          parent: prevIndex,
          children: [],
          checkedState: 0,
          i,
          expanded: true,
          // coz expanded "true" it's faster 
          // (will not go in the collapsed nodes to search into) and it does not mather (coz it has no children)
        };
      }
    });
  }

  rec(nodes, 'a');

  return toReturn;
}

export default flattenObject;

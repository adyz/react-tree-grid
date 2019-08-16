export type NewRandomData = {
    id: string;
    name: string;
    expanded: boolean;
    children: NewRandomData[];
  };
  
const data: NewRandomData[] = [
  {
    id: '0-0',
    name: 'test 0-0',
    expanded: true,
    children: [
      {
        id: '0-0-0',
        name: 'test 0-0-0',
        expanded: true,
        children: []
      },
      {
        id: '0-0-1',
        name: 'test 0-0-1',
        expanded: true,
        children: []
      },
      {
        id: '0-0-2',
        name: 'test 0-0-2',
        expanded: false,
        children: [
          {
            id: '0-0-2-0',
            name: 'test 0-0-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-0-2-1',
            name: 'test 0-0-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-0-2-2',
            name: 'test 0-0-2-2',
            expanded: false,
            children: [
              {
                id: '0-0-2-2-0',
                name: 'test 0-0-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-0-2-2-1',
                name: 'test 0-0-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-0-2-2-2',
                name: 'test 0-0-2-2-2',
                expanded: true,
                children: [
                  {
                    id: '0-0-2-2-2-0',
                    name: 'test 0-0-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-0-2-2-2-1',
                    name: 'test 0-0-2-2-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-0-2-2-2-2',
                    name: 'test 0-0-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '0-1',
    name: 'test 0-1',
    expanded: false,
    children: [
      {
        id: '0-1-0',
        name: 'test 0-1-0',
        expanded: false,
        children: []
      },
      {
        id: '0-1-1',
        name: 'test 0-1-1',
        expanded: true,
        children: []
      },
      {
        id: '0-1-2',
        name: 'test 0-1-2',
        expanded: false,
        children: [
          {
            id: '0-1-2-0',
            name: 'test 0-1-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-1-2-1',
            name: 'test 0-1-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-1-2-2',
            name: 'test 0-1-2-2',
            expanded: false,
            children: [
              {
                id: '0-1-2-2-0',
                name: 'test 0-1-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-1-2-2-1',
                name: 'test 0-1-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-1-2-2-2',
                name: 'test 0-1-2-2-2',
                expanded: false,
                children: [
                  {
                    id: '0-1-2-2-2-0',
                    name: 'test 0-1-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-1-2-2-1',
                    name: 'test 0-1-2-0-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-1-2-2-2',
                    name: 'test 0-1-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '0-2',
    name: 'test 0-2',
    expanded: false,
    children: [
      {
        id: '0-2-0',
        name: 'test 0-2-0',
        expanded: true,
        children: []
      },
      {
        id: '0-2-1',
        name: 'test 0-2-1',
        expanded: true,
        children: []
      },
      {
        id: '0-2-2',
        name: 'test 0-2-2',
        expanded: false,
        children: [
          {
            id: '0-2-2-0',
            name: 'test 0-2-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-2-2-1',
            name: 'test 0-2-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-2-2-2',
            name: 'test 0-2-2-2',
            expanded: false,
            children: [
              {
                id: '0-2-2-2-0',
                name: 'test 0-2-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-2-2-2-1',
                name: 'test 0-2-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-2-2-2-2',
                name: 'test 0-2-2-2-2',
                expanded: false,
                children: [
                  {
                    id: '0-2-2-2-2-0',
                    name: 'test 0-2-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-2-2-2-1',
                    name: 'test 0-2-2-0-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-2-2-2-2',
                    name: 'test 0-2-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '0-3',
    name: 'test 0-3',
    expanded: false,
    children: []
  },
  {
    id: '0-4',
    name: 'test 0-4',
    expanded: false,
    children: []
  },
  {
    id: '0-5',
    name: 'test 0-5',
    expanded: false,
    children: []
  },
  {
    id: '0-6',
    name: 'test 0-6',
    expanded: false,
    children: []
  },
  {
    id: '0-7',
    name: 'test 0-7',
    expanded: false,
    children: []
  },
  {
    id: '0-8',
    name: 'test 0-8',
    expanded: false,
    children: []
  },
  {
    id: '0-9',
    name: 'test 0-9',
    expanded: false,
    children: []
  },
  {
    id: '0-10',
    name: 'test 0-10',
    expanded: false,
    children: [
      {
        id: '0-10-0',
        name: 'test 0-10-0',
        expanded: false,
        children: []
      },
      {
        id: '0-10-1',
        name: 'test 0-10-1',
        expanded: false,
        children: [
          {
            id: '0-10-1-0',
            name: 'test 0-10-1-0',
            expanded: false,
            children: []
          }
        ]
      },
      {
        id: '0-10-1',
        name: 'test 0-10-1',
        expanded: false,
        children: []
      }
    ]
  },
  {
    id: '0-11',
    name: 'test 0-11',
    expanded: false,
    children: []
  }
];

export {
    data
};
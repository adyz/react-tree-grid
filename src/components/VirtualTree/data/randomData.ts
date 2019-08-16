var RANDOM_WORDS = [
  'abstrusity',
  'advertisable',
  'bellwood',
  'benzole',
  'boreum',
  'brenda',
  'cassiopeian',
  'chansonnier',
  'cleric',
  'conclusional',
  'conventicle',
  'copalm',
  'cornopion',
  'crossbar',
  'disputative',
  'djilas',
  'ebracteate',
  'ephemerally',
  'epidemical',
  'evasive',
  'eyeglasses',
  'farragut',
  'fenny',
  'ferryman',
  'fluently',
  'foreigner',
  'genseng',
  'glaiket',
  'haunch',
  'histogeny',
  'illocution',
  'imprescriptible',
  'inapproachable',
  'incisory',
  'intrusiveness',
  'isoceraunic',
  'japygid',
  'juiciest',
  'jump',
  'kananga',
  'leavening',
  'legerdemain',
  'licence',
  'licia',
  'luanda',
  'malaga',
  'mathewson',
  'nonhumus',
  'nonsailor',
  'nummary',
  'nyregyhza',
  'onanist',
  'opis',
  'orphrey',
  'paganising',
  'pebbling',
  'penchi',
  'photopia',
  'pinocle',
  'principally',
  'prosector.',
  'radiosensitive',
  'redbrick',
  'reexposure',
  'revived',
  'subexternal',
  'sukarnapura',
  'supersphenoid',
  'tabularizing',
  'territorialism',
  'tester',
  'thalassography',
  'tuberculise',
  'uncranked',
  'undersawyer',
  'unimpartible',
  'unsubdivided',
  'untwining',
  'unwaived',
  'webfoot',
  'wedeling',
  'wellingborough',
  'whiffet',
  'whipstall',
  'wot',
  'yonkersite',
  'zonary'
];

export type RandomData = {
  id: string;
  name: string;
  expanded: boolean;
  children: RandomData[];
};
var data: RandomData[] = createRandomizedData();
function createRandomizedData() {
  // tslint:disable-next-line:no-any
  var dataR: any[] = [];

  for (var i = 0; i < 12320; i++) {
    dataR.push(createRandomizedItem(0));
  }

  return dataR;
}

function createRandomizedItem(depth: number): RandomData {
  var item: RandomData = {} as RandomData;
  item.children = [];
  const name = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
  item.name = name;
  item.id = name;

  var numChildren = depth < 6 ? Math.floor(Math.random() * 5) : 0;
  for (var i = 0; i < numChildren; i++) {
    item.children.push(createRandomizedItem(depth + 1));
  }

  item.expanded = true; // numChildren > 0 && Math.random() < 0.5;

  return item;
}

export { data };

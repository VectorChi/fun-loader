import type { FunLoaderTheme } from '../element';

const messages = [
  'Crunching the numbers…',
  'Balancing the books…',
  'Reconciling accounts…',
  'Checking the ledger…',
  'Compounding interest…',
  'Consulting the spreadsheets…',
  'Auditing the decimals…',
  'Reading the market…',
  'Diversifying thoughts…',
  'Rounding to the nearest cent…',
  'Calculating returns…',
  'Closing the quarter…',
];

export const finance: FunLoaderTheme = {
  name: 'finance',
  messages,
  stages: [
    { after: 0, messages },
    {
      after: 8000,
      messages: [
        'Lots of rows to get through…',
        'Big spreadsheet, still going…',
        'Thorough beats fast here…',
        'More data than usual…',
        'Still adding it all up…',
        'Working down the long tail…',
        'Every cell gets a look…',
      ],
    },
    {
      after: 20_000,
      messages: [
        'A big report takes a while…',
        'Still working through it…',
        'Accuracy over speed…',
        'Still crunching, carefully…',
      ],
    },
  ],
};

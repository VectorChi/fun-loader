import type { FunLoaderTheme } from '../element';
import { staged } from './stages';

const messages = [
  'Reconciling the ledger…',
  'Hunting a stray decimal…',
  'Carrying the one…',
  'Freezing the top row…',
  'Widening column B…',
  'Rounding, but responsibly…',
  'Checking it adds up twice…',
  'Tidying the pivot table…',
  'Reading the footnotes…',
  'Lining up the quarters…',
  'Color-coding the cells…',
  'Summing the summaries…',
  'Sorting receipts by date…',
];

export const finance: FunLoaderTheme = {
  name: 'finance',
  messages,
  stages: staged(
    messages,
    [
      'Lots of rows to get through…',
      'Big spreadsheet, still going…',
      'Thorough beats fast here…',
      'More data than usual…',
      'Still adding it all up…',
      'Working down the long tail…',
      'Every cell gets a look…',
    ],
    [
      'A big report takes a while…',
      'Still working through it…',
      'Accuracy over speed…',
      'Still counting, carefully…',
    ],
  ),
};

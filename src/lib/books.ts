import { getCollection, type CollectionEntry } from 'astro:content';

export const seriesOrder = [
  { id: 'starside-saga', name: 'Starside Saga' },
  { id: 'starside-tales', name: 'Starside Tales' },
  { id: 'scion-chronicles', name: 'The Scion Chronicles' },
  { id: 'bigfoot-galaxy', name: 'Bigfoot Galaxy / Undermountain' },
  { id: 'sal-van-sleen', name: 'Sal Van Sleen' },
] as const;

export async function getBooksBySeries() {
  const books = await getCollection('books');
  return seriesOrder.map((series) => ({
    ...series,
    books: books
      .filter((book) => book.data.series === series.id)
      .sort((a, b) => a.data.seriesOrder - b.data.seriesOrder || a.data.catalogOrder - b.data.catalogOrder),
  }));
}

export type BookEntry = CollectionEntry<'books'>;

export const isImdbId = (id: string) => {
  return id.length === 9 && id.startsWith('tt');
};

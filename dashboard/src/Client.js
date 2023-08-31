import { sheetTransformer } from './transformers';

const apiPrefix = process.env.REACT_APP_API;

export const loadData = async () => {
  const response = await fetch(`${apiPrefix}/sheets/1rq4k5J2qIvVfZY_PbjNCPBLGEkqhbn7wMXW5752xN8E`);
  return sheetTransformer(await response.json())
}

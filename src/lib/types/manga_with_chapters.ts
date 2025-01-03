import type { Chapter } from './chapter';
import type { Manga } from './manga';

export type MangaWithChapters = Manga & {
    chapters: Chapter[];
}

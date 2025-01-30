interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordResponse {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

type ApiResponse = WordResponse[];

type WordState = {
  words: WordResponse[];
  loading: boolean;
  error?: string;
}
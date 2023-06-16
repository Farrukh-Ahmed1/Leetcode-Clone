export type example = {
    id: number;
    inputText: string;
    outputText: string;
    explanation?: string;
    img?: string;
  };
  
  //Local Problem Data

  export type Problem = {
    id: string;
    title: string;
    problemStatement: string;
    examples: example[];
    constraints: string;
    order: number;
    starterCode: string;
    handlerFunction: ((fn: any) => boolean) | string;
    starterFunctionName: string;
  };

  // Databse Problem Data

  export type DBProblem = {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    likes: number;
    dislikes: number;
    order: number;
    videoId?: string;
    link?: string;
  };
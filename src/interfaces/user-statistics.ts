export interface IUserStatistics {
  email      : string;
  randomGames: Array<IRandomGames>;
  dailyGames : Array<IDailyGames>;
}

export interface IRandomGames {
  date            : string;
  _id             : string;
  hardMode        : boolean;
  solved          : boolean;
  solvedInAttempts: number;
  attempts        : {
    letters: Array<Array<string>>;
    colors : Array<Array<string>>;
  };
}

export interface IDailyGames {
  date            : string;
  _id             : string;
  hardMode        : boolean;
  solved          : boolean;
  solvedInAttempts: number;
  attempts        : {
    letters: Array<Array<string>>;
    colors : Array<Array<string>>;
  };
}

export interface IStatisticsObject {
  played           : number;
  percentageWins   : number;
  maxStreak        : number;
  currentStreak    : number;
  guessDistribution: number[];
}

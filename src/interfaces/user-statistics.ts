export interface IUserStatistics{
    email   : string,
    randomGames : Array<IRandomGames>,
    dailyGames : Array<IDailyGames>
}

export interface IRandomGames{
    solved : boolean,
    solvedInAttempts : number,
    attempts : Array<Array<string>>,
}

export interface IDailyGames{
    date : string,
    _id : string,
    solved : boolean,
    solvedInAttempts : number,
    attempts : Array<Array<string>>,
}
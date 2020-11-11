function getScore(res) {
    const splittedInform = res.trim().split(' ');
    const score = parseInt(splittedInform[splittedInform.length - 1]);
    const name = splittedInform.slice(0, splittedInform.length - 1).join(' ');
    return { score, name };
}

function solution(gameResult) {
    if (!Array.isArray(gameResult)) {
        console.log("Please input the game result as an array");
        return;
    }
    let teams = {};
    gameResult.forEach(result => {
        const individualResult = result.split(',');
        const firstTeam = getScore(individualResult[0]);
        const secondTeam = getScore(individualResult[1]);

        if (teams[firstTeam.name] === undefined) teams[firstTeam.name] = 0;
        if (teams[secondTeam.name] === undefined) teams[secondTeam.name] = 0;

        if (firstTeam.score > secondTeam.score)
            teams[firstTeam.name] += 3;
        else if (firstTeam.score === secondTeam.score)
            teams[firstTeam.name] += 1, teams[secondTeam.name] += 1;
        else
            teams[secondTeam.name] += 3;        
    }); 
    
    let teamOrders = Object.keys(teams).sort((name1, name2) => (teams[name2] === teams[name1] ? name1.localeCompare(name2) : teams[name2] - teams[name1]  ) );

    let savedIndex = 1;
    return teamOrders.map((teamOrder, index) => {
        if (index > 0 && teams[teamOrder] === teams[teamOrders[index - 1]]) {
            return `${savedIndex + 1}. ${teamOrder}, ${teams[teamOrder]} ${teams[teamOrder] === 1 ? 'pt' : 'pts'}`;
        }
        savedIndex = index;
        return `${index+1}. ${teamOrder}, ${teams[teamOrder]} ${teams[teamOrder] === 1 ? 'pt' : 'pts'}`;
    });
}

console.log(
    solution(["Lions 3, Snakes 3",
        "Tarantulas 1, FC Awesome 0",
        "Lions 1, FC Awesome 1",
        "Tarantulas 3, Snakes 1",
        "Lions 4, Grouches 0"
    ])
);

//Result:
/*
[
    '1. Tarantulas, 6 pts',
    '2. Lions, 5 pts',
    '3. FC Awesome, 1 pt',
    '3. Snakes, 1 pt',
    '5. Grouches, 0 pts',
]
*/
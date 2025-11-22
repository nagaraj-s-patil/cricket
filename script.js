  let scoreStr = localStorage.getItem('score');
  let score;
  ResetScore(scoreStr);

  function ResetScore(scoreStr){
    score = scoreStr ? JSON.parse(scoreStr) : { win:0, lose:0, tie:0 };

    score.displayScore = function(){
      return `Win: ${score.win} | Lose: ${score.lose} | Tie: ${score.tie}`;
    };
    showResult();
  }

  function genratingComputerChoose(){
    let random = Math.random() * 3;
    if(random <= 1) return 'bat';
    else if(random <= 2) return 'bol';
    else return 'stump';
  }

  function getResult(user, comp){
    if(user === comp){
      score.tie++;
      return "Tie 😐";
    }

    if(
      (user === 'bat' && comp === 'bol') ||
      (user === 'bol' && comp === 'stump') ||
      (user === 'stump' && comp === 'bat')
    ){
      score.win++;
      return "You Win 🎉";
    }

    score.lose++;
    return "Computer Wins 🤖";
  }

  function playGame(userChoice){
    const computer = genratingComputerChoose();
    const resultMsg = getResult(userChoice, computer);
    showResult(userChoice, computer, resultMsg);
    localStorage.setItem('score', JSON.stringify(score));
  }

  function showResult(user, comp, msg){
    document.getElementById('usermove').innerText = user ? `👤 You: ${user}` : '';
    document.getElementById('computermove').innerText = comp ? `🤖 Computer: ${comp}` : '';
    document.getElementById('result').innerText = msg ? msg : '';
    document.getElementById('score').innerText = `Score → ${score.displayScore()}`;
  }
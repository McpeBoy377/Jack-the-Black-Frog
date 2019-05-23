const Discord= require("discord.js");
const bot = new Discord.Client();
const token="NTc4NTc4Mjc2MTUxMzI4NzY4.XN1p_Q.Wqwy-6sdjZvbkd1nONSao-ShcuA"
var draw1;
var draw2;
var players = [];
var credits = [];
var cardNums = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];
var royals = ["Jack","Queen","King"];
var card3 = Math.floor(Math.random() * 13);
var game = false;
var total = 0;
var c3f=["10","Jack","Queen","King"];

bot.on("ready",async() => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("?help for help",{type:'Playing'});
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?help") {
    msg.channel.send("---Help Menu---");
    msg.channel.send("?credits - shows balance");
    msg.channel.send("?blackjack - play blackjack (what did you expect?)")
    msg.channel.send("?whom - shows the authors");
  }
}
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?whom") {
    msg.channel.send("2019 Programmed and tested by Hayden Rose and David Kleyman");
  }
}
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?blackjack" && game == false) {
    msg.channel.send("Starting new game");
        if(!players.includes(msg.author.id)){
          console.log("adding new user! " + msg.author.id);
          players.push(msg.author.id);
          credits.push(200);
    }
    credits[players.indexOf(msg.author.id)] -= 50;
    draw1 = Math.floor(Math.random() * 13);
    draw2 = Math.floor(Math.random() * 13);
    if (draw1 >10){
    }
    console.log("New Game by " +msg.author.id);
    console.log(draw1);
    console.log(draw2);
    game = true;
    total = 0; 
    msg.channel.send("--Commands--");
    msg.channel.send("?hit - draws new card to add to total");
    msg.channel.send("?stay - keeps current cards for final amount");
   
    if(draw1 > 9 && draw2 > 9){
      if(draw2 = 10){
      total = 1 + draw1 + draw2;
      }else if(draw = 11){
        total = draw1 + draw2;
      }else{
        total = draw1 + draw2 - 1;
      }
       if(draw2 = 10){
      total += 1;
      }else{
        total -= 1;
      }
    msg.channel.send("You pulled a " + royals[(draw2) - 10] + " and a " +royals[(draw1) - 10] + " for a total of 20");
    
    } else if(draw1 > 9){
       if(draw1 = 10){
      total = 1 + draw1 + draw2;
      }else if(draw1 = 11){
        total = draw1 + draw2;
      }else{
        total = draw1 + draw2 - 1
      }
      msg.channel.send("You pulled a " + cardNums[draw2] + " and a " +royals[(draw1) - 10] + " for a total of " + total);
    
    }else if(draw2 > 9){
      if(draw2 = 10){
      total = 1 + draw1 + draw2;
      }else if(draw2 = 11){
        total = draw1 + draw2;
      }else{
        total = draw1 + draw2 - 1
      }
      msg.channel.send("You pulled a " + royals[(draw2) - 10] + " and a " +cardNums[draw1] + " for a total of " + total);
      
      }else{
        total = 2 + draw1 + draw2;
        msg.channel.send("You pulled a " + cardNums[draw2] + " and a " +cardNums[draw1] + " for a total of " + total);
      }
  }else{
    msg.channel.send("There is already a game in progress!");
  }
}
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?hit" && game == true) {
        card3=Math.floor(Math.random() * 13);
        if (card3>=10){
        card3=10;
        c3f[Math.floor(Math.random() *3)];
        msg.channel.send("You pulled a "+c3f[Math.floor(Math.random() *3)]+ " and had "+ total);
        total+=card3;
        }else{
          msg.channel.send("You pulled a " + cardNums[card3] + " and had a total of " + total);
           total = total + 1 + card3
        }
        msg.channel.send("Your new Total is " + total);
        if(total > 21){
        msg.channel.send("Bust!");
        game = false;
        }
  }
}
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?stay" && game == true) {
         var dealerTotal = Math.floor(Math.random() * 6) + 17;
    msg.channel.send("You stood at a final total of " + total);
    msg.channel.send("The dealer stood with a total of " + dealerTotal);
    if(total <= dealerTotal && dealerTotal <= 21){
      msg.channel.send("You Lose");
    }else{
      msg.channel.send("You Win!");
      credits[players.indexOf(msg.author.id)] += 100;
    }
    game = false;
    msg.channel.send("You now have " + credits[players.indexOf(msg.author.id)] + " credits");
  }
}
});

bot.on('message', msg => {
    if (msg.author.id != bot.user.id) {
      if(msg.content == "?credits" && players.includes(msg.author.id)) {
    msg.channel.send("You currently have " + credits[players.indexOf(msg.author.id)] + "credits!");
  }else
  {
    msg.channel.send("You have not setup an account, use ?blackjack to start a game and setup your account!");
  }
}
});

bot.login(token);

process.on ('exit', code => {

  console.log (`Whoa! Exit code ${code}, cleaning up...`);

  

});

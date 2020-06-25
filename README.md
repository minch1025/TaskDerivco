# TaskDerivco
```
📍Goal : Make slotmachine for web-app  
Language : Javascript / CSS / HTML  
Libraries : JQuery  
 **Plus Note : Just try to make wheel rotation test for react.js **  
```  
https://github.com/minch1025/ReelTest

 Screenshots
-------------------------------------
<div>
  <img width="240" alt="Result_screen" src="https://user-images.githubusercontent.com/46733592/85520084-67dcb800-b63d-11ea-9fec-753ec2ea5316.png">
</div>


# Requirements(Detailed description)

Slot machine page has following interface elements:   
```
✅ Reels Image(5 symbols in order: 3xBAR, BAR, 2xBAR, 7, CHERRY)
✅ pay-table  
✅ balance indicator (text-box)  
✅ SPIN button  
✅ Debug area 

```
## Result  
### Successful requirements  
1. Reels  
   ⭕️ Reel movement :   
   📍 Use CSS marginTop   
    (The shape of the slot moves down by starting at the above position with the initial value of MarginTop minus (-150px) and slowly changing MarginTop from            negative to zero(0px).)    
    
   📍JQuery "jQuery easing" Libraries  
    Use animation movement.  
   ⭕️ Reel visualization (Show Top Bottom line partly)  

2. pay-table  
   ⭕️ 3 CHERRY symbols on top line 2000  
   ⭕️ 3 CHERRY symbols on center line 1000  
   ⭕️ 3 CHERRY symbols on bottom line 4000  
   ⭕️ 3 7 symbols on any line 150   
   ⭕️ 3 2xBAR symbols on any line 20  
   ⭕️ 3 BAR symbols on any line 10   
    
3. balance indicator (text-box)  
   ⭕️ Fixed text-box range 1-5000  
4. SPIN button   
   ⭕️ Spin costs player : 1 coin. (Credit will down 1 points when game is stopped.)  
   ⭕️ Reel playtime : Total - 2 seconds    
                      One by one (starting from left) having 0.5 sec delay between landings.
### Deficient requirements
   ☠️☠️☠️☠️  Debug area  
   ☠️☠️☠️☠️ pay-table  
        Any combination of CHERRY and 7 on any line 75 3 3xBAR symbols on any line 50   
        Combination of any BAR symbols on any line 5  
### Added requirements
   ➕ Lucky percentage  
   ➕ Reel animation (Stopped pattern)  
      Add Bouncing effect with easing libraries function.   
   ➕ Use google Font   
      Used Font name : Press Start 2P  
    


## Game process 

 Original : Click Start Button  ▶️  Reel Rotation start   ▶️ Reel stopped  ▶️ Crdit -1 coin (play coin)  
            ▶️  Reel pay-table decision ( + OR Nothing ) ▶️ Credit updated   
  Sub     : Insert Batting Coin (Slot validation (1-5000))▶️  Click Batting button  ▶️ Credit updated  
## Memo
Explain about Task time controll  
```
It took a little time to select the language and architect.
It was the first time for me to faced with game logic and method.
First, I tried to make a slot using React.js
(Please check https://github.com/minch1025/ReelTest)
However, I realized that pure Javascript and JQuery is a simple way to solve this game logic.
So this works affected to solve the other left tasks.
By the way, I used JQuery for the first time.
I found out several useful things and differences compare to React.js
If you are interested and would like to know more about my skills, please let me know.
```
https://github.com/minch1025/ReelTest
<img width="300" alt="DemoImage3" src="https://user-images.githubusercontent.com/46733592/85551759-48558780-b65d-11ea-9ad1-88b65fa619d6.png">

# TaskDerivco
```
📍Goal : Make slotmachine for web-app  
Language : Javascript / CSS / HTML  
Libraries : JQuery  
 **Plus Note : Just try to make wheel rotation test for react.js **  
```

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



## Memo

$body = $('body')[0];
$paragraph = $('p')[0];
$grid = document.createElement("ul");
$gridLength = 16;
$gridMin = 0;
$gridMax = 3;
$xCoord = 0;
$yCoord = 0;  
$gamePlaying = true;


$classArray = ["two", "four", "eight","sixteen", "thirtyTwo", "sixtyFour", "hundredTwentyEight", "twoHundredFiftySix", "FiveHundredAndTwelve", "oneThousandTwentyFour", "yay"];

//_____________CREEER GRID_____________

for(i=0; i<$gridLength; i++){
     $newElem = document.createElement("li"); 
     $newElem.id='el'+i;
     $grid.appendChild($newElem);
}

$body.insertBefore($grid, $paragraph);


$gridArray = [
    [$( "ul li:nth-child(1)"), $( "ul li:nth-child(2)"), $( "ul li:nth-child(3)"), $( "ul li:nth-child(4)")],
    [$( "ul li:nth-child(5)"), $( "ul li:nth-child(6)"), $( "ul li:nth-child(7)"), $( "ul li:nth-child(8)")],
    [$( "ul li:nth-child(9)"), $( "ul li:nth-child(10)"), $( "ul li:nth-child(11)"), $( "ul li:nth-child(12)")],
    [$( "ul li:nth-child(13)"), $( "ul li:nth-child(14)"), $( "ul li:nth-child(15)"), $( "ul li:nth-child(16)") ]
];



//______________RANDOM_____________


function randomNumber(max){
  return Math.floor(Math.random() * max); 
}

//______________FIND EMPTY BOX____________

function emptyPlace(){
 $empty = [];
 for(i=0; i<$gridLength; i++){
   if($( "ul li:nth-child("+(i+1)+")" ).children().length == 0){
   $empty.push($( "ul li:nth-child("+(i+1)+")" ));
   }
 } 
 $randomEmpty = randomNumber($empty.length); 
 
  //GAME OVER
 if($empty.length == 1){
  $('span').addClass('visible');
   $gamePlaying = false;
 } 
 return $empty[$randomEmpty];
  
}

//______________NEW TILE____________


function newTile(){
    $newTile = document.createElement("div");
    $className = "two"  
  
    $rand = randomNumber(100);
    if($rand>80){
      $className = "four";
    }
    $place = emptyPlace(); 
    $("<div class="+$className+"></div>")
      .hide()
      .appendTo($place)
      .fadeIn("slow");
    
}

//Start spel
newTile();
newTile();

//______________ARROW KEY HANDLING____________



$(document).keydown(function(e){
    if($gamePlaying==true){
      if (e.keyCode == '38') {
         moveUp();
      }
      else if (e.keyCode == '40') {
         moveDown();
      }
      else if (e.keyCode == '37') {
         moveLeft();
      }
      else if (e.keyCode == '39') {
         moveRight();
      }
      if (e.keyCode > 36 && e.keyCode < 41) {
        
      }
    }
});
     



function moveUp(){
    $dontMove = true;
    //Check één keer of klasses van eerstvolgende tegel hetzelfde zijn en zoja samenvoegen
    for($y=0; $y<=$gridMax; $y++){
      
      for($x=0; $x<$gridMax; $x++){
        $xCoordRowOne = $x;
        $xCoordRowTwo = $x+1;
        $firstRowEl = $gridArray[$xCoordRowOne][$y].children(":first");
        $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first");
        //als beide een tegel zijn, dus eerstvolgende checken
        if($firstRowEl.attr('class') != undefined && $secondRowEl.attr('class') != undefined){
          if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
            mergeBlocks($firstRowEl,$secondRowEl);
          }
         //als onderste een tegel is, tweede en derde opvolgende checken
        }else if($firstRowEl.attr('class') != undefined){
          //DUBBELE CODE HELEP!!!!!
              if($xCoordRowTwo!==$gridMax){
                $xCoordRowTwo+=1;
              }
              $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first");
              //check tweede opvolgende 
              if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                 mergeBlocks($firstRowEl,$secondRowEl);
                
              }
              //check derde opvolgende 
              else if($secondRowEl.attr('class') == undefined){
                //DUBBELE CODE HELEP!!!!!
                if($xCoordRowTwo!==$gridMax){
                  $xCoordRowTwo+=1;
                }
                $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first");
                if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                   mergeBlocks($firstRowEl,$secondRowEl);
                }
              }
        }
      }
    }
//schuif allemaal naar boven -> in functie voor onder, links, rechts
 setTimeout(function(){
   
      for($i=0; $i<=$gridMax; $i++){
        for($y=0; $y<=$gridMax; $y++){
          for($x=0; $x<$gridMax; $x++){
            $xCoordRowOne = $x;
            $xCoordRowTwo = $x+1;
            $nextParent = $gridArray[$xCoordRowOne][$y];
            $elementParent = $gridArray[$xCoordRowTwo][$y];
            
            if($elementParent.children().length != 0){
               $element = $gridArray[$xCoordRowTwo][$y].children(":first");
            
                if($nextParent.children().length == 0){
                  $element.detach();
                  $nextParent.append($element);
                  $dontMove = false;
                }
            }
          }
        }
      }
          
    },100);
  setTimeout(function(){
            //niet als niks verschoven en of samengevoegd
        if($dontMove==false){
           newTile();  
        }

   },220); 
}
function moveDown(){
    $dontMove = true;
    //Check één keer of klasses van eerstvolgende tegel hetzelfde zijn en zoja samenvoegen
    for($y=$gridMax; $y>=0; $y--){ 
      
      for($x=$gridMax; $x>0; $x--){
        $xCoordRowOne = $x; 
        $xCoordRowTwo = $x-1;
        
        $firstRowEl = $gridArray[$xCoordRowOne][$y].children(":first");
        $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first");
        //als beide een tegel zijn, dus eerstvolgende checken
        if($firstRowEl.attr('class') != undefined && $secondRowEl.attr('class') != undefined){
          if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
            mergeBlocks($firstRowEl,$secondRowEl);
          }
         //als bovenste een tegel is, tweede en derde opvolgende checken 
        }else if($firstRowEl.attr('class') != undefined){
          //DUBBELE CODE HELEP!!!!!
          
              if($xCoordRowTwo!==0){ 
                $xCoordRowTwo-=1;
              }
              $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first");
              //check tweede opvolgende 
              if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                 mergeBlocks($firstRowEl,$secondRowEl);
              }
              //check derde opvolgende 
              else if($secondRowEl.attr('class') == undefined){
                //DUBBELE CODE HELEP!!!!!
                if($xCoordRowTwo!==0){
                  $xCoordRowTwo-=1;
                }
                $secondRowEl = $gridArray[$xCoordRowTwo][$y].children(":first"); 
                if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                   mergeBlocks($firstRowEl,$secondRowEl);
                }
              }
        }
      }
    }
    setTimeout(function(){
      for($i=0; $i<=$gridMax; $i++){
        for($y=$gridMax; $y>=0; $y--){ 
          for($x=$gridMax; $x>0; $x--){
            $xCoordRowOne = $x; 
            $xCoordRowTwo = $x-1;
            $nextParent = $gridArray[$xCoordRowOne][$y];
            $elementParent = $gridArray[$xCoordRowTwo][$y];
            
            if($elementParent.children().length != 0){
               $element = $gridArray[$xCoordRowTwo][$y].children(":first");
            
                if($nextParent.children().length == 0){
                  $element.detach();
                  $nextParent.append($element);
                  $dontMove = false;
                }
            }
          }
        }
      }
          
    },100);
    setTimeout(function(){
            //niet als niks verschoven en of samengevoegd
        if($dontMove==false){
           newTile();  
        }

   },220); 
}
function moveLeft(){
    $dontMove = true;
    for($x=0; $x<=$gridMax; $x++){ 
      
      for($y=0; $y<=$gridMax-1; $y++){ 
        $yCoordRowOne = $y; 
        $yCoordRowTwo = $y+1;
        $firstRowEl = $gridArray[$x][$yCoordRowOne].children(":first");
        $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first");
        
        //als beide een tegel zijn, dus eerstvolgende checken
        if($firstRowEl.attr('class') != undefined && $secondRowEl.attr('class') != undefined){
          if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
            mergeBlocks($firstRowEl, $secondRowEl);
            $dontMove = false;
          }
         //als meest rechtse een tegel is, tweede en derde opvolgende checken 
        }else if($firstRowEl.attr('class') != undefined){
          //DUBBELE CODE HELEP!!!!!
          
              if($yCoordRowTwo!==3){ 
                $yCoordRowTwo+=1;
              }
              $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first");
              //check tweede opvolgende 
              if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                 mergeBlocks($firstRowEl,$secondRowEl);
                 $dontMove = false;
              }
              //check derde opvolgende 
              else if($secondRowEl.attr('class') == undefined){
                //DUBBELE CODE HELEP!!!!!
                if($yCoordRowTwo!==3){
                  $yCoordRowTwo+=1;
                }
                $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first"); 
                if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                   mergeBlocks($firstRowEl,$secondRowEl);
                   $dontMove = false;
                }
              }
        }
      }
    }
    setTimeout(function(){
      for($i=0; $i<=$gridMax; $i++){
        for($x=0; $x<=$gridMax; $x++){ 
          for($y=0; $y<=$gridMax-1; $y++){ 
            $yCoordRowOne = $y; 
            $yCoordRowTwo = $y+1;
            $nextParent = $gridArray[$x][$yCoordRowOne];
            $elementParent = $gridArray[$x][$yCoordRowTwo];
            
            if($elementParent.children().length != 0){
               $element = $gridArray[$x][$yCoordRowTwo].children(":first");
            
                if($nextParent.children().length == 0){
                  $element.detach();
                  $nextParent.append($element);
                  $dontMove = false;
                }
            }
            
          }
        }
      }
          
    },100);
    setTimeout(function(){
            //niet als niks verschoven en of samengevoegd
        if($dontMove==false){
           newTile();  
        }

   },220); 
};
function moveRight(){
  $dontMove = true;
  for($x=0; $x<=$gridMax; $x++){
    
      for($y=$gridMax; $y>0; $y--){ 
 
        $yCoordRowOne = $y; 
        $yCoordRowTwo = $y-1;
        $firstRowEl = $gridArray[$x][$yCoordRowOne].children(":first");
        $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first");
        
        //als beide een tegel zijn, dus eerstvolgende checken
        if($firstRowEl.attr('class') != undefined && $secondRowEl.attr('class') != undefined){
          if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
            mergeBlocks($firstRowEl, $secondRowEl);
          }
         //als meest rechtse een tegel is, tweede en derde opvolgende checken 
        }else if($firstRowEl.attr('class') != undefined){
          //DUBBELE CODE HELEP!!!!!
          
              if($yCoordRowTwo!==0){ 
                $yCoordRowTwo-=1;
              }
              $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first");
              //check tweede opvolgende 
              if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                 mergeBlocks($firstRowEl,$secondRowEl);
              }
              //check derde opvolgende 
              else if($secondRowEl.attr('class') == undefined){
                //DUBBELE CODE HELEP!!!!!
                if($yCoordRowTwo!==0){
                  $yCoordRowTwo-=1;
                }
                $secondRowEl = $gridArray[$x][$yCoordRowTwo].children(":first"); 
                if($firstRowEl.attr('class')==$secondRowEl.attr('class')){
                   mergeBlocks($firstRowEl,$secondRowEl);
                }
              }
        }
      }
    }
   setTimeout(function(){
      for($i=0; $i<=$gridMax; $i++){
        for($x=0; $x<=$gridMax; $x++){
           for($y=$gridMax; $y>0; $y--){
            $yCoordRowOne = $y; 
            $yCoordRowTwo = $y-1;
            $nextParent = $gridArray[$x][$yCoordRowOne];
            $elementParent = $gridArray[$x][$yCoordRowTwo];
            
            if($elementParent.children().length != 0){
               $element = $gridArray[$x][$yCoordRowTwo].children(":first");
            
                if($nextParent.children().length == 0){
                  $element.detach();
                  $nextParent.append($element);
                  $dontMove = false;
                }
            }
          }
        }
      }
          
    },100);
  setTimeout(function(){
            //niet als niks verschoven en of samengevoegd
        if($dontMove==false){
           newTile();  
        }

   },220); 
}; 




function mergeBlocks(firstRowElement, secondRowElement){  
               $firstRowEl = firstRowElement;
               $secondRowEl = secondRowElement;
               $secondRowEl.detach();
               $nextClass = '';
               for(i=0; i<$classArray.length; i++){
                  if($firstRowEl.attr('class')==$classArray[i]){
                          $nextClass = $classArray[i+1];
                          break;
                  }
               }
               $firstRowEl.attr('class', $nextClass);
               //animatie
               $firstRowEl.data('original-size', $firstRowEl.css('fontSize'));
               $originalSize = $firstRowEl.data('original-size');
               
               $firstRowEl.animate({
                  fontSize: ($originalSize.slice(0, -2)*1.25)
               }, 110);
               $firstRowEl.animate({
                  fontSize: $originalSize
               }, 110);
}


//______________________MOVE________________________

/*function filledPlaces(){
 $filled = [];
 for(i=0; i<$gridLength; i++){
   if($( "ul li:nth-child("+(i+1)+")" ).children().length != 0){
      $filled.push($( "ul li:nth-child("+(i+1)+")" ));
   }
 } 
  return $filled;
}

function getParent(direction){
   
   $filledBoxes = filledPlaces();
  
    for(i=0; i<$filledBoxes.length; i++){
       $parent= $filledBoxes[i];
       //wat zijn de x en y coördinaten van alle bestaande tegels
       for(x=0; x<$gridArray.length; x++){
         for(y=0; y<$gridArray.length; y++){
          if($gridArray[x][y].attr('id')==$parent.attr('id')){
            $el = $filledBoxes[i].children(":first");
            $xCo = x;
            $yCo = y;
            //verplaats deze
            move(direction,$el,$xCo,$yCo);
          }
         }
       }
    }
}

function move(direction, element, x, y){
  $direction = direction;
  $xCoord = x;
  $yCoord = y;
  $element = element;
  

    for(f=0; f<$gridMax; f++){
          switch ($direction) {
              case "up":
                  if($xCoord!=$gridMin){
                    $xCoord-=1;  
                  }
                  break;
              case "down":
                  if($xCoord!=$gridMax){
                    $xCoord+=1;
                  }
                  break;
              case "left":
                  if($yCoord!=$gridMin){
                    $yCoord-=1;
                  }
                  break;
              case "right":
                  if($yCoord!=$gridMax){
                    $yCoord+=1;
                  }
                  break;
           }
            
            $nextParent= $gridArray[$xCoord][$yCoord];

            if($nextParent.children().length == 0){
                  $element.detach();
                  $nextParent.append($element);
            }
            
              
            }


} 




*/


//______________FIND ALL FILLED BOXES_____

/*function filledPlaces(){
 $filled = [];
 for(i=0; i<$gridLength; i++){
   if($( "ul li:nth-child("+(i+1)+")" ).children().length != 0){
      $filled.push($( "ul li:nth-child("+(i+1)+")" ));
   }
 } 
  return $filled;
}


function getElements(){
   
   $filledBoxes = filledPlaces();
   $elements = [];
    for(i=0; i<$filledBoxes.length; i++){
       $parent= $filledBoxes[i];
       //wat zijn de x en y coördinaten van alle bestaande tegels
       for(x=0; x<$gridArray.length; x++){
         for(y=0; y<$gridArray.length; y++){
          if($gridArray[x][y].attr('id')==$parent.attr('id')){
            $el = $filledBoxes[i].children(":first");
            $xCo = x;
            $yCo = y;
            $object = {element : $el, xCoord: $xCo, yCoord: $yCo };
            $elements.push($object);   
          }
         }
       }
    }
    return $elements;
}*/
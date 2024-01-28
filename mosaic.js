let colorPallete = ['white',
'red',
'orange',
'yellow',
'green',
'blue',
'indigo'
,'violet',
'black']
;

let toolOptions = [
{toolName: "single-select"  },
{toolName: "select-all"},
{toolName: "select-row" },
{toolName: "select-column" },
{toolName: "diagonal-up"},
{toolName: "diagonal-down"},
{toolName: "reset-all" },

]



let gridSize = 9;


let currentColorSelection = "rgb(255,255,255)";
let mouseDown = false;
let formerColorSelection;
let activeTool = "single-select";
let hoverScaling = 1.2





let colorSelectMenu = document.getElementById("color-select-menu");

//create the grid rows
for (var i = 0; i < gridSize; i++) {
    $("#grid-container").append(`<div class ="grid-row " id="grid-row-${i}"></div>`)
    
};

//fill the grid rows with individual grid unites
for (let e = 0; e < gridSize; e++){
    let appendArray = []
    for(let i = 0; i < gridSize; i++){
        appendArray.push(`<div id="${e}-${i}" class="grid-unit grid-row${e} grid-column${i}"></div>`)
    }
    $("#grid-row-"+e).append(appendArray.toString())
}


// create the color selection menu
colorPallete.forEach((color=>{
    $("#color-select-menu").append(`<div class="color-select" id="${color}" style="background-color:${color};"></div>`)
    }));






//create the tool selection menu

for(i = 0; i < toolOptions.length; i++){
    $("#tool-container").append(`<div class="tool-outer" id="tool-outer-${toolOptions[i].toolName}"><div id="${toolOptions[i].toolName}" class="tool" ></div><div>`)
}

//add functionality to the tool select buttons

$('.tool-outer').on('click', function(){

    if(this.id.includes("reset-all") ){
       
        $(".grid-unit").css("background-color","black")
    } else {
        activeTool = this.id.replace("tool-outer-","");
       
        $(".tool-selected").removeClass('tool-selected');
        $(this).addClass('tool-selected');
    }
    
    
})


//add functionality to color select buttons
$(".color-select").on("click", function(event){
    
    let colorTarget = $(this).css("background-color");
    currentColorSelection = colorTarget;
  
    $(".selected").removeClass('selected');
    $("#"+event.target.id).addClass('selected');
});

//set white as default color and single select as default tool
$("#white").addClass("selected")
$("#tool-outer-single-select").addClass("tool-selected")




//style functions


function setSingleBackground(target){
    target.css("background-color",`${currentColorSelection}`)
}

function setBorder(target){
    $(target).css("border",`2px solid ${currentColorSelection}`)
}

function setBackground(target){
    $(target).css("background-color", `${currentColorSelection}`)
}

function setHoverSize(target){
    $(target).css({"transform": `scale(${hoverScaling})`,"cursor":"pointer"})
}

function resetHoverStyles(target){
    let innerToolId = target.id.replace("tool-outer-","")
    $("#"+innerToolId).css({"background-color":"white"})
    $(target).css("transform","scale(1)")
}

function setToolHoverStyles(target){
    let innerToolId = target.id.replace("tool-outer-","")
    
   
    if(target.id.includes("reset-all")){
        $("#"+innerToolId).css("background-color","red")
        
    }else {
        $("#"+innerToolId).css("background-color", "gold")
    }
}









    //on hover styles
$(".grid-unit").on("mouseenter",function(){
    
    $(this).css("border", `2px solid ${currentColorSelection}`);
    
    if (mouseDown == true && activeTool == "single-select") {
        setBackground(this)

    }else if(activeTool == "select-all"){
        setBorder(".grid-unit")

    }else if (activeTool == "select-row"){
        setBorder(`.grid-row${this.id.split('')[0]}`)
    } else if (activeTool == "select-column"){

        setBorder(`.grid-column${this.id.split('')[2]}`)

    } else if (activeTool == "diagonal-up"){

        let currentDiagonalUpSelection = Number(this.id[0])+Number(this.id[2]);
        for (i = 0; i <gridSize; i++){
            setBorder("#"+i+"-"+(currentDiagonalUpSelection - i))
        } 
    } else if( activeTool == "diagonal-down"){

        let currentDiagonalDownSelection = Number(this.id[0])-Number(this.id[2]);
            for (i = 0; i <gridSize; i++){

                if((i-currentDiagonalDownSelection) < 0){
                  
                }else{
                    setBorder(`#${i}-${i - currentDiagonalDownSelection}`)
                }
        }
    }
}).on("mouseleave",function(){
    
        $(".grid-unit").css("border", `2px solid slategray`)
    
});

$(".tool-outer").on("mouseenter", function(){
    if(this.id.includes("select-column") || this.id.includes("diagonal-up")){
        
        $(this).css({"transform": `scale(1.2) rotate(90deg)`,"cursor":"pointer"})
        setToolHoverStyles(this)
    } else if(this.id.includes("reset-all") ){
        setHoverSize(this)
        setToolHoverStyles(this)
    } else {
        
        setHoverSize(this)
        setToolHoverStyles(this)
    }
}).on("mouseleave",function(){
   
    if(this.id.includes("select-column") || this.id.includes("diagonal-up")){
        
        let innerToolId = this.id.replace("tool-outer-","")
        $(this).css({"transform": `scale(1) rotate(90deg)`})
        $("#"+innerToolId).css("background-color","white")
    } else {
        
        resetHoverStyles(this)
    }
})

    //on click styles

    $(".grid-unit").on("mousedown",function(){
        
        

        if(activeTool == "single-select"){
            setBackground(this)
        } else if(activeTool =="select-all"){

            setBackground(".grid-unit")
        } else if (activeTool =="select-row"){

            setBackground(`.grid-row${this.id.split('')[0]}`)
        }else if (activeTool =="select-column"){

            setBackground(`.grid-column${this.id.split('')[2]}`)
        }else if (activeTool =="diagonal-up"){
            let currentDiagonalUpSelection = Number(this.id[0])+Number(this.id[2]);
            for (i = 0; i <gridSize; i++){

                setBackground("#"+i+"-"+(currentDiagonalUpSelection - i))
            }
        } else if (activeTool == "diagonal-down"){
            let currentDiagonalDownSelection = Number(this.id[0])-Number(this.id[2]);
            for (i = 0; i <gridSize; i++){

                if((i-currentDiagonalDownSelection) < 0){
                  
                }else{
                    setBackground(`#${i}-${i - currentDiagonalDownSelection}`)
                }
            }
        }
    })



//click and hold function

$("html").on('mousedown',function(e){
    e.preventDefault()
    
    mouseDown = true;
   

}).on('mouseup',function(e){
    
    mouseDown = false;
   
})





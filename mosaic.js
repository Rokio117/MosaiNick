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


$("#color-select-menu").on("click", function(event){
   
    console.log('clicked')

})

let colorSelectMenu = document.getElementById("color-select-menu");



colorPallete.forEach((color=>{
    colorSelectMenu.appendChild(document.createElement("div"))


}))
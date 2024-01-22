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








let colorSelectMenu = document.getElementById("color-select-menu");



colorPallete.forEach((color=>{
    $("#color-select-menu").append(`<div class="color-select" style="background-color:${color};"></div>`)
    }))

    $(".color-select").on("click", function(event){
        console.log(event.target.style.backgroundColor)
    })




// $(".color-select").forEach((colorSelector) => console.log(colorSelector))



// console.log($(".color-select")[0])


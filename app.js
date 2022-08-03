const stylesNo = document.querySelector('#stylesSelect');
const section = document.querySelector('#windowSection');

let fontlink = document.querySelector('#fontlink');
const fontLinkText = "https://fonts.googleapis.com/css?family="

const fontArr= new Array();
let styles = 2;



createCanvas(styles);

stylesNo.addEventListener('change',function(e){
    clearCanvas(section);
    styles=parseInt(this.value);
    createCanvas(styles);
})



async function createCanvas(styles){
    
    const userInput = document.createElement('textarea');
    userInput.cols=50;
    userInput.rows=10;
    userInput.placeholder="Type Your Text Here";
    userInput.id="userInput";

    i=0;

    while(i!=styles){
        const newDiv = document.createElement('div');
        const newSelect = document.createElement('select');
        const displayWindow = document.createElement('textarea');

        displayWindow.classList="displayWindow";
        displayWindow.cols="30"
        displayWindow.rows="10"

        displayWindow.readOnly=true;

        

        section.append(newDiv);
        newDiv.append(newSelect);
        newDiv.append(displayWindow);
        const res = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBAtWUZP5O6MGMtG5oZ1wKR9ezFDFRG4hk");
        createOptions(res.data.items, newSelect);
       
        newDiv.classList="newDiv";
        newSelect.classList="newSelect";
        userInput.addEventListener("input", function(e){
            displayWindow.innerText=userInput.value;
            })
        
        newSelect.addEventListener("input",function(e){
            displayWindow.style.fontFamily=this.value;
            displayWindow.style.resize="none";
            // console.log(this.value);
            // console.log(displayWindow.style.fontFamily);
            fontArr.push(this.value);
            if(fontArr.length >4){
                fontArr.shift();
            }
            fontlink.href = fontLinkText + fontArr.join('|');
            // console.log(fontlink.href)
            // console.log(fontArr)
            })
        
       
        i++;
    } 
    
    section.append(userInput);


}

function clearCanvas(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}


function createOptions(items, newSelect){
    for(let item of items){
        const newOption= document.createElement('option');
        newOption.innerText=item.family;
        newSelect.append(newOption);
        
    }
}


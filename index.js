const state={
    taskList:[]
}

// DOM
 
const taskConstents = document.querySelector(".task_contents");
const taskModel = document.querySelector(".task_modal_body");

const htmlTAskContent = ({ id, tittle, description, type, url}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
       <div class="card shadow-sm task_card">
            <div class="card-header d-flex justify-content-end task_card_header gap-2">
            <button type="button" class="btn btn-outline-primary mr-2" name=${id}>
            <i class="fa-solid fa-pencil" name=${id}></i>
            </button>

            <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this, arguments)"> 
            <i class="fa-solid fa-trash" name=${id}></i>
            </button>
             </div>
            <div class="card-body">
            ${
                url ? `<img src=${url} alt='card image top' class="card-image-top md-3 rounded"/>`:
                 `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=" 
                 alt='card image top' class="card-image-top md-3 rounded"/>`
            }
            <h4 class="task_card_tittle card-tittle">${tittle}</h4>
            <p class="description card-text">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
            <span class="badge  text-bg-primary m-1">
            ${type}
            </span>
            </div>
            </div>
            <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-right" 
             data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick="openTask.apply(this, arguments)" > Open Task </button>
            </div>
       </div>
    </div>  
`;
const htmlModelContent = ({ id, tittle, description, type, url}) =>{
     const date = new Date(parseInt(id));
     return `<div id=${id}>
       ${
                url ? `<img src=${url} alt="card image top " class="img-fluid rounded"/>`:
                `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=" 
                alt="card image top" class="img-fluid rounded"/>`
        }
     </div>
     <strong class="text-sm text-muted">  Created on:${date.toDateString()}</strong>
     <h2 class"my-3">  ${tittle}</h2>
     <p class="lead">  ${description}</p>
     `
}

const updateLocalStorage = () => {
    localStorage.setItem("task",JSON.stringify({
        tasks:state.taskList,
    }))
}


const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks

    state.taskList.map((cardData) => {
        taskConstents.insertAdjacentHTML("beforeend", htmlTAskContent(cardData));
    } )
}


const handleSubmit  = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('ImageUrl').value,
        tittle : document.getElementById('TaskTittle').value,
        description: document.getElementById('taskdsp').value,
        type: document.getElementById('Tags').value, 
    };

     if(input.tittle =="" || input.description=="" || input.type==""){
        return alert("Please fill out all the mandatory field")
     }

    taskConstents.insertAdjacentHTML("beforeend",htmlTAskContent({...input, id}))

    state.taskList.push({...input, id});
    updateLocalStorage();
}

const openTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id}) => id == e.target.id);
    taskModel.innerHTML = htmlModelContent(getTask);
}


const deleteTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({id}) => id!==targetId)
    state.taskList = removeTask;
    updateLocalStorage()
    if(type === "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    } 
     return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    )
}

const searchTask = e => {
    if(!e) e = window.event;

    while(taskConstents.firstChild){
        taskConstents.removeChild(taskConstents.firstChild)
    }

    const resultData = state.taskList.filter(({tittle}) => tittle.includes(e.target.value))
    resultData.map((cardData)=> {
        taskConstents.insertAdjacentHTML("beforeend", htmlTAskContent(cardData))
    })
} 
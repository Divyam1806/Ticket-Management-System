const API_BASE_URL = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", () => {

const ticketListBody = document.querySelector("#ticketList tbody");
const addTicketModal = document.getElementById("addTicketModal");
const addTicketForm = document.getElementById("addTicketForm");
const editTicketModal = document.getElementById("editTicketModal");
const editTicketForm = document.getElementById("editTicketForm");

const messageBox = document.getElementById("messageBox");
const messageBoxTitle = document.getElementById("messageBoxTitle");
const messageBoxContent = document.getElementById("messageBoxContent");

const confirmationModal = document.getElementById("confirmationalModal");
const confirmationModalTitle = document.getElementById("confirmationalModalTitle");
const confirmationModalContent = document.getElementById("confirmationalModalContent");
const confirmYesButton = document.getElementById("confirmYesButton");
const confirmNoButton = document.getElementById("confirmNoButton");

let confirmCallback = null;

const reportModal = document.getElementById("reportModal");
const summaryPriorityElement = document.getElementById("summaryPriority");
const summaryCategoryElement = document.getElementById("summaryCategory");
const utilizationReportElement = document.getElementById("utilizationReport");

window.showMessage = (title,message)=>{
messageBoxTitle.textContent=title;
messageBoxContent.textContent=message;
messageBox.classList.remove("hidden");
};

window.closeMessageBox=()=>{
messageBox.classList.add("hidden");
};

window.showConfirmation=(title,message,callback)=>{
confirmationModalTitle.textContent=title;
confirmationModalContent.textContent=message;
confirmationModal.classList.remove("hidden");
confirmCallback=callback;
};

confirmYesButton.onclick=()=>{
if(confirmCallback){
confirmCallback(true);
}
confirmationModal.classList.add("hidden");
confirmCallback=null;
};

confirmNoButton.onclick=()=>{
if(confirmCallback){
confirmCallback(false);
}
confirmationModal.classList.add("hidden");
confirmCallback=null;
};

window.openAddTicketModal=()=>{
addTicketForm.reset();
addTicketModal.classList.remove("hidden");
};

window.closeAddTicketModal=()=>{
addTicketModal.classList.add("hidden");
};

window.openEditTicketModal=()=>{
showMessage("Info",'To edit a ticket use the "Edit" button in table');
};

window.deleteTicket=()=>{
showMessage("Info",'To delete use delete button beside ticket');
};

/* REPORT MODAL */
window.openReportModal=()=>{
reportModal.classList.remove("hidden");

fetchSummary("category");
fetchSummary("priority");
fetchUtilization();
};

window.closeReportModal=()=>{
reportModal.classList.add("hidden");
};

async function fetchTickets(){

try{

const response=await fetch(`${API_BASE_URL}/tickets`);

if(!response.ok){
console.warn("Backend not available using mock data");
renderTickets(getMockTickets());
return;
}

const tickets=await response.json();
renderTickets(tickets);

}catch(error){

console.error("Error fetching tickets",error);
showMessage("Error","Failed to load tickets");
renderTickets(getMockTickets());

}

}

function getMockTickets(){
return[
{id:1,title:"Website Login Issue",description:"User cannot log in.",status:"Open",priority:"High",category:"Support",assignedTo:"Alice"},
{id:2,title:"Implement Dark Mode",description:"Add dark theme",status:"In Progress",priority:"Medium",category:"Feature Request",assignedTo:"Bob"},
{id:3,title:"Database Connectivity Error",description:"DB connection fail",status:"Resolved",priority:"Critical",category:"Bug",assignedTo:"Charlie"},
{id:4,title:"New User Onboarding Flow",description:"Improve onboarding",status:"Open",priority:"Low",category:"Feature Request",assignedTo:"Alice"}
];
}

function renderTickets(tickets){

ticketListBody.innerHTML="";

if(tickets.length==0){
ticketListBody.innerHTML='<tr><td colspan="7">No tickets found</td></tr>';
return;
}

tickets.forEach(ticket=>{

const row=`
<tr id="ticket-${ticket.id}">
<td>${ticket.id}</td>
<td>${ticket.category}</td>
<td>${ticket.title}</td>
<td>${ticket.status}</td>
<td>${ticket.priority}</td>
<td>${ticket.assignedTo}</td>
<td>
<button onclick="editTicket(${ticket.id})">Edit</button>
<button onclick="deleteTicketById(${ticket.id})">Delete</button>
</td>
</tr>
`;

ticketListBody.insertAdjacentHTML("beforeend",row);

});

}

/* ADD TICKET */
addTicketForm.addEventListener("submit",async(event)=>{

event.preventDefault();

const formData=new FormData(addTicketForm);
const newTicket=Object.fromEntries(formData.entries());

try{

const response=await fetch(`${API_BASE_URL}/tickets`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(newTicket)
});

if(!response.ok){
throw new Error(`HTTP error ${response.status}`);
}

await response.json();

addTicketForm.reset();
closeAddTicketModal();
fetchTickets();

}catch(error){

console.error("Error adding ticket",error);
showMessage("Error","Failed to add ticket");

}

});

/* EDIT TICKET */
window.editTicket=async(ticketId)=>{

try{

const response=await fetch(`${API_BASE_URL}/tickets/${ticketId}`);

let ticket;

if(!response.ok){
ticket=getMockTickets().find(t=>t.id==ticketId);
}else{
ticket=await response.json();
}

document.getElementById("editTicketId").value=ticket.id;
document.getElementById("editTitle").value=ticket.title;
document.getElementById("editDescription").value=ticket.description;
document.getElementById("editStatus").value=ticket.status;
document.getElementById("editPriority").value=ticket.priority;
document.getElementById("editCategory").value=ticket.category;
document.getElementById("editAssignedTo").value=ticket.assignedTo;

editTicketModal.classList.remove("hidden");

}catch(error){

console.error("Error fetching ticket",error);
showMessage("Error","Failed loading ticket");

}

};

/* DELETE TICKET */
window.deleteTicketById=async(ticketId)=>{

showConfirmation(
"Confirm Deletion",
`Are you sure want to delete ticket ${ticketId}?`,
async(confirmed)=>{

if(!confirmed)return;

try{

const response=await fetch(`${API_BASE_URL}/tickets/${ticketId}`,{method:"DELETE"});

if(!response.ok){
throw new Error(`HTTP error ${response.status}`);
}

fetchTickets();

}catch(error){

console.error("Error deleting ticket",error);
showMessage("Error","Failed deleting ticket");

}

}

);

};

/* UPDATE TICKET */
editTicketForm.addEventListener("submit",async(event)=>{

event.preventDefault();

const ticketId=document.getElementById("editTicketId").value;

const formData=new FormData(editTicketForm);
const updatedTicket=Object.fromEntries(formData.entries());

delete updatedTicket.id;

try{

const response=await fetch(`${API_BASE_URL}/tickets/${ticketId}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(updatedTicket)
});

if(!response.ok){
throw new Error(`HTTP error ${response.status}`);
}

await response.json();

closeEditModal();
fetchTickets();

}catch(error){

console.error("Error updating ticket",error);
showMessage("Error","Failed updating ticket");

}

});

window.closeEditModal=()=>{
editTicketModal.classList.add("hidden");
};

/* SUMMARY FETCH */
window.fetchSummary=async(groupBy)=>{

const targetElementId=`summary${groupBy.charAt(0).toUpperCase()+groupBy.slice(1)}`;
const targetElement=document.getElementById(targetElementId);

if(targetElement){
targetElement.innerHTML="Loading...";
}

try{

const response=await fetch(`${API_BASE_URL}/tickets/summary/${groupBy}`);

let summary;

if(!response.ok){
summary=getMockedSummary(groupBy);
}else{
summary=await response.json();
}

renderSummary(summary,targetElement);

}catch(error){

console.error(`Error fetching summary ${groupBy}`,error);

if(targetElement){
targetElement.innerHTML="Failed loading summary";
}

}

};

/* SUMMARY RENDER */
function renderSummary(summary,element){

let html="";

summary.forEach(item=>{
const key=item[0];
const count=item[1];
html+=`<p><strong>${key}:</strong> ${count}</p>`;
});

element.innerHTML=html;

}

/* UTILIZATION REPORT */
window.fetchUtilization=async()=>{

utilizationReportElement.innerHTML="Loading...";

try{

const response=await fetch(`${API_BASE_URL}/reports/utilization`);

let utilization;

if(!response.ok){
utilization=getMockedUtilization();
}else{
utilization=await response.json();
}

renderUtilization(utilization,utilizationReportElement);

}catch(error){

console.error("Error fetching utilization",error);
utilizationReportElement.innerHTML="Failed loading utilization";

}

};

/* UTILIZATION RENDER */
function renderUtilization(utilization,element){

let html="";

if(!utilization || utilization.length===0){
element.innerHTML="<p>No utilization data available</p>";
return;
}

utilization.forEach(item=>{
html+=`<p><strong>${item.member}</strong> : ${item.tickets} tickets (${item.utilization.toFixed(2)}%)</p>`;
});

element.innerHTML=html;

}

/* MOCK UTILIZATION DATA */
function getMockedUtilization(){
return[
{member:"Alice",tickets:4,utilization:40},
{member:"Bob",tickets:3,utilization:30},
{member:"Charlie",tickets:3,utilization:30}
];
}

fetchTickets();

});
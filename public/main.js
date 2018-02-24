const form = document.getElementById('vote-from');


//Form Submit Event

form.addEventListener('submit',(e) =>{
   const choice = document.querySelector('input[name=os]:checked').value;
   const data ={os:choice};

   fetch('http://localhost:3000/poll',{
       method:'post',
       body:JSON.stringify(data),
       headers:new Headers({
           'Content-Type' : 'application/json'
       })
   })
   .then(res => res.json())
   .then(data => console.log(data))
   .catch(err => console.log(err));
  

    e.preventDefault();
});
//Implementing Dynamic Charts With Canvas.js

let dataPoints = [
    { label : 'Windows',y: 0},
    { label : 'MacOS',y: 0},
    { label : 'Linux',y: 0},
    { label : 'Other',y: 0},

];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    const chart =  new  CanvasJS.Chart("chartContainer",{
        animationEnabled : true,
        theme : 'theme1',
        title : {
            text: 'Os Result'
        },
        data :[
            {
                type :'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

     // Enable pusher logging - don't include this in production
     Pusher.logToConsole = true;

     var pusher = new Pusher('6039dc60c4df6d2d3df1', {
       cluster: 'ap2',
       encrypted: true
     });
 
     var channel = pusher.subscribe('os-poll');
     channel.bind('os-votes', function(data) {
       dataPoints = dataPoints.map(x => {
            if(x.label == data.os){
                x.y += data.points;
                return x;
            }else{
                return x;
            }
       });
       chart.render();
     });
}
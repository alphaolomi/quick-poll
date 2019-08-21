const form = document.getElementById('vote-form');
let event;


function getVotes() {

  fetch("http://localhost:3000/votes")
  .then(res => res.json())
  .then(data => {
    let votes = data.votes;
    let totalVotes = votes.length;
    document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
      Windows: 0,
      MacOS: 0,
      Linux: 0,
      Other: 0
    };

    voteCounts = votes.reduce((acc, vote) => (
      (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
      {}
    );

    let dataPoints = [
      { label: 'Windows', y: voteCounts.Windows },
      { label: 'MacOS', y: voteCounts.MacOS },
      { label: 'Linux', y: voteCounts.Linux },
      { label: 'Other', y: voteCounts.Other }
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      document.addEventListener('votesAdded', function (e) {
        document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
      });

      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        data: [
          {
            type: 'column',
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();

      // todo Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      const pusher = new Pusher('72f8830966153d8393d2', {
        cluster: 'ap2',
        forceTLS: true
      });

      const channel = pusher.subscribe('os-poll');

      channel.bind('os-vote', function (data) {
        dataPoints.forEach((point) => {
          if (point.label === data.os) {
            point.y += data.points;
            totalVotes += data.points;
            event = new CustomEvent('votesAdded', {detail: {totalVotes: totalVotes}});
            // Dispatch the event.
            document.dispatchEvent(event);
          }
        });
        chart.render();
        // alert(JSON.stringify(data));
      });
    }

  });


}

form.addEventListener('submit', e => {

  const choice = document.querySelector('input[name=os]:checked').value;
  const data = { os: choice };

  fetch('http://localhost:3000/votes', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json()).
  then(data => {
    // todo display thank for voting
    console.log(data)
    // getVotes()
  })
    .catch(err => console.log(err));

  e.preventDefault();
});




getVotes()

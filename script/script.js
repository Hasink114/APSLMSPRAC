const urlParams = new URLSearchParams(window.location.search);
const encodedResponse = urlParams.get('response');
const decodedResponse = JSON.parse(decodeURIComponent(encodedResponse));

// Use the decoded response
console.log(decodedResponse);
alert("New Practice paper is uploaded.");

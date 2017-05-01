function nextCallback(data) {
    console.log(data);
}

function completeCallback() {
    console.log('Done');
}

function errorCallback(err) {
    console.log('Error: ', err);
}

function startReceivingData(next, err, complete) {
    //[1,2,3,4,5].forEach(next);
    let counts = 0;
    const intervalId = setInterval(() => {
        counts++;
        next(counts);

        if (counts >= 5) {
            clearInterval(intervalId);
            complete();
        }
    }, 300)
}

startReceivingData(nextCallback, errorCallback, completeCallback);
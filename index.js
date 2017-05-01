const observer = {
    next: function nextCallback(data) {
        console.log(data);
    },

    complete: function completeCallback() {
        console.log('Done');
    },

    error: function errorCallback(err) {
        console.log('Error: ', err);
    }
};

function createObservable(subscribeFn) {
    return {
        subscribe: subscribeFn
    }
}

//sync data source
const arrayObservable = createObservable(function startReceivingData(obs) {
    [1, 2, 12, 9, 6].forEach(obs.next);
    obs.complete();
});

//async data source
const intervalObservable = createObservable(function startReceivingData(obs) {
        //[1,2,3,4,5].forEach(next);
        let counts = 0;
        const intervalId = setInterval(() => {
            counts++;
            obs.next(counts);

            if (counts >= 5) {
                clearInterval(intervalId);
                obs.complete();
            }
        }, 300)
});


intervalObservable.subscribe(observer);
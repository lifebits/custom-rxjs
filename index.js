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

function mapFn(transformationFn) {
    const inputObservable = this;
    const outputObservable = createObservable(function subscribe(obs) {
        inputObservable.subscribe({
            next: (x) => obs.next(transformationFn(x)),
            complete: () => obs.complete,
            error: (err) => obs.error(err)
        });
    });

    return outputObservable;
}

function createObservable(subscribeFn) {
    return {
        map: mapFn,
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


intervalObservable
    .map(x => x * 10)
    .subscribe(observer);
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

const arrayObservable = {
    //sync data source
    subscribe: function startReceivingData(obs) {
        [1,2,12,9,6].forEach(obs.next);
        obs.complete();
    }
};

const intervalObservable = {
    //async data source
    subscribe: function startReceivingData(obs) {
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
    }
};


arrayObservable.subscribe(observer);
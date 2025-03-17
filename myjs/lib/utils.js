function isEmpty(val) {
    return !(!!val ? typeof val === 'object' ? Array.isArray(val) ? !!val.length : !!Object.keys(val).length : true : false);
}

function sleep(delay) {
    const start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay * 1000) {
        continue;
    }
}
export {
    isEmpty,
    sleep
}
export function fibonacci(length){
    if(length === 1){
        return [1];
    }

    let series = [1, 1];
    
    if(length === 2){
        return series;
    }

    for(var i = 2; i <= length; i++){
        let next = series.slice(-2).reduce((a,b) => a + b, 0);
        series.push(next);
    }
}

export function add(a, b){
    return a + b;
}
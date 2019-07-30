const delay = () => {
    console.log('delay')
    return new Promise(
        r => setTimeout(() => {
            console.log('done');
            r()
        }, 2000)
    )
}



const f = async () => {
    console.log(1)
    await delay()
    console.log(2)
    await delay()
    console.log(3)
}

f()
f()
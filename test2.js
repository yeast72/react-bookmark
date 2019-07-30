const delay = async () => {
    const st = Date.now()
    console.log('delay')
    while (true) {
        if (Date.now() > st + 2000) {
            console.log('done')
            break;
        }
    }
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
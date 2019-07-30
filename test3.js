const delay = () => {
    const st = Date.now()
    while (true) {
        if (Date.now() > st + 2000) {
            break;
        }
    }
}

const f = async () => {
    console.log(1)
    delay()
    console.log(2)
    delay()
    console.log(3)
}

f()
f()
function test(): Promise<string> {
    
    return new Promise((resolve, reject) => {
        let a = Math.random();
        sleep(1000).then(() => {
            if (a > 0.5) {
                console.log("Success");
                
                resolve("ret success!!")                
            }                
            else {
                console.log("Fail");
                resolve("fail!!")
            }
        });
    })
}

//====================================================//

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

//====================================================//

function myAwait(f: () => Promise<string>): string{
    let ret = 'init'
    
    f().then((res) => {
        return res;
    })

    return ret;
}

//====================================================//

async function main(): Promise<void> {
    console.log("Start!");
    myAwait(test);
    console.log("End!"); 
    await sleep(2000);
    console.log("Exit!");
}

//====================================================//

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

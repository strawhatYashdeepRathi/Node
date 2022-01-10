function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const name = process.argv[2];
    return name;
}

function getNameFromEnv() {
    // Write your code here
    process.env.name_env = "name_env"
    return process.env.name_env
}

function getNameFromReadLine() {
    // Write your code here
    const readline = require("readline");
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });
    rl.question('Whats ur name ?', (ans)=>{
        let x = ans;
    })
    return x;
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}
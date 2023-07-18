import http from 'k6/http'

export function setup(){
    console.log("Execução do SETUP")
    const res = http.get('https://httpbin.test.k6.io/get', {
    tags: {
        my_tag: "k6 test",
    },
    })
    return {data: res.json()};
}

export function teardown(data){
    console.log("Execução do TEARDOWN")
}


export default function(data){
    console.log("Execução do MAIN (DEFAULT)")
}
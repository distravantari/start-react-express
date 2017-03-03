import request from "superagent";

export const dropHandler = (file) => {
    const photo = new FormData();
    photo.append("photo", file[0]);
    console.log("file 0 => ", file[0]);
    request.post("/upload")
        .send(photo)
        .end((err, resp) => {
            if (err) {
                console.error(err);
            }
            console.log("response: ", resp);
            alert(resp.text);
            return resp;
        });
}

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        request
        .post("/login")
        .type('form')
        .send({username: username, password: password})
        .end(function(err, res){
            if(err) reject(err)
            resolve(res)
        });
    })
}

// export const that is checking wether the photo drophandler got is a face or not
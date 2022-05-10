export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenexpdate: Date
    ){}
    get token(){
        if(!this._tokenexpdate || new Date() > this._tokenexpdate){
            return null
        }
        return this._token
    }
}
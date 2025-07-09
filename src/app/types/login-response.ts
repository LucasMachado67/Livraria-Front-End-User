export interface LoginResponse {
    token: string;
    email: string;
    name: string;
    phone: string;
    gender: string;
    //Isso era um type e agora um interface,
    //se der problema pode ser por conta desta alteração
}
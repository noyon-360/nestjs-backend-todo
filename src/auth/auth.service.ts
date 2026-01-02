import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    getHelloAuth(): string {
        return "My Auth controller is here";
    }
}

import crypto from 'crypto';
import { Request } from 'express';
import jose from 'node-jose';
import { TokenPayload } from './types/token.sptypes';

export class Token {
    private static SECRET_KEY: string = process.env.JWT_SECRET || "FALLBACK_TOKEN_123456_??234!!ç°éFKIO";
    private static ExpTime: number = 6000; // in secondi
    private static EncAlgorithm = 'A256GCM'; // Algoritmo di cifratura
    private static KeyLength = 32; // lunghezza chiave in byte

    private static keyStore: jose.JWK.KeyStore | null = null;

    // Inizializza la KeyStore
    private static async getKey(): Promise<jose.JWK.Key>
    {
        if (!this.keyStore)
        {
            this.keyStore = jose.JWK.createKeyStore();
            const encryptionKey = Token.deriveEncryptionKey();
            const key = await jose.JWK.asKey({
                kty: 'oct',
                k: jose.util.base64url.encode(encryptionKey)
            });

            await this.keyStore.add(key);
        }

        return this.keyStore.all({ use: 'enc' })[0];
    }

    // Metodo per autorizzare una richiesta
    public static authorize = async (req: Request):Promise<TokenPayload> =>
    {
        const token = req.headers.authorization?.split('Bearer ')?.[1] ?? null;
        if (token === null) throw new Error('UNAUTH');

        const payload = await this.verifyJWE(token);
        return payload;
    }

    // Metodo per derivare chiave di cifratura
    private static deriveEncryptionKey(): Buffer
    {
        return crypto
            .createHash('sha256')
            .update(Token.SECRET_KEY)
            .digest()
            .slice(0, Token.KeyLength);
    }

    // Metodo per generare token cifrato (JWE)
    public static async generateJWE(payload: TokenPayload): Promise<string>
    {
        const key = await this.getKey();

        const input = Buffer.from(JSON.stringify({
            ...payload,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + Token.ExpTime
        }));

        const jwe = await jose.JWE.createEncrypt({
            format: 'compact',
            fields: { alg: 'dir', enc: Token.EncAlgorithm }
        }, key)
        .update(input)
        .final();

        return jwe;
    }

    // Metodo per decifrare token JWE
    public static async verifyJWE(token: string): Promise<TokenPayload>
    {
        try {
            const key = await this.getKey();
            const result = await jose.JWE.createDecrypt(key).decrypt(token);

            const payload = JSON.parse(result.plaintext.toString());

            const now = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < now) {
                throw new Error('Token expired');
            }

            return payload;
        }
        catch (error)
        {
            throw new Error('Token decryption failed');
        }
    }
}

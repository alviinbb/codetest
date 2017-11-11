<?php

/**
 * Simple Encryption / Decryption Class.
 * Uses PHP's OpenSSL Encrypt / Decrypt
 * @author Jhey Macarubbo <macarubbo.david@gmail.com>
 *
 * Gist: https://gist.github.com/jheyjheyjhey/230c1c11c7aca72a9cbe57801c1f691e
 *
 */
Class OpenSSLCryptoClass{
    const INPUT_ENC_METHOD = "AES-256-CBC";
    const KEY_ENC_METHOD = "SHA256";

    private $app_key;    
    private $iv;

    public function __construct($app_key, $iv){
        $this->app_key = hash( self::KEY_ENC_METHOD, $app_key);
        $this->iv = substr(hash(self::KEY_ENC_METHOD, $iv),0,16);
    }

    /**
    * @param string|int $input - String to be encrypted
    * 
    * @return string 
    *
    */
    public function encrypt($input){
        return base64_encode(openssl_encrypt($input, self::INPUT_ENC_METHOD, $this->app_key, 0, $this->iv));
    }
    
    /**
    * @param string $encrypted_input - Encrypted string to be decrypted
    * 
    * @return string|bool returns false if $encrypted_input isn't an encrypted string. 
    *
    */
    public function decrypt($encrypted_input){
        return openssl_decrypt(base64_decode($encrypted_input), self::INPUT_ENC_METHOD, $this->app_key, 0, $this->iv);
    }
}
?>
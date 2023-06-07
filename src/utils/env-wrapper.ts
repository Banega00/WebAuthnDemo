class EnvWrapper {
 
    public port = this.getProperty("port");
    public env_type = this.getProperty("env_type");

    public pg = {
        host: this.getProperty("pg_host"),
        port: this.toNumber(this.getProperty("pg_port")),
        username: this.getProperty("pg_username"),
        password: this.getProperty("pg_password"),
        database: this.getProperty("pg_db_name"),
    }

    public orm = {
        synchronize: this.toBoolean(this.getProperty("orm_synchronize")),
        logging: this.toBoolean(this.getProperty("orm_logging"))
    }

    public cert = {
        path: this.getProperty("cert_path"),
        passphrase: this.getProperty("cert_passphrase")
    }

    public fido = {
        rp_id: this.getProperty("FIDO_RP_ID"),
    }

    public log_level = this.getProperty('log_level');
 
    private getProperty(property: string): string {
        return process.env[property.toUpperCase()] || process.env[property.toLowerCase()] || "";
    }
 
    private toNumber(value: string): number {
        return +value;
    }
 
    private toBoolean(value: string): boolean {
        return value.toLowerCase() === "true";
    }
 
}
 
export const env = new EnvWrapper();
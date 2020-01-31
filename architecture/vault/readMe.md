Vault is an open-source tool for secret management made up of several components. A few concepts/points to start with:  

* Vault in a production env always starts in a sealed state before it could accept requests. It needs to be unsealed first with a master key. The key is divided in parts (Shards). Each shard can be handled by different opreators. 
* Once unsealed, vault accepts authentication requests via various ways: LDAP, ActiveDirectory (Humans). For CI/CD applications such as Jenkins, vault uses "AppRoles". (Kubernetes is also applicable)    
* Use `vault auth list` to list all the enabled authentication methods  
* Use `vault auth enable <authType>` to enable an authentication method. i.e. vault auth enable userpass  
* Vault used Engine Types to process/fetch/store secrets. i.e. Kv: (Consul - This is an all-purpose engine which deals with Key-value pairs) etc. There are other engines that generate dynamic secrets as well (other engines can also be developed and integrated with it)  
* An authenticated request is granted an access token. Each token has a lease. A lease has TTL (Time to Live) and can be revoked    
* Access can be restricted using Access Polices  
* Once a secret goes through the vault processing, They can be stored in a: fileSystem, AWS/Azure/Cloud, SQL/Postgres Database etc  
* A vault dev server is started as unsealed   
* `vault status` is used to check if a vault server is running  

### Steps to spin up a Vault Dev Server:  
* Download Vault's Zip (comes as a single executable file)  
* execute `vault server -dev` 
* In a new cmd window: execute "set VAULT_ADDR=http://127.0.0.1:8200" (use "export" in bash)  
* Try navigating to: http://127.0.0.1:8200/ui/vault/auth and you should see a login screen  
* List all the engines by: `vault secrets list` 
* The kv engine has a default secret/<anyName> path. An engine type can be mounted for different (multiple) paths as well. The `vault secrets enable -path=newPath kv` command is used to create a new path for KV type engine named "newPath"  
* Use `vault kv put secret/mysecrets key=pair` command to add a secret to vault using the KV engine. The key here is "key" while the secret is "pair"  
* Use `vault kv get -format=json secret/mysecrets` to retrieve what you just saved (in the json format. This is what an API call would also retrieve)  


### Authentication/Tokens:  
* Tokens are used to read/write secrets. A token can be accessed/providedWith when authenticated  
* Userpass method isn't recommended because then you'd need to save/manage those credentials somewhere. First enable the userpass auth type (prev steps) and create a user by `vault write auth/userpass/users/vaultuser password=abc` (valtuser will be the username)  
* Login by `vault login -method=userpass username=vaultuser password=abc` (a token will be displayed to you. This token can also be used for logging into vault. Use `vault login <token>` for that)    
* You can also login using the root token that was shown in the terminal when the dev server was launched. The policies for a root token would be "root" and it won't expire 
* Once logged in via root token, `vault token create` can be used to create a brand new token with same privilidges as the first one (when logged in with userpass method)  

**Note: The newly created token acts as a child of the root token. If a parent token is revoked, all of its children token gets deleted as well. (To avoid this, create orphand tokens)**  

* **Token Accessors**: are used to manage a token without having that token. When logged in, accessors are shown next on terminal. Use `vault list auth/token/accessors` to list all accessors. These can be used to revoke tokens or renew leases. They can also be used to lookup a token. Use `vault token lookup --accessor <accessor>`  
* Use `vault token revoke --accessor <accessor>` to revoke a token 
* Use `vault token create --ttl=5m` with a TTL duration  


### Vault Polices
* Perform authorization on an authenticated request   
* The root token is authorized to read all paths. All other tokens read/write data subject to polices  
* Polices can be assigned to users by associating/assigning them with access tokens  
* Vault uses `HCL` to define polices (a json like structure: HashiCorp Configuration Language). Once written, they need to be uploaded to server via CLI or API (a file is created with .hcl extension)  
* Using polices, we define `capabilities` on a `path`. Example capabilities are: create (Post/Put), read (Get), update (Post/Put), delete, list, sudo (root level access - only for admins), deny etc.  
* Vault has 2 default policies: **Root** and **Default**. Root has access to all paths  
* List all policies via `vault policy list`. Use `vault policy read default` to read the default policy
* Create the .hcl file and then upload them via terminal using `vault policy write <any_wanna_be_policy_name> <someFile>.hcl`  
* These polices can be associated with a user at the time of user creation. Just add the `policies=<given_policy_name>` at the end of the user creation (via userpass method) command  
* List user (token) capabilities after login via `vault token capabilities secret/<path>/<username>/`  
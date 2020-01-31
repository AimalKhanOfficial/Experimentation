Vault is an open-source tool for secret management made up of several components. A few concepts/points to start with:  

* Vault in a production env always starts in a sealed state before it could accept requests. It needs to be unsealed first with a master key. The key is divided in parts (Shards). Each shard can be handled by different opreators. 
* Once unsealed, vault accepts authentication requests via various ways: LDAP, ActiveDirectory (Humans). For CI/CD applications such as Jenkins, vault used AppRoles  
* Vault used Engine Types to process/fetch/store secrets. i.e. Kv: (Consul - This is an all-purpose engine which deals with Key-value pairs) etc. There are other engines that generate dynamic secrets as well (other engines can also be developed and integrated with it)  
* An authenticated request is granted an access token. Each token has a lease. A lease has TTL (Time to Live) and can be revoked    
* Access can be restricted using Access Polices  
* Once a secret goes through the vault processing, They can be stored in a: fileSystem, AWS/Azure/Cloud, SQL/Postgres Database etc  
* A vault dev server is started as unsealed   

Steps to spin up a Vault Dev Server:  
* Download Vault's Zip (comes as a single executable file)  
* execute "vault server -dev"  
* In a new cmd window: execute "set VAULT_ADDR=http://127.0.0.1:8200" (use "export" in bash)  
* Try navigating to: http://127.0.0.1:8200/ui/vault/auth and you should see a login screen  
* List all the engines by: vault secrets list  
* The kv engine has a default secret/<anyName> path. An engine type can be mounted for different (multiple) paths as well. The "vault secrets enable -path=newPath kv" command is used to create a new path for KV type engine named "newPath"  
* Use "vault kv put secret/mysecrets key=pair" command to add a secret to vault using the KV engine. The key here is "key" while the secret is "pair"  
* Use "vault kv get -format=json secret/mysecrets" to retrieve what you just saved (in the json format. This is what an API call would also retrieve)  
